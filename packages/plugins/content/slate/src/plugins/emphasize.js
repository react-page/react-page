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
import BoldIcon from 'material-ui/svg-icons/editor/format-bold'
import ItalicIcon from 'material-ui/svg-icons/editor/format-italic'
import UnderlinedIcon from 'material-ui/svg-icons/editor/format-underlined'
import { makeTagMark, ToolbarButton } from '../helpers'
import Plugin from './Plugin'
import type { Props } from './props'

export const STRONG = 'EMPHASIZE/STRONG'
export const EM = 'EMPHASIZE/EM'
export const U = 'EMPHASIZE/U'

// eslint-disable-next-line react/display-name
const createButton = (type, icon) => ({ editorState, onChange }: Props) => {
  const onClick = e => {
    e.preventDefault()

    onChange(
      editorState
        .transform()
        .toggleMark(type)
        .apply()
    )
  }

  const isActive =
    editorState && editorState.marks.some(mark => mark.type === type)

  return <ToolbarButton onClick={onClick} isActive={isActive} icon={icon} />
}

export default class EmphasizePlugin extends Plugin {
  props: Props

  name = 'emphasize'

  marks = {
    [STRONG]: makeTagMark('strong'),
    [EM]: makeTagMark('em'),
    [U]: makeTagMark('u')
  }

  onKeyDown = (e: Event, data: { key: string, isMod: boolean }, state) => {
    if (data.isMod) {
      let mark

      switch (data.key) {
        case 'b':
          mark = STRONG
          break
        case 'i':
          mark = EM
          break
        case 'u':
          mark = U
          break
        default:
          return
      }

      return state
        .transform()
        .toggleMark(mark)
        .apply()
    }
  }

  hoverButtons = [
    createButton(STRONG, <BoldIcon />),
    createButton(EM, <ItalicIcon />),
    createButton(U, <UnderlinedIcon />)
  ]

  deserialize = (el, next) => {
    switch (el.tagName.toLowerCase()) {
      case 'strong':
      case 'b':
        return {
          kind: 'mark',
          type: STRONG,
          nodes: next(el.childNodes)
        }
      case 'em':
      case 'i':
        return {
          kind: 'mark',
          type: EM,
          nodes: next(el.childNodes)
        }
      case 'u':
        return {
          kind: 'mark',
          type: U,
          nodes: next(el.childNodes)
        }
    }
  }

  serialize = (object: { type: string, kind: string }, children: any[]) => {
    if (object.kind !== 'mark') {
      return
    }
    switch (object.type) {
      case STRONG:
        return <strong>{children}</strong>
      case EM:
        return <em>{children}</em>
      case U:
        return <u>{children}</u>
    }
  }
}
