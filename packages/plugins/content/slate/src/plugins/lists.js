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
import ListIcon from '@material-ui/icons/List'
import OrderedListIcon from '@material-ui/icons/FormatListNumbered'
import IncreaseIndentIcon from '@material-ui/icons/FormatIndentIncrease'
import DecreaseIndentIcon from '@material-ui/icons/FormatIndentDecrease'
import type { Props } from './props'
import createListPlugin from 'slate-edit-list'

import { makeTagNode, ToolbarButton } from '../helpers'
import Plugin from './Plugin'

export const UL = 'LISTS/UNORDERED-LIST'
export const OL = 'LISTS/ORDERED-LIST'
export const LI = 'LISTS/LIST-ITEM'

const INCREASE_INDENT = 'INCREASE_INDENT'
const DECREASE_INDENT = 'DECREASE_INDENT'

export default class ListsPlugin extends Plugin {
  constructor(props: Props) {
    super(props);

    this.DEFAULT_NODE = props.DEFAULT_NODE;
    this.plugin = createListPlugin({
      types: [UL, OL],
      typeItem: LI,
      typeDefault: props.DEFAULT_NODE
    })
    this.plugins = [
      this.plugin
    ]
  }

  props: Props

  // eslint-disable-next-line react/display-name
  createButton = (type, icon) => ({ editorState, onChange }: Props) => {
    const {
      wrapInList,
      unwrapList,
      increaseItemDepth,
      decreaseItemDepth
    } = this.plugin.changes
    const onClick = e => {
      e.preventDefault()

      let change = editorState.change()

      if (type !== UL && type !== OL) {
        if (type === INCREASE_INDENT) {
          increaseItemDepth(change)
        } else {
          decreaseItemDepth(change)
        }
      } else {
        const inList = this.plugin.utils.isSelectionInList(editorState);
        if (inList) {
          unwrapList(change, type)
        } else {
          wrapInList(change, type)
        }
      }

      onChange({ value: change.value })
    }

    const inList = this.plugin.utils.isSelectionInList(editorState);
    const isType = editorState.blocks.some(block =>
      !!editorState.document.getClosest(
        block.key,
        parent => parent.type === type
      )
    )
    const isIncreaseDecrease = type === INCREASE_INDENT || type === DECREASE_INDENT

    const previousItem = this.plugin.utils.getPreviousItem(editorState);
    const currentItem = this.plugin.utils.getCurrentItem(editorState);
    const itemDepth = this.plugin.utils.getItemDepth(editorState);

    const canIncreaseIndent = previousItem && currentItem && isIncreaseDecrease
    const canDecreaseIndent = itemDepth > 1 && currentItem && isIncreaseDecrease

    const increaseDecreaseDisabled = type === INCREASE_INDENT ? !canIncreaseIndent : !canDecreaseIndent

    return (
      <ToolbarButton
        onClick={onClick}
        isActive={inList && isType}
        icon={icon}
        disabled={isIncreaseDecrease && increaseDecreaseDisabled}
      />
    )
  }

  name = 'lists'

  schema = {
    nodes: {
      [UL]: makeTagNode('ul'),
      [OL]: makeTagNode('ol'),
      [LI]: makeTagNode('li')
    }
  }

  toolbarButtons = [
    this.createButton(UL, <ListIcon />),
    this.createButton(OL, <OrderedListIcon />),
    this.createButton(INCREASE_INDENT, <IncreaseIndentIcon />),
    this.createButton(DECREASE_INDENT, <DecreaseIndentIcon />),
  ]

  deserialize = (el, next) => {
    switch (el.tagName.toLowerCase()) {
      case 'ul':
        return {
          object: 'block',
          type: UL,
          nodes: next(el.childNodes)
        }
      case 'li':
        return {
          object: 'block',
          type: LI,
          nodes: next(el.childNodes)
        }
      case 'ol':
        return {
          object: 'block',
          type: OL,
          nodes: next(el.childNodes)
        }
    }
  }

  serialize = (object: { type: string, object: string }, children: any[]) => {
    if (object.object !== 'block') {
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

  renderNode = props => {
    const { children, attributes } = props;
    switch (props.node.type) {
      case UL:
        return <ul {...attributes}>{children}</ul>
      case LI:
        return <li {...attributes}>{children}</li>
      case OL:
        return <ol {...attributes}>{children}</ol>
    }
  }
}
