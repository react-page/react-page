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

export const unserialize = ({ importFromHtml, editorState }) => ({
  editorState: importFromHtml
    ? html.deserialize(importFromHtml, options)
    : Raw.deserialize(editorState, options)
})

export const serialize = ({ editorState }) => ({
  editorState: Raw.serialize(state, options)
})

// join: (states) => states.reduce((p, n) => {}, {}),
// split: (state) => state.nodes.map((n) => [], {})
