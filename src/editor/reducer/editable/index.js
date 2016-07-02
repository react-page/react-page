import { cells } from './tree.js'

export const editable = (state = {
  id: null,
  cells: []
}, action) => {
  switch (action.type) {
    default:
      return {
        ...state,
        cells: cells(state.cells, action)
      }
  }
}
