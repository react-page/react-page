// @flow
import { editable } from 'src/editor/reducer/editable'
import { UPDATE_EDITABLE } from 'src/editor/actions/editables'
import type { Editable } from 'types/editable'

export const editables = (state: Array<Editable> = [], action: {
  type: string,
  id: string,
  editable: string
}) => {
  switch (action.type) {
    case UPDATE_EDITABLE:
      return [...state.filter(({ id }) => id !== action.id), action.editable].map((r) => editable(r, action))
    default:
      return state.map((r) => editable(r, action))
  }
}
