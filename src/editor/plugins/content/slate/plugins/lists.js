/* eslint-disable prefer-reflect */
import ListIcon from 'material-ui/svg-icons/action/list'
import OrderedListIcon from 'material-ui/svg-icons/editor/format-list-numbered'
import React from 'react'
import createListPlugin from 'slate-edit-list'

import { makeTagNode, ToolbarButton } from '../helpers'
import Plugin from './Plugin'

const UL = 'lists/unordered-list'
const OL = 'lists/ordered-list'
const LI = 'lists/list-item'

export default class ListsPlugin extends Plugin {
  constructor(props) {
    super(props)

    this.DEFAULT_NODE = props.DEFAULT_NODE
  }

  createButton = (type, icon) => ({ editorState, onChange }) => {
    const onClick = (e) => {
      e.preventDefault()


      const isList = editorState.blocks.some((block) => block.type === LI)
      const isType = editorState.blocks.some((block) => (
        Boolean(editorState.document.getClosest(block, (parent) => parent.type === type))
      ))

      let transform = editorState.transform()

      if (isList && isType) {
        transform = transform
          .setBlock(this.DEFAULT_NODE)
          .unwrapBlock(UL)
          .unwrapBlock(OL)
      } else if (isList) {
        transform = transform
          .unwrapBlock(type === UL ? OL : UL)
          .wrapBlock(type)
      } else {
        transform = transform
          .setBlock(LI)
          .wrapBlock(type)
      }

      onChange(transform.apply())
    }

    const isList = editorState.blocks.some((block) => block.type === LI)
    const isType = editorState.blocks.some((block) => (
      Boolean(editorState.document.getClosest(block, (parent) => parent.type === type))
    ))

    return <ToolbarButton onClick={onClick} isActive={isList && isType} icon={icon} />
  }

  name = 'lists'

  nodes = {
    [UL]: makeTagNode('ul'),
    [OL]: makeTagNode('ol'),
    [LI]: makeTagNode('li')
  }

  plugins = [
    createListPlugin({
      typeUL: UL,
      typeOL: OL,
      typeItem: LI,
      typeDefault: this.DEFAULT_NODE
    }),
  ]

  toolbarButtons = [
    this.createButton(UL, <ListIcon />),
    this.createButton(OL, <OrderedListIcon />)
  ]
}
