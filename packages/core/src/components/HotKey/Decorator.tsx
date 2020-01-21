import isHotkey from 'is-hotkey';
import React, { useCallback, useEffect, useMemo } from 'react';
import { createStructuredSelector } from 'reselect';
import { blurAllCells, focusCell, removeCell } from '../../actions/cell';
import { redo, undo } from '../../actions/undo';
import { connect } from '../../reduxConnect';
import { isEditMode } from '../../selector/display';
import {
  editable,
  editables,
  node,
  searchNodeEverywhere
} from '../../selector/editable';
import { focus } from '../../selector/focus';
import {
  AbstractCell,
  ComponetizedCell,
  EditableType
} from '../../types/editable';
import { RootState } from '../../types/state';

type Props = {
  // tslint:disable-next-line:no-any
  children: any;
  id: string;
  focus: string;
  isEditMode: boolean;
  editable: EditableType;
  undo(id: string): void;
  redo(id: string): void;
  removeCell(id: string): void;
  focusCell(id: string): void;
  blurAllCells(): void;
  updateCellContent(): void;
  updateCellLayout(): void;
  node(cell: string, editable: string): Object;
  searchNodeEverywhere(
    id: string
  ): { editable: EditableType; node: ComponetizedCell };
};

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

type Handler = (
  event: Event,
  foundNode?: AbstractCell<string>
) => Promise<void> | void;

type PluginHandlerName =
  | 'handleRemoveHotKey'
  | 'handleFocusNextHotKey'
  | 'handleFocusPreviousHotKey';

const delegateToPlugin = async (
  event: Event,
  n: AbstractCell<string>,
  handlerName: PluginHandlerName
) => {
  const plugin = n?.layout?.plugin ?? n?.content?.plugin;
  if (plugin?.[handlerName]) {
    await plugin[handlerName](event, n);
  }
};

const Decorator = (props: Props) => {
  const delegateToFoundPlugin = useCallback(
    async (
      event: Event,
      nodeId: string,
      handlerName: PluginHandlerName,
      defaultHandler: Handler
    ) => {
      const cellNode = props.searchNodeEverywhere(nodeId)?.node?.node;

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
    []
  );

  const handlers = useMemo(
    () => [
      {
        hotkeys: ['ctrl+z', 'command+z'],
        handler: () => {
          props.undo(props.id);
        },
      },

      {
        hotkeys: ['ctrl+shift+z', 'ctrl+y', 'command+shift+z', 'command+y'],
        handler: () => {
          props.redo(props.id);
        },
      },

      {
        hotkeys: ['alt+del', 'alt+backspace'],
        handler: event => {
          delegateToFoundPlugin(event, props.focus, 'handleRemoveHotKey', () =>
            props.removeCell(props.focus)
          );
        },
      },
      {
        hotkeys: ['alt+down', 'alt+right'],
        handler: event => {
          delegateToFoundPlugin(
            event,
            props.focus,
            'handleFocusNextHotKey',
            () => {
              const found = nextLeaf(props.editable.cellOrder, props.focus);
              if (found) {
                props.blurAllCells();
                props.focusCell(found.id);
              }
            }
          );
        },
      },
      {
        hotkeys: ['alt+up', 'alt+left'],
        handler: event => {
          delegateToFoundPlugin(
            event,
            props.focus,
            'handleFocusPreviousHotKey',
            () => {
              const found = previousLeaf(props.editable.cellOrder, props.focus);

              if (found) {
                props.blurAllCells();
                props.focusCell(found.id);
              }
            }
          );
        },
      },
    ],
    [props.id, props.focus, props.editable]
  );

  useEffect(() => {
    // in editmode we only allow hotkeys if a cell is focused.
    // this is because if we have multiple editors on the same page, we don't want to interfer with others
    // and also to make it more explicit
    // The BlurGate currently guarantees that only one editor ever has a focused cell, so we already know on which one we can apply hotkeys
    // If the editor is in another mode, all hot keys are allowed (which is useful for undo/redo, e.g. when resizing)
    // because the BlurGate also guarantees that only one editor will be in another mode then editMode
    // This is not totally clean, but it works very well.
    if (props.isEditMode && !props.focus) {
      return;
    }
    const keyHandler = event => {
      const matchingHandler = handlers.find(handler =>
        handler.hotkeys.some(hotkey => isHotkey(hotkey, event))
      );
      matchingHandler?.handler(event);
    };
    document.addEventListener('keydown', keyHandler);
    return () => {
      document.removeEventListener('keydown', keyHandler);
    };
  }, [handlers, props.focus, props.isEditMode]);

  return <>{props.children}</>;
};

/** FIXME: we should start using hooks for redux. this would drastically simplify this whole thing */
const mapStateToProps = createStructuredSelector({
  isEditMode,
  focus,
  // tslint:disable-next-line:no-any
  node: (state: any) => (id: string, _editable: string) =>
    node(state, { id, editable: _editable }),
  searchNodeEverywhere: (state: RootState) => (id: string) =>
    searchNodeEverywhere(state, id),
  // tslint:disable-next-line:no-any
  editable: (state: any, props: any) => editable(state, { id: props.id }),
  editables,
});

const mapDispatchToProps = {
  undo,
  redo,
  removeCell,
  focusCell: (id: string) => focusCell(id)(),
  blurAllCells,
};

export default connect(mapStateToProps, mapDispatchToProps)(Decorator);
