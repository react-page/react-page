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
import H1Icon from '@material-ui/icons/LooksOne'
import H2Icon from '@material-ui/icons/LooksTwo'
import H3Icon from '@material-ui/icons/Looks3'
import H4Icon from '@material-ui/icons/Looks4'
import H5Icon from '@material-ui/icons/Looks5'
import H6Icon from '@material-ui/icons/Looks6'
// import { Data } from 'slate'
import { makeTagNode, ToolbarButton } from '../helpers'
import Plugin from './Plugin'
import type { Props } from './props'

export const H1 = 'HEADINGS/HEADING-ONE'
export const H2 = 'HEADINGS/HEADING-TWO'
export const H3 = 'HEADINGS/HEADING-THREE'
export const H4 = 'HEADINGS/HEADING-FOUR'
export const H5 = 'HEADINGS/HEADING-FIVE'
export const H6 = 'HEADINGS/HEADING-SIX'

const createNode = (type: string, el: any, next: any) => ({
  object: 'block',
  type,
  // data: Data.create({ style: el.attribs.style }),
  nodes: next(el.childNodes)
})

export default class HeadingsPlugin extends Plugin {
  constructor(props: Props) {
    super(props)

    this.DEFAULT_NODE = props.DEFAULT_NODE
  }

  props: Props

  // eslint-disable-next-line react/display-name
  createButton = (type, icon) => ({ editorState, onChange }: Props) => {
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

  name = 'headings'

  schema = {
    nodes: {
      [H1]: makeTagNode('h1'),
      [H2]: makeTagNode('h2'),
      [H3]: makeTagNode('h3'),
      [H4]: makeTagNode('h4'),
      [H5]: makeTagNode('h5'),
      [H6]: makeTagNode('h6')
    }
  }

  toolbarButtons = [
    this.createButton(H1, <H1Icon />),
    this.createButton(H2, <H2Icon />),
    this.createButton(H3, <H3Icon />),
    this.createButton(H4, <H4Icon />),
    this.createButton(H5, <H5Icon />),
    this.createButton(H6, <H6Icon />)
  ]

  deserialize = (el, next) => {
    switch (el.tagName.toLowerCase()) {
      case 'h1':
        return createNode(H1, el, next)
      case 'h2':
        return createNode(H2, el, next)
      case 'h3':
        return createNode(H3, el, next)
      case 'h4':
        return createNode(H4, el, next)
      case 'h5':
        return createNode(H5, el, next)
      case 'h6':
        return createNode(H6, el, next)
    }
  }

  serialize = (
    object: { type: string, object: string, data: any },
    children: any[]
  ) => {
    if (object.object !== 'block') {
      return
    }
    const style = { textAlign: object.data.get('align') }

    switch (object.type) {
      case H1:
        return <h1 style={style}>{children}</h1>
      case H2:
        return <h2 style={style}>{children}</h2>
      case H3:
        return <h3 style={style}>{children}</h3>
      case H4:
        return <h4 style={style}>{children}</h4>
      case H5:
        return <h5 style={style}>{children}</h5>
      case H6:
        return <h6 style={style}>{children}</h6>
    }
  }

  renderNode = props => {
    const { children } = props
    const style = { textAlign: props.node.data.get('align') }
    switch (props.node.type) {
      case H1:
        return <h1 style={style}>{children}</h1>
      case H2:
        return <h2 style={style}>{children}</h2>
      case H3:
        return <h3 style={style}>{children}</h3>
      case H4:
        return <h4 style={style}>{children}</h4>
      case H5:
        return <h5 style={style}>{children}</h5>
      case H6:
        return <h6 style={style}>{children}</h6>
    }
  }
}
