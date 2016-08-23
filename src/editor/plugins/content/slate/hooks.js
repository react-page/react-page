import { Html, Raw } from 'slate'

const rules = [{
  deserialize: (el) => el.tagName === 'p' ? {
    kind: 'block',
    type: 'paragraph',
    nodes: [{ kind: 'text', ranges: [{ text: el.children[0].data }] }]
  } : null
}, {
  deserialize: (el) => el.tagName === 'h1' ? {
    kind: 'block',
    type: 'heading-one',
    nodes: [{ kind: 'text', ranges: [{ text: el.children[0].data }] }]
  } : null
}, {
  deserialize: (el) => el.tagName === 'h2' ? {
    kind: 'block',
    type: 'heading-two',
    nodes: [{ kind: 'text', ranges: [{ text: el.children[0].data }] }]
  } : null
}, {
  deserialize: (el) => el.tagName === 'h3' ? {
    kind: 'block',
    type: 'heading-three',
    nodes: [{ kind: 'text', ranges: [{ text: el.children[0].data }] }]
  } : null
}]

const html = new Html({ rules })

const options = { terse: true }

export const createInitialState = () => ({
  editorState: Raw.deserialize({
    nodes: [{
      kind: 'block',
      type: 'paragraph',
      nodes: [{
        kind: 'text',
        ranges: [{ text: '' }]
      }]
    }]
  }, options)
})

export const unserialize = ({ importFromHtml, serialized } = {}): { editorState: Object } => {
  if (serialized) {
    return { editorState: Raw.deserialize(serialized, options) }
  } else if (importFromHtml) {
    return { editorState: html.deserialize(importFromHtml, options) }
  }

  return createInitialState()
}

export const serialize = ({ editorState }) => ({
  serialized: Raw.serialize(editorState, options)
})
