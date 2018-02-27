/*
 * This file is part of ORY Editor.
 *
 * ORY Editor is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Lesser General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *  
 * ORY Editor is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Lesser General Public License for more details.
 *  
 * You should have received a copy of the GNU Lesser General Public License
 * along with ORY Editor.  If not, see <http://www.gnu.org/licenses/>.
 *
 * @license LGPL-3.0
 * @copyright 2016-2018 Aeneas Rekkas
 * @author Aeneas Rekkas <aeneas+oss@aeneas.io>
 *
 */

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
        types: [UL, OL],
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
