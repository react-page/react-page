/* eslint-disable prefer-reflect, default-case, react/display-name */
import React from 'react'
import ListIcon from 'material-ui/svg-icons/action/list'
import OrderedListIcon from 'material-ui/svg-icons/editor/format-list-numbered'
import createListPlugin from 'slate-edit-list'
import type { Props } from './props'

import { makeTagNode, ToolbarButton } from '../helpers'
import Plugin from './Plugin'

export const UL = 'LISTS/UNORDERED-LIST'
export const OL = 'LISTS/ORDERED-LIST'
export const LI = 'LISTS/LIST-ITEM'

export default class ListsPlugin extends Plugin {
  constructor(props: Props) {
    super(props)

    this.plugins = [
      createListPlugin({
        typeUL: UL,
        typeOL: OL,
        typeItem: LI,
        typeDefault: props.DEFAULT_NODE
      })
    ]
  }

  props: Props

  // eslint-disable-next-line react/display-name
  createButton = (type, icon) => ({ editorState, onChange }: Props) => {
    const onClick = e => {
      e.preventDefault()

      const isList = editorState.blocks.some(block => block.type === LI)
      const isType = editorState.blocks.some(block =>
        Boolean(
          editorState.document.getClosest(
            block.key,
            parent => parent.type === type
          )
        )
      )

      let transform = editorState.transform()

      if (isList && isType) {
        transform = transform
          .setBlock(this.DEFAULT_NODE)
          .unwrapBlock(UL)
          .unwrapBlock(OL)
      } else if (isList) {
        transform = transform.unwrapBlock(type === UL ? OL : UL).wrapBlock(type)
      } else {
        transform = transform.setBlock(LI).wrapBlock(type)
      }

      onChange(transform.apply())
    }

    const isList = editorState.blocks.some(block => block.type === LI)
    const isType = editorState.blocks.some(block =>
      Boolean(
        editorState.document.getClosest(
          block.key,
          parent => parent.type === type
        )
      )
    )

    return (
      <ToolbarButton
        onClick={onClick}
        isActive={isList && isType}
        icon={icon}
      />
    )
  }

  name = 'lists'

  nodes = {
    [UL]: makeTagNode('ul'),
    [OL]: makeTagNode('ol'),
    [LI]: makeTagNode('li')
  }

  toolbarButtons = [
    this.createButton(UL, <ListIcon />),
    this.createButton(OL, <OrderedListIcon />)
  ]

  deserialize = (el, next) => {
    switch (el.tagName.toLowerCase()) {
      case 'ul':
        return {
          kind: 'block',
          type: UL,
          nodes: next(el.childNodes)
        }
      case 'li':
        return {
          kind: 'block',
          type: LI,
          nodes: next(el.childNodes)
        }
      case 'ol':
        return {
          kind: 'block',
          type: OL,
          nodes: next(el.childNodes)
        }
    }
  }

  serialize = (object: { type: string, kind: string }, children: any[]) => {
    if (object.kind !== 'block') {
      return
    }
    switch (object.type) {
      case UL:
        return <ul>{children}</ul>
      case LI:
        return <li>{children}</li>
      case OL:
        return <ol>{children}</ol>
    }
  }
}
