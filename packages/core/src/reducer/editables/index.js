// @flow
import { set } from 'redux-undo/lib/debug'
import undoable, { includeAction } from 'redux-undo'

import { editable } from '../editable'
import { UPDATE_EDITABLE } from '../../actions/editables'
import type { Editable } from '../../types/editable'
import {
  CELL_UPDATE_CONTENT,
  CELL_UPDATE_LAYOUT,
  CELL_REMOVE,
  CELL_RESIZE
} from '../../actions/cell/core'
import { isProduction } from '../../const'
import {
  CELL_INSERT_ABOVE,
  CELL_INSERT_BELOW,
  CELL_INSERT_LEFT_OF,
  CELL_INSERT_RIGHT_OF,
  CELL_INSERT_INLINE_LEFT,
  CELL_INSERT_INLINE_RIGHT
} from '../../actions/cell/insert'

if (!isProduction) {
  set(true)
}

const inner = undoable(
  (
    state: Array<Editable> = [],
    action: {
      type: string,
      id: string,
      editable: Editable
    }
  ): Editable[] => {
    switch (action.type) {
      default:
        return state.map((e: Editable) => editable(e, action))
    }
  },
  {
    filter: includeAction([
      CELL_UPDATE_CONTENT,
      CELL_UPDATE_LAYOUT,
      CELL_REMOVE,
      CELL_RESIZE,
      CELL_INSERT_ABOVE,
      CELL_INSERT_BELOW,
      CELL_INSERT_LEFT_OF,
      CELL_INSERT_RIGHT_OF,
      CELL_INSERT_INLINE_LEFT,
      CELL_INSERT_INLINE_RIGHT
    ]),
    // initTypes: [UPDATE_EDITABLE],
    neverSkipReducer: true
  }
)

export const editables = (
  state: { past: [], present: Editable[], future: [] } = {
    past: [],
    present: [],
    future: []
  },
  action: Object
) => {
  const { past = [], present = [], future = [] } = state
  switch (action.type) {
    case UPDATE_EDITABLE:
      return inner({
        past: past.map((editables: Editable[]) => [
          ...editables.filter(
            ({ id }: Editable): boolean => id !== action.editable.id
          ),
          // we need to run the rawreducer once or the history initial state will be inconsistent.
          // resolves https://github.com/ory/editor/pull/117#issuecomment-242942796
          // ...past,
          editable(action.editable, action)
        ]),
        present: inner([
          ...present.filter(
            ({ id }: Editable): boolean => id !== action.editable.id
          ),
          // we need to run the rawreducer once or the history initial state will be inconsistent.
          // resolves https://github.com/ory/editor/pull/117#issuecomment-242942796
          editable(action.editable, action)
        ]),
        future
      })
    default:
      return inner(state, action)
  }
}
