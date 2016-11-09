// @flow
import React, { Component } from 'react'
import { shouldPureComponentUpdate } from 'src/editor/helper/shouldComponentUpdate'
import * as hoverActions from 'src/editor/actions/cell/drag'
import * as insertActions from 'src/editor/actions/cell/insert'
import { DragSource as dragSource } from 'react-dnd'
import { connect } from 'react-redux'
import cssModules from 'react-css-modules'
import { source, collect } from './helper/dnd'
import classNames from 'classnames'
import serverContext from 'src/editor/components/ServerContext/connect'

import styles from './index.scoped.css'

const icon = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAhCAYAAACbffiEAAAA6UlEQVRYhe2ZQQ6CMBBFX0njHg7ESXTp1p3uvIBewc3Em3AfdelSFwRDCAm01JRO+pa0lP8zzc9kMCKyAa7AFqhIixdwB44WuACHuHq8KWm1vwtgF1lMCPaWkevUNE3Qr9R17XTu1P5uvUdV+IpbG2qMGBH5xBYRAjUVUWPEjj10SS3XRFry3kha/VBTETVGcmqtDTVGFqdWn7k9ku96f88QNRVRYySn1tpQY8QptXz7qinmnpt7rZTIqbU21BgJ2mv1+XfCDVFTETVGjIg8SG8KP+RZ0I7lU+dmgRNgaKfyZVw9znT/R85fOHJJE77U6UcAAAAASUVORK5CYII='

class Draggable extends Component {
  componentDidMount() {
    const img = new Image()
    img.onload = () => this.props.connectDragPreview(img)
    img.src = icon
  }

  shouldComponentUpdate = shouldPureComponentUpdate

  props: {
    isLeaf: boolean,
    isOver: boolean,
    isOverCurrent: boolean,
    isDragging: boolean,
    isInsertMode: boolean,
    isLayoutMode: boolean,
    isServerContext: boolean,
    node: { hover: string, inline: string },
    children: any,
    className: string,
    connectDragSource<T>(e: T): T,
    connectDragPreview(image: Image): any
  }

  render() {
    const {
      isLeaf, connectDragSource, isDragging, isLayoutMode, isInsertMode, className, node: { inline }, children,
      isServerContext
    } = this.props

    if (isServerContext) {
      return children
    }

    if (!(isLayoutMode || isInsertMode)) {
      return (
        <div className={className}>
          {/* this div is here to prevent page jumping, it is a placeholder for draggable-overlay */}
          <div />
          {children}
        </div>
      )
    }

    return connectDragSource(
      <div styleName={classNames('draggable', { 'is-dragging': isDragging })} className={className} >
        <div styleName={classNames('draggable-overlay', { [`inline-${inline}`]: inline, leaf: isLeaf })} />
        {children}
      </div>
    )
  }
}

const mapDispatchToProps = { ...hoverActions, ...insertActions }

export default serverContext()(connect(null, mapDispatchToProps)(dragSource(({ dragType }: { dragType: string }) => dragType, source, collect)(cssModules(Draggable, styles, { allowMultiple: true }))))
