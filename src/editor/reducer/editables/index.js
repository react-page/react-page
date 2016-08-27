// @flow
import { editable } from 'src/editor/reducer/editable'
import { UPDATE_EDITABLE } from 'src/editor/actions/editables'
import type { Editable } from 'types/editable'

export const editables = (state: { present: Editable }[] = [], action: {
  type: string,
  id: string,
  editable: Editable
}): Editable[] => {
  switch (action.type) {
    case UPDATE_EDITABLE:
      return [
        ...state.filter(({ present: { id } }: { present: Editable }): boolean => id !== action.id),
        { past: [], present: action.editable, future: [], history: [] }
      ].map((e: { present: Editable }): Editable => editable(e.present.id)(e, action))
    default:
      return state.map((e: { present: Editable }) => editable(e.present.id)(e, action))
  }
}
