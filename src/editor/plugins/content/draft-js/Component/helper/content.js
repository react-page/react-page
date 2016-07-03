import { EditorState, convertFromHTML, ContentState } from 'draft-js'

export const toEditorState = ({ importFromHtml, content, editorState } = {}) => {
  if (importFromHtml) {
    return EditorState.createWithContent(ContentState.createFromBlockArray(convertFromHTML(importFromHtml)))
  } else if (content) {
    return EditorState.createWithContent(content)
  } else if (editorState) {
    return editorState
  }
  return EditorState.createEmpty()
}

export const fromEditorState = (editorState) => ({ content: editorState })
