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
import { DragSource as dragSource } from 'react-dnd'
import { connect } from 'react-redux'
import classNames from 'classnames'

import { shouldPureComponentUpdate } from '../../../helper/shouldComponentUpdate'
import * as hoverActions from '../../../actions/cell/drag'
import * as insertActions from '../../../actions/cell/insert'
import { source, collect } from './helper/dnd'

import type { ComponetizedCell } from '../../../types/editable'

const icon =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAhCAYAAACbffiEAAAA6UlEQVRYhe2ZQQ6CMBBFX0njHg7ESXTp1p3uvIBewc3Em3AfdelSFwRDCAm01JRO+pa0lP8zzc9kMCKyAa7AFqhIixdwB44WuACHuHq8KWm1vwtgF1lMCPaWkevUNE3Qr9R17XTu1P5uvUdV+IpbG2qMGBH5xBYRAjUVUWPEjj10SS3XRFry3kha/VBTETVGcmqtDTVGFqdWn7k9ku96f88QNRVRYySn1tpQY8QptXz7qinmnpt7rZTIqbU21BgJ2mv1+XfCDVFTETVGjIg8SG8KP+RZ0I7lU+dmgRNgaKfyZVw9znT/R85fOHJJE77U6UcAAAAASUVORK5CYII='

type Props = ComponetizedCell & {
  isLeaf: boolean,
  isOver: boolean,
  isOverCurrent: boolean,
  isDragging: boolean,
  isInsertMode: boolean,
  isLayoutMode: boolean,
  node: { hover: string, inline: string },
  children: any,
  className: string,
  connectDragSource<T>(e: T): T,
  connectDragPreview(image: Image): any,
  name: string,
  dragType: string
}

class Draggable extends Component {
  componentDidMount() {
    const img = new Image()
    img.onload = () => this.props.connectDragPreview(img)
    img.src = icon
  }

  shouldComponentUpdate = shouldPureComponentUpdate

  props: Props

  render() {
    const {
      isLeaf,
      connectDragSource,
      isDragging,
      isLayoutMode,
      node: { inline },
      children,
      name
    } = this.props

    if (!isLayoutMode) {
      return (
        <div className="ory-cell-draggable-container">
          {/* these divs are here to prevent page jumping, they are a placeholder for draggable / draggable-overlay */}
          <div className="ory-cell-draggable-overlay-placeholder" />
          {children}
        </div>
      )
    }

    return connectDragSource(
      <div
        className={classNames('ory-cell-draggable', {
          'ory-cell-draggable-is-dragging': isDragging
        })}
      >
        <div
          className={classNames('ory-cell-draggable-overlay', {
            [`ory-cell-draggable-inline-${inline}`]: inline,
            'ory-cell-draggable-leaf': isLeaf
          })}
        >
          <div className="ory-cell-draggable-overlay-description">
            <span>{name}</span>
          </div>
        </div>
        {children}
      </div>
    )
  }
}

const mapDispatchToProps = {
  ...hoverActions,
  ...insertActions
}

export default connect(
  null,
  mapDispatchToProps
)(
  dragSource(({ dragType }: { dragType: string }) => dragType, source, collect)(
    Draggable
  )
)
