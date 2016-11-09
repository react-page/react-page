/* eslint-disable prefer-reflect */
import BlockquoteIcon from 'material-ui/svg-icons/editor/format-quote'
import React from 'react'
import createBlockquotePlugin from 'slate-edit-blockquote'

import { makeTagNode, ToolbarButton } from '../helpers'
import Plugin from './Plugin'

export const BLOCKQUOTE = 'BLOCKQUOTE/BLOCKQUOTE'

export default class BlockquotePlugin extends Plugin {
  constructor(props) {
    super(props)

    this.DEFAULT_NODE = props.DEFAULT_NODE
  }

  // eslint-disable-next-line react/display-name
  Button = ({ editorState, onChange }) => {
    const onClick = (e) => {
      e.preventDefault()

      const isActive = editorState.blocks.some((block) => (
        Boolean(editorState.document.getClosest(block, (parent) => parent.type === BLOCKQUOTE))
      ))

      let transform = editorState.transform()

      if (isActive) {
        transform = transform.unwrapBlock(BLOCKQUOTE)
      } else {
        transform = transform.wrapBlock(BLOCKQUOTE)
      }

      onChange(transform.apply())
    }

    const isActive = editorState.blocks.some((block) => (
      Boolean(editorState.document.getClosest(block, (parent) => parent.type === BLOCKQUOTE))
    ))

    return (
      <ToolbarButton onClick={onClick} isActive={isActive} icon={<BlockquoteIcon />} />
    )
  }

  name = 'blockquote'

  nodes = {
    [BLOCKQUOTE]: makeTagNode('blockquote')
  }

  plugins = [
    createBlockquotePlugin({
      type: BLOCKQUOTE,
      typeDefault: this.DEFAULT_NODE
    })
  ]

  toolbarButtons = [
    this.Button
  ]
}
