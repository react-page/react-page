// @flow
import React, { Component } from 'react'
import { shouldPureComponentUpdate } from 'src/editor/helper/shouldComponentUpdate'
import { DragSource as dragSource } from 'react-dnd'
import cssModules from 'react-css-modules'
import { source, collect } from './helper'
import classNames from 'classnames'
import { connect } from 'react-redux'
import { clearHover } from 'src/editor/actions/cell/drag'
import { insertMode, editMode, layoutMode } from 'src/editor/actions/display'

import styles from './index.scoped.css'

const instances = {}

class Draggable extends Component {
  shouldComponentUpdate = shouldPureComponentUpdate

  componentDidMount() {
    const img = new Image();
    img.onload = () => this.props.connectDragPreview(img)
    img.src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAhCAYAAACbffiEAAAA6UlEQVRYhe2ZQQ6CMBBFX0njHg7ESXTp1p3uvIBewc3Em3AfdelSFwRDCAm01JRO+pa0lP8zzc9kMCKyAa7AFqhIixdwB44WuACHuHq8KWm1vwtgF1lMCPaWkevUNE3Qr9R17XTu1P5uvUdV+IpbG2qMGBH5xBYRAjUVUWPEjj10SS3XRFry3kha/VBTETVGcmqtDTVGFqdWn7k9ku96f88QNRVRYySn1tpQY8QptXz7qinmnpt7rZTIqbU21BgJ2mv1+XfCDVFTETVGjIg8SG8KP+RZ0I7lU+dmgRNgaKfyZVw9znT/R85fOHJJE77U6UcAAAAASUVORK5CYII='
  }

  render() {
    const { connectDragSource, isDragging, children } = this.props
    const classes = classNames({ 'is-dragging': isDragging }, 'draggable')

    return connectDragSource(<div styleName={classes} className={classes}>{children}</div>)
  }
}

const mapStateToProps = null

const mapDispatchToProps = { insertMode, editMode, layoutMode, clearHover }

export default (dragType: string = 'CELL') => {
  if (!instances[dragType]) {
    instances[dragType] = connect(mapStateToProps, mapDispatchToProps)(dragSource(dragType, source, collect)(cssModules(Draggable, styles, { allowMultiple: true })))
  }

  return instances[dragType]
}
