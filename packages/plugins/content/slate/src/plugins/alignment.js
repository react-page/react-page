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

/* eslint-disable prefer-reflect */
import React from 'react'
import AlignLeftIcon from '@material-ui/icons/FormatAlignLeft'
import AlignCenterIcon from '@material-ui/icons/FormatAlignCenter'
import AlignRightIcon from '@material-ui/icons/FormatAlignRight'
import AlignJustifyIcon from '@material-ui/icons/FormatAlignJustify'

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

      onChange({
        value: editorState
          .change()
          .setBlocks({ data: { align: isActive ? null : align } }).value
      })
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
