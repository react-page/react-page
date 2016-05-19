export const INSERT_INLINE_ENTITY = 'INSERT_INLINE_ENTITY'
export const REPLACE_EDITOR_STATE = 'REPLACE_EDITOR_STATE'

export const insertInlineEntity = (type, mutability, data) => ({
  type: INSERT_INLINE_ENTITY,
  payload: {
    type,
    mutability,
    data
  }
})

export const replaceEditorState = (editorState) => ({
  type: REPLACE_EDITOR_STATE,
  payload: editorState
})
