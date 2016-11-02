// @flow
import { cells } from './tree.js'
import { decorate } from './helper/tree'
import { cellOrder } from './helper/order'
import undoable, { includeAction } from 'redux-undo'
import { CELL_UPDATE_CONTENT, CELL_UPDATE_LAYOUT, CELL_REMOVE, CELL_RESIZE } from 'src/editor/actions/cell/core'
import { CELL_INSERT_ABOVE, CELL_INSERT_BELOW, CELL_INSERT_LEFT_OF, CELL_INSERT_RIGHT_OF, CELL_INSERT_INLINE_LEFT, CELL_INSERT_INLINE_RIGHT } from 'src/editor/actions/cell/insert'
import { UPDATE_EDITABLE } from 'src/editor/actions/editables'

export const rawEditableReducer = (state: Object = {
  id: null,
  cells: [],
  config: {
    whitelist: []
  }
}, action: { type: string }) => {
  switch (action.type) {
    default:
      return {
        ...state,
        cells: decorate(cells(state.cells, action)),
        cellOrder: cellOrder(state.cells || [])
      }
  }
}

export const editable = (id: string) => undoable(rawEditableReducer, {
  filter: includeAction([
    CELL_UPDATE_CONTENT, CELL_UPDATE_LAYOUT, CELL_REMOVE, CELL_RESIZE,
    CELL_INSERT_ABOVE, CELL_INSERT_BELOW, CELL_INSERT_LEFT_OF, CELL_INSERT_RIGHT_OF, CELL_INSERT_INLINE_LEFT, CELL_INSERT_INLINE_RIGHT
  ]),
  initTypes: [UPDATE_EDITABLE],
  // FIXME this is required because redux-undo doesn't support multiple undo state otherwise
  undoType: `UNDO/${id}`,
  redoType: `REDO/${id}`
})
