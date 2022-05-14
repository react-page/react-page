import undoable from 'redux-undo';
import {
  CELL_REMOVE,
  CELL_RESIZE,
  CELL_UPDATE_DATA,
} from '../../actions/cell/core';
import {
  CELL_INSERT_ABOVE,
  CELL_INSERT_AS_NEW_ROW,
  CELL_INSERT_AT_END,
  CELL_INSERT_BELOW,
  CELL_INSERT_INLINE_LEFT,
  CELL_INSERT_INLINE_RIGHT,
  CELL_INSERT_LEFT_OF,
  CELL_INSERT_RIGHT_OF,
} from '../../actions/cell/insert';
import { UPDATE_VALUE } from '../../actions/value';

import { value } from '../value';

export const values = undoable(value, {
  filter: function filterState(action, currentState, previousHistory) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    if ((action as any)?.notUndoable) {
      return false;
    }
    const undoable =
      [
        UPDATE_VALUE,
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
        CELL_INSERT_AS_NEW_ROW,
      ].indexOf(action.type) >= 0;
    return undoable;
  },

  neverSkipReducer: true,
  syncFilter: true,
  //debug: !isProduction,
});
