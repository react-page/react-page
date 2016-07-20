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
  insert: {
    editorState: Raw.deserialize({
      nodes: [{
        kind: 'block',
        type: 'placeholder',
        nodes: [{
          kind: 'text',
          ranges: []
        }]
      }]
    })
  },
}
