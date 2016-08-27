import { cells } from './tree.js'
import { decorate } from './helper/tree'
import undoable, { excludeAction } from 'redux-undo'
import { isProduction } from 'src/editor/const'
import { CELL_DRAG_HOVER, CELL_DRAG, CELL_DRAG_CANCEL, CLEAR_CLEAR_HOVER } from 'src/editor/actions/cell/drag'
import { CELL_FOCUS, CELL_BLUR } from 'src/editor/actions/cell/core'
import { UPDATE_EDITABLE } from 'src/editor/actions/editables'

export const rawEditableReducer = (state = {
  id: null,
  cells: [],
  config: {
    whitelist: []
  }
}, action) => {
  switch (action.type) {
    default:
      return {
        ...state,
        cells: decorate(cells(state.cells, action))
      }
  }
}

export const editable = (id) => undoable(rawEditableReducer, {
  filter: (action, currentState, previousHistory) => {
    if (action.id !== id && previousHistory.length < 2) {
      return false
    }
    return ['@@INIT', CELL_DRAG_HOVER, CELL_DRAG, CELL_DRAG_CANCEL, CLEAR_CLEAR_HOVER, CELL_FOCUS, CELL_BLUR, UPDATE_EDITABLE].indexOf(action.type) === -1
  },
  // FIXME this is required because redux-undo doesn't support multiple undo state otherwise
  undoType: `UNDO/${id}`,
  redoType: `REDO/${id}`,
  debug: !isProduction,
})
