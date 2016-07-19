import React, { Component } from 'react'
import { Editor, Html, Raw } from 'slate'
import nodes from './nodes'
import deepEqual from 'deep-equal'

const change = (onChange) => (state) => {
  onChange({ editorState: state })
}

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

const renderNode = (node) => {
  switch (node.type) {
    case 'paragraph':
      return nodes.Paragraph
    case 'heading-one':
      return nodes.HeadingOne
    case 'heading-two':
      return nodes.H2
    case 'heading-three':
      return nodes.H3
    case 'code':
      return nodes.CodeNode
    default:
      return
  }
}

class Slate extends Component {
  shouldComponentUpdate(nextProps) {
    return nextProps.editorState !== this.props.editorState
      || nextProps.importFromHtml !== this.props.importFromHtml
      || nextProps.readOnly !== this.props.readOnly
  }

  render() {
    const { onChange, readOnly, importFromHtml, editorState } = this.props

    return (
      <Editor
        readOnly={Boolean(readOnly)}
        renderNode={renderNode}
        onChange={change(onChange)}
        state={editorState || html.deserialize(importFromHtml)}
      />
    )
  }
}

export default Slate
