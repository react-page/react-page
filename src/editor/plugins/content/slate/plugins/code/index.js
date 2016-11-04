/* eslint-disable prefer-reflect */
import React from 'react'
import CodeIcon from 'material-ui/svg-icons/action/code'

import { makeTagMark, ToolbarButton } from '../../helpers'
import Plugin from '../Plugin'
import Code from './node'

export const CODE = 'CODE/CODE'

const createButton = (type, icon) => ({ editorState, onChange }) => {
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

const createNodeButton = (type, icon) => ({ editorState, onChange, DEFAULT_NODE }) => {
  const onClick = (e) => {
    e.preventDefault()

    const isActive = editorState.blocks.some((block) => block.type === type)

    onChange(
      editorState
        .transform()
        .setBlock(isActive ? DEFAULT_NODE : type)
        .apply()
    )
  }

  const isActive = editorState.blocks.some((block) => block.type === type)

  return <ToolbarButton onClick={onClick} isActive={isActive} icon={icon} />
}

export default class CodePlugin extends Plugin {
  name = 'code'

  marks = { [CODE]: makeTagMark('code') }
  node = { [CODE]: Code }

  hoverButtons = [createButton(CODE, <CodeIcon />)]
  toolbarButtons = [createNodeButton(CODE, <CodeIcon />)]
}
