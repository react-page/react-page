/* eslint-disable prefer-reflect */
import React from 'react'
import AlignLeftIcon from 'material-ui/svg-icons/editor/format-align-left'
import AlignCenterIcon from 'material-ui/svg-icons/editor/format-align-center'
import AlignRightIcon from 'material-ui/svg-icons/editor/format-align-right'
import AlignJustifyIcon from 'material-ui/svg-icons/editor/format-align-justify'

import { ToolbarButton } from '../helpers'
import Plugin from './Plugin'
import type { Props } from './props'

export default class AlignmentPlugin extends Plugin {
  props: Props

  // eslint-disable-next-line react/display-name
  createButton = (align, icon) => ({ editorState, onChange }: Props) => {
    const onClick = e => {
      e.preventDefault()

      const isActive = editorState.blocks.some(
        block => block.data.get('align') === align
      )

      onChange(
        editorState
          .transform()
          .setBlock({ data: { align: isActive ? null : align } })
          .apply()
      )
    }

    const isActive = editorState.blocks.some(
      block => block.data.get('align') === align
    )

    return <ToolbarButton onClick={onClick} isActive={isActive} icon={icon} />
  }

  name = 'alignment'

  toolbarButtons = [
    this.createButton('left', <AlignLeftIcon />),
    this.createButton('center', <AlignCenterIcon />),
    this.createButton('right', <AlignRightIcon />),
    this.createButton('justify', <AlignJustifyIcon />)
  ]
}
