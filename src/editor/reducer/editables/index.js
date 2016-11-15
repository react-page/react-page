// @flow
import { editable, rawEditableReducer } from 'src/editor/reducer/editable'
import { UPDATE_EDITABLE } from 'src/editor/actions/editables'
import type { Editable } from 'types/editable'
import undoable, { includeAction } from 'redux-undo'
import { CELL_UPDATE_CONTENT, CELL_UPDATE_LAYOUT, CELL_REMOVE, CELL_RESIZE } from 'src/editor/actions/cell/core'
import {
  CELL_INSERT_ABOVE,
  CELL_INSERT_BELOW,
  CELL_INSERT_LEFT_OF,
  CELL_INSERT_RIGHT_OF,
  CELL_INSERT_INLINE_LEFT,
  CELL_INSERT_INLINE_RIGHT
} from 'src/editor/actions/cell/insert'
import { set } from 'redux-undo/lib/debug'

set(true)

const createHistory = (state: any) => ({
  past: [],
  present: state,
  future: []
})

const inner = undoable((state: Array<Editable> = [], action: {
  type: string,
  id: string,
  editable: Editable
}): Editable[] => {
  switch (action.type) {
    default:
      return state.map((e: Editable) => editable(e, action))
  }
}, {
  filter: includeAction([
    CELL_UPDATE_CONTENT, CELL_UPDATE_LAYOUT, CELL_REMOVE, CELL_RESIZE,
    CELL_INSERT_ABOVE, CELL_INSERT_BELOW, CELL_INSERT_LEFT_OF, CELL_INSERT_RIGHT_OF,
    CELL_INSERT_INLINE_LEFT, CELL_INSERT_INLINE_RIGHT
  ]),
  //initTypes: [UPDATE_EDITABLE],
  neverSkipReducer: true
})

export const editables = (state = {}, action) => {
  const {past = [], present = [], future = []} = state
  switch (action.type) {
    case UPDATE_EDITABLE:
      return {
        past: [
          ...past.filter(({ id }: Editable): boolean => id !== action.id),
          // we need to run the rawreducer once or the history initial state will be inconsistent.
          // resolves https://github.com/ory-am/editor/pull/117#issuecomment-242942796
          rawEditableReducer(action.editable, action)
        ],
        present: inner([
          ...present.filter(({ id }: Editable): boolean => id !== action.id),
          // we need to run the rawreducer once or the history initial state will be inconsistent.
          // resolves https://github.com/ory-am/editor/pull/117#issuecomment-242942796
          rawEditableReducer(action.editable, action)
        ]),
        future
      }
    default:
      return inner({ past,present,future }, action)
  }
}
