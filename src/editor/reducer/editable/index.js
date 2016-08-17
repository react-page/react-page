import { cells } from './tree.js'
import { decorate } from './helper/tree'

export const editable = (state = {
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
