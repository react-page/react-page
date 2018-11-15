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
import CodeIcon from '@material-ui/icons/Code'
import { Data } from 'slate'
import { makeTagMark, ToolbarButton } from '../../helpers'
import Plugin from '../Plugin'
import Code from './node'
import type { Props } from '../props'

export const CODE = 'CODE/CODE'

export default class CodePlugin extends Plugin {
  constructor(props: Props) {
    super(props)

    this.DEFAULT_NODE = props.DEFAULT_NODE
  }

  props: Props

  createButton = (type, icon) => {
    const Button = ({ editorState, onChange }: Props) => {
      const onClick = e => {
        e.preventDefault()

        onChange({
          value: editorState.change().toggleMark(type).value
        })
      }

      const isActive =
        editorState && editorState.marks.some(mark => mark.type === type)

      return <ToolbarButton onClick={onClick} isActive={isActive} icon={icon} />
    }

    return Button
  }

  createNodeButton = (type, icon) => {
    const Button = ({ editorState, onChange }: Props) => {
      const onClick = e => {
        e.preventDefault()

        const isActive = editorState.blocks.some(block => block.type === type)

        onChange({
          value: editorState
            .change()
            .setBlocks(isActive ? this.DEFAULT_NODE : type).value
        })
      }

      const isActive = editorState.blocks.some(block => block.type === type)

      return <ToolbarButton onClick={onClick} isActive={isActive} icon={icon} />
    }

    return Button
  }

  name = 'code'
  schema = {
    marks: { [CODE]: makeTagMark('code') },
    nodes: { [CODE]: Code }
  }

  hoverButtons = [this.createButton(CODE, <CodeIcon />)]
  toolbarButtons = [this.createNodeButton(CODE, <CodeIcon />)]

  deserialize = (el, next) => {
    switch (el.tagName.toLowerCase()) {
      case 'code':
        return {
          object: 'mark',
          type: CODE,
          data: Data.create({}),
          nodes: next(el.childNodes)
        }
      case 'pre':
        return {
          object: 'block',
          type: CODE,
          nodes: next(el.childNodes)
        }
    }
  }

  serialize = (
    object: { type: string, object: string, data: any },
    children: any[]
  ) => {
    if (object.object === 'mark') {
      switch (object.type) {
        case CODE:
          return (
            <code className="ory-plugins-content-slate-code">{children}</code>
          )
      }
    } else if (object.object === 'block') {
      switch (object.type) {
        case CODE:
          return (
            <pre style={{ overflow: 'scroll' }}>
              <code>{children}</code>
            </pre>
          )
      }
    }
  }

  renderMark = props => {
    const { children, mark, attributes } = props

    switch (mark.type) {
      case CODE:
        return (
          <code {...attributes} className="ory-plugins-content-slate-code">
            {children}
          </code>
        )
    }
  }

  renderNode = props => {
    const { node } = props

    switch (node.type) {
      case CODE:
        return <Code {...props} />
    }
  }
}
