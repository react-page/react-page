import React, { Component, PropTypes } from 'react'
import { shouldPureComponentUpdate } from 'src/editor/helper/shouldComponentUpdate'
import { DragSource as dragSource } from 'react-dnd'
import cssModules from 'react-css-modules'
import { source, collect } from './helper'
import classNames from 'classnames'
import styles from './index.scoped.css'

const instances = {}

class Draggable extends Component {
  shouldComponentUpdate = shouldPureComponentUpdate

  render() {
    const { connectDragSource, isDragging, ...props } = this.props
    const classes = classNames({ 'is-dragging': isDragging })

    return connectDragSource(<div styleName={classes} className={classes} {...props} />)
  }
}

Draggable.propTypes = {
  isDragging: PropTypes.bool.isRequired,
  connectDragSource: PropTypes.func.isRequired,
}

export default (dragType = 'CELL') => {
  if (!instances[dragType]) {
    instances[dragType] = dragSource(dragType, source, collect)(cssModules(Draggable, styles, { allowMultiple: true }))
  }

  return instances[dragType]
}
