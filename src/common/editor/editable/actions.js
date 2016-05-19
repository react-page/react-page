export const REPLACE_EDITOR_STATE = 'REPLACE_EDITOR_STATE'

export const replaceEditorState = (editorState) => ({
  type: REPLACE_EDITOR_STATE,
  payload: editorState
})
