import { Entity } from 'draft-js'
import { any, compose, identity, propOr, prop, values } from 'ramda'

export const editorState = (state) => state.editorState

export const readOnly = compose(any(identity), values, prop('editedEntities'))

export const entityData = (entityKey) => () => (
  Entity.get(entityKey).getData()
)

export const entityIsEdited = (entityKey) => (state) => (
  propOr(false, entityKey, state.editedEntities)
)
