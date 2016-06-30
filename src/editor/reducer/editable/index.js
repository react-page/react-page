import { rows } from './tree.js'

export const editable = (state = {
  id: null,
  rows: [],
  type: null
}, action) => {
  switch (action.type) {
    default:
      return {
        ...state,
        rows: rows(state.rows, action)
      }
  }
}
