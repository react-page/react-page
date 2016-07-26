import React from 'react'
import Component from './Component'
import Subject from 'material-ui/svg-icons/action/subject'
import { Raw } from 'slate'

export default {
  Component,
  name: 'ory/content/slate',
  version: '0.0.1',
  icon: <Subject />,
  text: 'Text (Slate)',
  hooks: {
    // join: (states) => states.reduce((p, n) => {}, {}),
    // split: (state) => state.nodes.map((n) => [], {})
  },
  insert: {
    editorState: Raw.deserialize({
      nodes: [{
        kind: 'block',
        type: 'paragraph',
        nodes: [{
          kind: 'text',
          ranges: [{ text: '' }]
        }]
      }]
    })
  },
}
