import { editable } from 'src/editor/reducer/editable'
import { UPDATE_EDITABLE } from 'src/editor/actions/editables'

export const editables = (state = [], action) => {
  switch (action.type) {
    case UPDATE_EDITABLE:
      return [...state, action.editable]
    default:
      return state.map(editable, action)
  }
}
