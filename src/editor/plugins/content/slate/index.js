import Subject from 'material-ui/svg-icons/action/subject'
import React from 'react'
import { Raw } from 'slate'

import Component from './Component'
import * as hooks from './hooks'

export default {
  Component,
  name: 'ory/content/slate',
  version: '0.0.1',
  icon: <Subject />,
  text: 'Text (Slate)',
  hooks,
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
    }, { terse: true })
  },
}
