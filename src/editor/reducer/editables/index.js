import { editable } from 'src/editor/reducer/editable'
import { UPDATE_EDITABLE } from 'src/editor/actions/editables'

export const editables = (state = [], action) => {
  switch (action.type) {
    case UPDATE_EDITABLE:
      return [...state.filter(({ id }) => id !== action.id), action.editable].map((r) => editable(r, action))
    default:
      return state.map((r) => editable(r, action))
  }
}
