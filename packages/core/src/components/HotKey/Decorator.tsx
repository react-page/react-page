/* eslint-disable @typescript-eslint/ban-types */
import isHotkey from 'is-hotkey';
import React, { useCallback, useEffect, useMemo } from 'react';

import { blurAllCells } from '../../actions/cell';
import { Cell, isRow, Node } from '../../types/editable';
import {
  useEditableNode,
  useEditorStore,
  useFocusCellById,
  useIsEditMode,
  useRedo,
  useRemoveCellById,
  useUndo,
  useFocusedNodeId,
  usePlugins,
} from '../hooks';

const getLeave = (node: Node, last: boolean) => {
  if (!node) return null;
  if (isRow(node)) {
    return getLeave(
      last ? node.cells[node.cells.length - 1] : node.cells[0],
      last
    );
  } else {
    if (node.rows?.length > 0) {
      return getLeave(
        last ? node.rows[node.rows.length - 1] : node.rows[0],
        last
      );
    } else {
      return node;
    }
  }
};
const getLeaveSibling = (
  nodeId: string,
  ancestors: Node[],
  previous: boolean
) => {
  const [parent, ...restAncestors] = ancestors;
  if (!parent) {
    return null;
  }
  const allSiblings = isRow(parent) ? parent.cells : parent.rows;
  if (!parent) {
    return;
  }
  const myIndex = allSiblings.findIndex((c) => c.id === nodeId) ?? -1;
  const siblint = allSiblings[myIndex + (previous ? -1 : 1)];
  if (siblint) {
    return getLeave(siblint, previous);
  } else {
    // go one deep
    return getLeaveSibling(parent.id, restAncestors, previous);
  }
};

type Handler = (event: Event, foundCell?: Cell) => Promise<void> | void;

type PluginHandlerName =
  | 'handleRemoveHotKey'
  | 'handleFocusNextHotKey'
  | 'handleFocusPreviousHotKey';

const Decorator: React.FC = ({ children }) => {
  const editor = useEditorStore();
  const { id } = useEditableNode((editable) => ({
    id: editable?.id,
  }));
  const undo = useUndo();
  const redo = useRedo();
  const plugins = usePlugins();
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
      const node = editor.getNode(nodeId);
      const plugin = plugins.find((p) => p.id === (node as Cell)?.plugin?.id);

      try {
        if (node && plugin[handlerName]) {
          await plugin[handlerName](event, node);
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
    [id, editor]
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
              const { ancestors } = editor.getNodeWithAncestors(focusedNodeId);
              const nextSibling = getLeaveSibling(
                focusedNodeId,
                ancestors,
                false
              );
              if (nextSibling) {
                blurAllCells();
                focusCell(nextSibling.id, false);
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
              const { ancestors } = editor.getNodeWithAncestors(focusedNodeId);
              const previousSibling = getLeaveSibling(
                focusedNodeId,
                ancestors,
                true
              );

              if (previousSibling) {
                blurAllCells();
                focusCell(previousSibling.id, true);
              }
            }
          );
        },
      },
    ],
    [focusedNodeId, blurAllCells, focusCell, removeCell]
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
