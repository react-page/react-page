// @flow
import { CELL_CREATE_FALLBACK } from '../../actions/cell'
import { cellOrder } from './helper/order'
import { decorate } from './helper/tree'
import { cells } from './tree.js'
import { createCell } from '../../types/editable'

export const rawEditableReducer = (
  state: Object = {
    id: null,
    cells: [],
    config: {
      whitelist: []
    }
  },
  action: Object
) => {
  let newCells = decorate(cells(state.cells, action))

  // eslint-disable-next-line default-case
  switch (action.type) {
    case CELL_CREATE_FALLBACK:
      if (action.editable === state.id) {
        const c = {
          ...createCell(),
          content: {
            plugin: action.fallback,
            state: action.fallback.createInitialState()
          },
          id: action.ids[0]
        }
        newCells = decorate(cells([c], action))
      }
      break
  }

  return {
    ...state,
    cells: newCells,
    cellOrder: cellOrder(newCells || [])
  }
}

export const editable = rawEditableReducer
