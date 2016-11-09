/* eslint-disable prefer-reflect */
import React from 'react'
import CodeIcon from 'material-ui/svg-icons/action/code'

import { makeTagMark, ToolbarButton } from '../../helpers'
import Plugin from '../Plugin'
import Code from './node'

export const CODE = 'CODE/CODE'

export default class CodePlugin extends Plugin {
  constructor(props) {
    super(props)

    this.DEFAULT_NODE = props.DEFAULT_NODE
  }

  createButton = (type, icon) => ({ editorState, onChange }) => {
    const onClick = (e) => {
      e.preventDefault()

      onChange(
        editorState
          .transform()
          .toggleMark(type)
          .apply()
      )
    }

    const isActive = editorState && editorState.marks.some((mark) => mark.type === type)

    return <ToolbarButton onClick={onClick} isActive={isActive} icon={icon} />
  }

  createNodeButton = (type, icon) => ({ editorState, onChange }) => {
    const onClick = (e) => {
      e.preventDefault()

      const isActive = editorState.blocks.some((block) => block.type === type)

      onChange(
        editorState
          .transform()
          .setBlock(isActive ? this.DEFAULT_NODE : type)
          .apply()
      )
    }

    const isActive = editorState.blocks.some((block) => block.type === type)

    return <ToolbarButton onClick={onClick} isActive={isActive} icon={icon} />
  }

  name = 'code'

  marks = { [CODE]: makeTagMark('code') }
  node = { [CODE]: Code }

  hoverButtons = [this.createButton(CODE, <CodeIcon />)]
  toolbarButtons = [this.createNodeButton(CODE, <CodeIcon />)]
}
