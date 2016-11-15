// @flow
import { cells } from './tree.js'
import { decorate } from './helper/tree'
import { cellOrder } from './helper/order'

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

export const editable = rawEditableReducer
