import isHotkey from 'is-hotkey';
import type React from 'react';
import type { RefObject } from 'react';
import { useCallback, useEffect, useMemo } from 'react';
import { objIsNode } from '../../../core/utils/objIsNode';
import type { PluginHandler } from '../../types';
import type { Cell } from '../../types/node';
import { isRow } from '../../types/node';
import { getCommonAncestorTree } from '../../utils/ancestorTree';
import { cloneAsCell } from '../../utils/cloneWithNewIds';
import {
  useAllCellPluginsForNode,
  useAllFocusedNodeIds,
  useBlurAllCells,
  useEditorStore,
  useFocusCellById,
  useFocusedNodeId,
  useInsertAfter,
  useIsEditMode,
  useIsInsertMode,
  useParentCellId,
  useRedo,
  useRemoveMultipleNodeIds,
  useSetEditMode,
  useSetInsertMode,
  useUndo,
} from '../hooks';

type HotkeyHandlers = {
  hotkeys: string[];
  handler: (e: Event) => void;
}[];

type PluginHandlerName =
  | 'handleRemoveHotKey'
  | 'handleFocusNextHotKey'
  | 'handleFocusPreviousHotKey';

let lastFocused: HTMLDivElement | null = null;
const GlobalHotKeys: React.FC<{ focusRef: RefObject<HTMLDivElement> }> = ({
  focusRef,
}) => {
  const editor = useEditorStore();

  const undo = useUndo();
  const redo = useRedo();
  const setInsertMode = useSetInsertMode();
  const isEditMode = useIsEditMode();
  const blurAllCells = useBlurAllCells();

  const focusedNodeIds = useAllFocusedNodeIds();
  const someCellIsFocused = focusedNodeIds.length > 0;
  const focusedNodeId = useFocusedNodeId();
  const focusParentId = useParentCellId(focusedNodeId);
  const plugins = useAllCellPluginsForNode(focusParentId);
  const focusCell = useFocusCellById();
  const removeCells = useRemoveMultipleNodeIds();
  const insertAfter = useInsertAfter();
  const isInsertMode = useIsInsertMode();
  const setEditMode = useSetEditMode();
  const delegateToFoundPlugin = useCallback(
    async (
      event: Event,
      nodeId: string | null,
      handlerName: PluginHandlerName,
      defaultHandler: PluginHandler
    ) => {
      const node = nodeId ? editor?.getNode(nodeId) : null;
      const plugin = plugins.find((p) => p.id === (node as Cell)?.plugin?.id);

      try {
        if (isEditMode && node && plugin?.[handlerName]) {
          await plugin[handlerName]?.(event, node);
        }

        // if the plugin handler resolve or there is no, they do not handle it, so do the default
        await defaultHandler(event, node);
      } catch (e) {
        if (e) {
          // tslint:disable-next-line:no-console
          console.error(e);
        }
      }
    },
    [editor, isEditMode]
  );

  const handlers = useMemo<HotkeyHandlers>(() => {
    const handleCopy = (deleteAfter = false) => {
      // copy cell, unless text is selected
      if (
        window.getSelection()?.type !== 'Range' &&
        focusedNodeIds?.length > 0
      ) {
        if (!editor) {
          return;
        }
        const node = getCommonAncestorTree(editor, focusedNodeIds);
        if (!node) {
          return;
        }
        const cell = cloneAsCell(node);

        const type = 'text/plain'; // json is not supported
        const blob = new Blob([JSON.stringify(cell)], { type });

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const data = [new ClipboardItem({ [type]: blob as any })];

        navigator.clipboard.write(data);
        if (deleteAfter) {
          removeCells(focusedNodeIds);
        }
      }
    };

    return [
      {
        hotkeys: ['Escape'],
        handler: () => {
          if (someCellIsFocused) {
            blurAllCells();
          }
          if (isInsertMode) {
            setEditMode();
          }
        },
      },
      {
        hotkeys: ['mod+z'],
        handler: () => {
          undo();
        },
      },
      {
        hotkeys: ['mod+c'],
        handler: () => {
          handleCopy(false);
        },
      },

      {
        hotkeys: ['mod+x'],
        handler: () => {
          handleCopy(true);
        },
      },
      {
        hotkeys: ['mod+v'],
        handler: async () => {
          // is this something we can use?
          try {
            const node = JSON.parse(await navigator.clipboard.readText());
            if (!editor) {
              return;
            }
            if (objIsNode(node)) {
              // insert after common ancestors of selected nodes
              const commonAncestorNode =
                focusedNodeIds.length > 0
                  ? getCommonAncestorTree(editor, focusedNodeIds)
                  : null;

              const insertAfterNodeId = commonAncestorNode
                ? isRow(commonAncestorNode)
                  ? commonAncestorNode.cells.length === 1 // if it has just one cell, add below this cell. if it has multiple, add below this row
                    ? commonAncestorNode.cells[0].id
                    : commonAncestorNode.id
                  : commonAncestorNode.rows?.[
                      commonAncestorNode.rows.length - 1
                    ].id // if common ancestor is a cell (usually the root cell, add below last row)
                : null;
              insertAfter(node, insertAfterNodeId);
            }
          } catch (e) {
            // ignore
          }
        },
      },

      {
        hotkeys: ['ctrl+shift+z', 'ctrl+y', 'command+shift+z', 'command+y'],
        handler: () => {
          redo();
        },
      },

      {
        hotkeys: ['alt+del', 'alt+backspace'],
        handler: (event) => {
          delegateToFoundPlugin(
            event,
            focusedNodeId,
            'handleRemoveHotKey',
            () => {
              removeCells(focusedNodeIds);
            }
          );
        },
      },
    ];
  }, [
    editor,
    focusedNodeId,
    focusedNodeIds,
    someCellIsFocused,
    blurAllCells,
    focusCell,
    removeCells,
    setEditMode,
    setInsertMode,
  ]);

  useEffect(() => {
    // when we have multiple instances, we try to send the event only to the right one
    // we do a little trick with a global variable (instead of requiring a wrapping context)

    lastFocused = focusRef.current;
    const keyHandler = (event: KeyboardEvent) => {
      if (lastFocused !== focusRef.current) return;
      const matchingHandler = handlers.find((handler) =>
        handler.hotkeys.some((hotkey) => isHotkey(hotkey, event))
      );
      matchingHandler?.handler(event);
    };
    document.addEventListener('keydown', keyHandler);

    const focusHandler = () => {
      lastFocused = focusRef.current;
    };
    focusRef.current?.addEventListener('click', focusHandler);
    focusRef.current?.addEventListener('mouseenter', focusHandler);
    return () => {
      document.removeEventListener('keydown', keyHandler);
      focusRef.current?.removeEventListener('mouseenter', focusHandler);
      focusRef.current?.removeEventListener('click', focusHandler);
      if (lastFocused === focusRef.current) {
        lastFocused = null;
      }
    };
  }, [handlers, someCellIsFocused, isEditMode, focusRef]);

  return null;
};

export default GlobalHotKeys;
