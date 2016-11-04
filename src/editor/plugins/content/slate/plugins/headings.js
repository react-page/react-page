/* eslint-disable prefer-reflect */
import React from 'react'
import H1Icon from 'material-ui/svg-icons/image/looks-one'
import H2Icon from 'material-ui/svg-icons/image/looks-two'
import H3Icon from 'material-ui/svg-icons/image/looks-3'
import H4Icon from 'material-ui/svg-icons/image/looks-4'
import H5Icon from 'material-ui/svg-icons/image/looks-5'
import H6Icon from 'material-ui/svg-icons/image/looks-6'

import { makeTagNode, ToolbarButton } from '../helpers'
import Plugin from './Plugin'

export const H1 = 'headings/heading-one'
export const H2 = 'headings/heading-two'
export const H3 = 'headings/heading-three'
export const H4 = 'headings/heading-four'
export const H5 = 'headings/heading-five'
export const H6 = 'headings/heading-six'

const createButton = (type, icon) => ({ editorState, onChange, DEFAULT_NODE }) => {
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

export default class EmphasizePlugin extends Plugin {
  name = 'headings'

  nodes = {
    [H1]: makeTagNode('h1'),
    [H2]: makeTagNode('h2'),
    [H3]: makeTagNode('h3'),
    [H4]: makeTagNode('h4'),
    [H5]: makeTagNode('h5'),
    [H6]: makeTagNode('h6')
  }

  toolbarButtons = [
    createButton(H1, <H1Icon />),
    createButton(H2, <H2Icon />),
    createButton(H3, <H3Icon />),
    createButton(H4, <H4Icon />),
    createButton(H5, <H5Icon />),
    createButton(H6, <H6Icon />)
  ]
}
