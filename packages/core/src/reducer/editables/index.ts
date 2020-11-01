import { AnyAction } from 'redux';
import undoable from 'redux-undo';
import { set } from 'redux-undo/lib/debug';
import {
  CELL_REMOVE,
  CELL_RESIZE,
  CELL_UPDATE_DATA,
} from '../../actions/cell/core';
import {
  CELL_INSERT_ABOVE,
  CELL_INSERT_BELOW,
  CELL_INSERT_INLINE_LEFT,
  CELL_INSERT_INLINE_RIGHT,
  CELL_INSERT_LEFT_OF,
  CELL_INSERT_RIGHT_OF,
  CELL_INSERT_AT_END,
} from '../../actions/cell/insert';
import { UPDATE_EDITABLE } from '../../actions/editables';
import { isProduction } from '../../const';
import { Editables, EditableType } from '../../types/editable';
import { editable } from '../editable';

if (!isProduction) {
  set(true);
}

const inner = undoable(
  (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    state: any = [],
    action: {
      type: string;
      id: string;
      editable: EditableType;
    }
  ): EditableType[] => {
    switch (action.type) {
      default:
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        return state.map((e: EditableType) => editable(e, action)) as any;
    }
  },
  {
    filter: function filterState(action, currentState, previousHistory) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      if ((action as any)?.notUndoable) {
        return false;
      }
      const undoable =
        [
          CELL_UPDATE_DATA,
          CELL_REMOVE,
          CELL_RESIZE,
          CELL_INSERT_ABOVE,
          CELL_INSERT_BELOW,
          CELL_INSERT_LEFT_OF,
          CELL_INSERT_RIGHT_OF,
          CELL_INSERT_INLINE_LEFT,
          CELL_INSERT_INLINE_RIGHT,
          CELL_INSERT_AT_END,
        ].indexOf(action.type) >= 0;
      return undoable;
    },

    // initTypes: [UPDATE_EDITABLE],
    neverSkipReducer: true,
    syncFilter: true,
  }
);

export const editables = (
  state: Editables = {
    past: [],
    present: [],
    future: [],
  },
  action: AnyAction
) => {
  const { past = [], present = [], future = [] } = state;

  switch (action.type) {
    case UPDATE_EDITABLE:
      return inner(
        {
          past: past.map((e) => [
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            ...(e as any).filter(
              ({ id }: EditableType): boolean => id !== action.editable.id
            ),
            // we need to run the rawreducer once or the history initial state will be inconsistent.
            // resolves https://github.com/ory/editor/pull/117#issuecomment-242942796
            // ...past,
            editable(action.editable, action),
          ]),
          present: inner(
            [
              ...present.filter(
                ({ id }: EditableType): boolean => id !== action.editable.id
              ),
              // we need to run the rawreducer once or the history initial state will be inconsistent.
              // resolves https://github.com/ory/editor/pull/117#issuecomment-242942796
              editable(action.editable, action),
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
            ] as any,
            undefined
          ),
          future,
        },
        undefined
      );
    default:
      return inner(state, action);
  }
};
