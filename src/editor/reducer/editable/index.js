import { cells } from './tree.js'

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
        cells: cells(state.cells, action)
      }
  }
}
