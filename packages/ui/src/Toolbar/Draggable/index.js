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

// @flow
import React, { Component } from 'react'
import { shouldPureComponentUpdate } from 'ory-editor-core/lib/helper/shouldComponentUpdate'
import { DragSource as dragSource } from 'react-dnd'
import { source, collect } from './helper'
import classNames from 'classnames'
import { connect } from 'react-redux'
import { clearHover } from 'ory-editor-core/lib/actions/cell/drag'
import {
  insertMode,
  editMode,
  layoutMode
} from 'ory-editor-core/lib/actions/display'

const instances = {}

class Draggable extends Component {
  componentDidMount() {
    const img = new Image()
    img.onload = () => this.props.connectDragPreview(img)
    img.src =
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAhCAYAAACbffiEAAAA6UlEQVRYhe2ZQQ6CMBBFX0njHg7ESXTp1p3uvIBewc3Em3AfdelSFwRDCAm01JRO+pa0lP8zzc9kMCKyAa7AFqhIixdwB44WuACHuHq8KWm1vwtgF1lMCPaWkevUNE3Qr9R17XTu1P5uvUdV+IpbG2qMGBH5xBYRAjUVUWPEjj10SS3XRFry3kha/VBTETVGcmqtDTVGFqdWn7k9ku96f88QNRVRYySn1tpQY8QptXz7qinmnpt7rZTIqbU21BgJ2mv1+XfCDVFTETVGjIg8SG8KP+RZ0I7lU+dmgRNgaKfyZVw9znT/R85fOHJJE77U6UcAAAAASUVORK5CYII='
  }

  shouldComponentUpdate = shouldPureComponentUpdate

  props: {
    connectDragSource<T>(element: T): T,
    connectDragPreview<T>(element: T): T,
    isDragging: boolean,
    children: any,
    className: string,
    insert: any,
    layoutMode(): void
  }

  render() {
    const { connectDragSource, isDragging, children, className } = this.props
    const classes = classNames(
      className,
      { 'ory-toolbar-draggable-is-dragged': isDragging },
      'ory-toolbar-draggable'
    )

    return connectDragSource(<div className={classes}>{children}</div>)
  }
}

const mapStateToProps = null

const mapDispatchToProps = { insertMode, editMode, layoutMode, clearHover }

export default (dragType: string = 'CELL') => {
  if (!instances[dragType]) {
    instances[dragType] = connect(mapStateToProps, mapDispatchToProps)(
      dragSource(dragType, source, collect)(Draggable)
    )
  }

  return instances[dragType]
}
