/* eslint-disable prefer-reflect */
import React from 'react'
import BoldIcon from 'material-ui/svg-icons/editor/format-bold'
import ItalicIcon from 'material-ui/svg-icons/editor/format-italic'
import UnderlinedIcon from 'material-ui/svg-icons/editor/format-underlined'

import { makeTagMark, ToolbarButton } from '../helpers'
import Plugin from './Plugin'
import type Props from './props'

export const STRONG = 'EMPHASIZE/STRONG'
export const EM = 'EMPHASIZE/EM'
export const U = 'EMPHASIZE/U'

// eslint-disable-next-line react/display-name
const createButton = (type, icon) => ({ editorState, onChange }: Props) => {
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

export default class EmphasizePlugin extends Plugin {
  props: Props

  name = 'emphasize'

  marks = {
    [STRONG]: makeTagMark('strong'),
    [EM]: makeTagMark('em'),
    [U]: makeTagMark('u'),
  }

  onKeyDown = (e: Event, data: { key: string, isMod: bool }, state) => {
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
}
