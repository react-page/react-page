/* eslint-disable @typescript-eslint/ban-types */
import isHotkey from 'is-hotkey';
import React, { useCallback, useEffect, useMemo } from 'react';
import { blurAllCells } from '../../actions/cell';
import { Cell, isRow, Node } from '../../types/editable';
import {
  useEditableNode,
  useEditor,
  useFocusCellById,
  useIsEditMode,
  useRedo,
  useRemoveCellById,
  useUndo,
  useFocusedNodeId,
} from '../hooks';

const nextLeaf = (order: Array<{ id: string }> = [], current: string) => {
  let last;

  return order.find((c: { id: string; isLeaf: boolean }) => {
    if (last === current) {
      return c.isLeaf;
    }
    last = c.id;
    return false;
  });
};

const previousLeaf = (order: Array<{ id: string }>, current: string) =>
  nextLeaf([...order].reverse(), current);

type Handler = (event: Event, foundCell?: Cell) => Promise<void> | void;

type PluginHandlerName =
  | 'handleRemoveHotKey'
  | 'handleFocusNextHotKey'
  | 'handleFocusPreviousHotKey';

const delegateToPlugin = async (
  event: Event,
  n: Node,
  handlerName: PluginHandlerName
) => {
  if (isRow(n)) {
    return;
  }
  const plugin = n?.layout?.plugin ?? n?.content?.plugin;
  if (plugin?.[handlerName]) {
    await plugin[handlerName](event, n);
  }
};

const Decorator: React.FC = ({ children }) => {
  const editor = useEditor();
  const editableNode = useEditableNode();
  const undo = useUndo();
  const redo = useRedo();
  const focusedNodeId = useFocusedNodeId();
  const focusCell = useFocusCellById();
  const removeCell = useRemoveCellById();
  const delegateToFoundPlugin = useCallback(
    async (
      event: Event,
      nodeId: string,
      handlerName: PluginHandlerName,
      defaultHandler: Handler
    ) => {
      const cellNode = editor.getNode(editableNode?.id, nodeId);

      try {
        if (cellNode) {
          await delegateToPlugin(event, cellNode, handlerName);
        }
        // if the plugin handler resolve or there is no, they do not handle it, so do the default
        await defaultHandler(event, cellNode);
      } catch (e) {
        if (e) {
          // tslint:disable-next-line:no-console
          console.error(e);
        }
      }
    },
    [editableNode?.id, editor]
  );

  const handlers = useMemo(
    () => [
      {
        hotkeys: ['ctrl+z', 'command+z'],
        handler: () => {
          undo();
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
              removeCell(focusedNodeId);
            }
          );
        },
      },
      {
        hotkeys: ['alt+down', 'alt+right'],
        handler: (event) => {
          delegateToFoundPlugin(
            event,
            focusedNodeId,
            'handleFocusNextHotKey',
            () => {
              const found = nextLeaf(editableNode.cellOrder, focusedNodeId);
              if (found) {
                blurAllCells();
                focusCell(found.id, true);
              }
            }
          );
        },
      },
      {
        hotkeys: ['alt+up', 'alt+left'],
        handler: (event) => {
          delegateToFoundPlugin(
            event,
            focusedNodeId,
            'handleFocusPreviousHotKey',
            () => {
              const found = previousLeaf(editableNode.cellOrder, focusedNodeId);

              if (found) {
                blurAllCells();
                focusCell(found.id, true);
              }
            }
          );
        },
      },
    ],
    [editableNode, focusedNodeId, blurAllCells, focusCell, removeCell]
  );

  const isEditMode = useIsEditMode();

  useEffect(() => {
    // in editmode we only allow hotkeys if a cell is focused.
    // this is because if we have multiple editors on the same page, we don't want to interfer with others
    // and also to make it more explicit
    // The BlurGate currently guarantees that only one editor ever has a focused cell, so we already know on which one we can apply hotkeys
    // If the editor is in another mode, all hot keys are allowed (which is useful for undo/redo, e.g. when resizing)
    // because the BlurGate also guarantees that only one editor will be in another mode then editMode
    // This is not totally clean, but it works very well.
    if (isEditMode && !focus) {
      return;
    }
    const keyHandler = (event) => {
      const matchingHandler = handlers.find((handler) =>
        handler.hotkeys.some((hotkey) => isHotkey(hotkey, event))
      );
      matchingHandler?.handler(event);
    };
    document.addEventListener('keydown', keyHandler);
    return () => {
      document.removeEventListener('keydown', keyHandler);
    };
  }, [handlers, focus, isEditMode]);

  return <>{children}</>;
};

export default Decorator;
