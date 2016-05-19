import { Entity, EditorState, Modifier } from 'draft-js'
import { combineReducers } from 'redux'

import {
  INSERT_INLINE_ENTITY,
  REPLACE_EDITOR_STATE
} from './actions'
import decorator from './decorator'

const editorState = (
  state = EditorState.createEmpty(decorator),
  action
) => {
  switch (action.type) {
    case INSERT_INLINE_ENTITY: {
      const { type, mutability, data } = action.payload

      const entityKey = Entity.create(type, mutability, data)

      const contentState = state.getCurrentContent()
      const selectionState = state.getSelection()

      const withBlankBefore = Modifier.insertText(
        contentState,
        selectionState,
        ' '
      )

      const withEntity = Modifier.insertText(
        withBlankBefore,
        selectionState,
        ' ',
        null,
        entityKey
      )

      const withBlankAfter = Modifier.insertText(
        withEntity,
        selectionState,
        ' '
      )

      return EditorState.push(state, withBlankAfter, 'insert-text')
    }
    case REPLACE_EDITOR_STATE:
      return action.payload
    default:
      return state
  }
}

export default combineReducers({ editorState })
