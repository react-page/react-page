import { EditorState } from 'draft-js'
import { combineReducers } from 'redux'

import { REPLACE_EDITOR_STATE } from './actions'

const editorState = (
  state = EditorState.createEmpty(),
  action
) => {
  switch (action.type) {
    case REPLACE_EDITOR_STATE:
      return action.payload
    default:
      return state
  }
}

export default combineReducers({ editorState })
