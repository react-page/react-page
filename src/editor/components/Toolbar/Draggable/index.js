// @flow
import React, { Component, PropTypes } from 'react'
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

  render() {
    const { connectDragSource, isDragging, children } = this.props
    const classes = classNames({ 'is-dragging': isDragging })

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
