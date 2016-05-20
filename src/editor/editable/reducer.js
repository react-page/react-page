import { Entity, EditorState, Modifier } from 'draft-js'
import { combineReducers } from 'redux'

import {
  BEGIN_EDITING_ENTITY,
  FINISH_EDITING_ENTITY,
  MERGE_ENTITY_DATA,
  REPLACE_EDITOR_STATE,
  INSERT_INLINE_ENTITY
} from './actions'
import decorator from './decorator'

const editedEntities = (
  state = {},
  action
) => {
  switch (action.type) {
    case BEGIN_EDITING_ENTITY:
      return {
        ...state,
        [action.payload]: true
      }
    case FINISH_EDITING_ENTITY:
      return {
        ...state,
        [action.payload]: false
      }
    default:
      return state
  }
}

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

      const newState = EditorState.push(state, withBlankAfter, 'insert-text')

      const newSelectionState = selectionState.merge({
        anchorOffset: selectionState.getAnchorOffset() + 3,
        focusOffset: selectionState.getFocusOffset() + 3
      })

      return EditorState.forceSelection(newState, newSelectionState)
    }
    case MERGE_ENTITY_DATA: {
      const { entityKey, data } = action.payload

      Entity.mergeData(entityKey, data)

      return EditorState.forceSelection(state, state.getSelection())
    }
    case REPLACE_EDITOR_STATE:
      return action.payload
    default:
      return state
  }
}

export default combineReducers({ editorState, editedEntities })
