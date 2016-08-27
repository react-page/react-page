// @flow
import { editable, rawEditableReducer } from 'src/editor/reducer/editable'
import { UPDATE_EDITABLE } from 'src/editor/actions/editables'
import type { Editable } from 'types/editable'

const createHistory = (state) => ({
  past: [],
  present: state,
  future: []
})

export const editables = (state: { present: Editable }[] = [], action: {
  type: string,
  id: string,
  editable: Editable
}): Editable[] => {
  switch (action.type) {
    case UPDATE_EDITABLE:
      return [
        ...state.filter(({ present: { id } }: { present: Editable }): boolean => id !== action.id),
        // we need to run the rawreducer once or the history initial state will be inconsistent.
        // resolves https://github.com/ory-am/editor/pull/117#issuecomment-242942796
        createHistory(rawEditableReducer(action.editable, action))
      ].map((e: { present: Editable }): Editable => editable(e.present.id)(e, action))
    default:
      return state.map((e: { present: Editable }) => editable(e.present.id)(e, action))
  }
}
