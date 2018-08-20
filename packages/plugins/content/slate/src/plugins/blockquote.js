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
import BlockquoteIcon from '@material-ui/icons/FormatQuote'
import React from 'react'
import createBlockquotePlugin from 'slate-edit-blockquote'

import { makeTagNode, ToolbarButton } from '../helpers'
import Plugin from './Plugin'
import type { Props } from './props'

export const BLOCKQUOTE = 'BLOCKQUOTE/BLOCKQUOTE'

export default class BlockquotePlugin extends Plugin {
  constructor(props: Props) {
    super(props)

    this.DEFAULT_NODE = props.DEFAULT_NODE
  }

  // eslint-disable-next-line react/display-name
  Button = ({ editorState, onChange }: Props) => {
    const onClick = e => {
      e.preventDefault()

      const isActive = editorState.blocks.some(block =>
        Boolean(
          editorState.document.getClosest(
            block.key,
            parent => parent.type === BLOCKQUOTE
          )
        )
      )

      let change = editorState.change()

      if (isActive) {
        change = change.unwrapBlock(BLOCKQUOTE)
      } else {
        change = change.wrapBlock(BLOCKQUOTE)
      }

      onChange({ value: change.value })
    }

    const isActive = editorState.blocks.some(block =>
      Boolean(
        editorState.document.getClosest(
          block.key,
          parent => parent.type === BLOCKQUOTE
        )
      )
    )

    return (
      <ToolbarButton
        onClick={onClick}
        isActive={isActive}
        icon={<BlockquoteIcon />}
      />
    )
  }

  name = 'blockquote'

  schema = {
    nodes: {
      [BLOCKQUOTE]: makeTagNode('blockquote')
    }
  }

  plugins = [
    createBlockquotePlugin({
      type: BLOCKQUOTE,
      typeDefault: this.DEFAULT_NODE
    })
  ]

  toolbarButtons = [this.Button]

  deserialize = (el, next) => {
    switch (el.tagName.toLowerCase()) {
      case 'blockquote':
        return {
          object: 'block',
          type: BLOCKQUOTE,
          nodes: next(el.childNodes)
        }
    }
  }

  serialize = (
    object: { type: string, object: string, data: any },
    children: any[]
  ) => {
    if (object.object !== 'block') {
      return
    }
    switch (object.type) {
      case BLOCKQUOTE:
        return (
          <blockquote style={{ textAlign: object.data.get('align') }}>
            {children}
          </blockquote>
        )
    }
  }

  renderNode = props => {
    switch (props.node.type) {
      case BLOCKQUOTE: {
        return (
          <blockquote style={{ textAlign: props.node.data.get('align') }}>
            {props.children}
          </blockquote>
        )
      }
    }
  }
}
