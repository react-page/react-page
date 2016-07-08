import { cells } from './tree.js'
import { computeDropLevels } from './helper/level'

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
        cells: cells(state.cells, action).map((c) => computeDropLevels(c))
      }
  }
}
