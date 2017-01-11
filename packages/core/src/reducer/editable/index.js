// @flow
import { CELL_REMOVE } from '../../actions/cell/core'
import { cellOrder } from './helper/order'
import { decorate } from './helper/tree'
import { cells } from './tree.js'
import { createCell } from '../../types/editable'
// import { ContentPlugin } from '../../service/plugin/classes'

// TODO: shouldn't be here, #265
// const defaultPlugin = createSlatePlugin()

export const rawEditableReducer = (state: Object = {
  id: null,
  cells: [],
  config: {
    whitelist: []
  }
}, action: Object) => {
  let newCells = decorate(cells(state.cells, action))

  if (action.type === CELL_REMOVE && newCells.length === 0) {
    newCells = decorate(
      cells([{
        ...createCell(),
        id: action.ids[0],
        // TODO: shouldn't be here, #265
        // content: { plugin: new ContentPlugin(defaultPlugin), state: defaultPlugin.createInitialState() }
      }], action)
    )
  }

  return {
    ...state,
    cells: newCells,
    cellOrder: cellOrder(newCells || [])
  }
}

export const editable = rawEditableReducer
