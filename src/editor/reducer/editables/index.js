import { editable } from 'src/editor/reducer/editable'

export const editables = (state = [], action) => {
  switch (action.type) {
    default:
      return state.map(editable, action)
  }
}
