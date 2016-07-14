import React, { Component, PropTypes } from 'react'
import * as hoverActions from 'src/editor/actions/cell/drag'
import * as insertActions from 'src/editor/actions/cell/insert'
import { DragSource as dragSource, DropTarget as dropTarget } from 'react-dnd'
import { connect } from 'react-redux'
import cssModules from 'react-css-modules'
import { target, source, connect as monitorConnect, collect } from './helper'
import styles from './index.scoped.css'
import classNames from 'classnames'

const cn = ({
  isDragging,
  hover
}) => classNames({
  draggable: true,
  'is-over-current': hover,
  'is-dragging': isDragging
})

const DragDroppable = ({
  allowDrop = false,
  connectDragSource,
  connectDropTarget,
  ...props
}) => {
  console.log('is over current', props.isOverCurrent(props))
  return allowDrop
    // FIXME warning.js:44 Warning: Unknown props `isOver`, `isOverCurrent`, `isDragging`, `cellHover`, `cellHoverLeftOf`, `cellHoverRightOf`, `cellHoverAbove`, `cellHoverBelow`, `cellHoverInlineLeft`, `cellHoverInlineRight`, `dragCell`, `cancelCellDrag`, `styles` on <div> tag. Remove these props from the element. For details, see
    ? connectDragSource(connectDropTarget(<div styleName={cn(props)} className={cn(props)} {...props} />))
    : connectDragSource(<div styleName={cn(props)} className={cn(props)} {...props} />)
}

DragDroppable.propTypes = {
  allowDrop: PropTypes.bool,
  connectDragSource: PropTypes.func.isRequired,
  connectDropTarget: PropTypes.func.isRequired,
  isOver: PropTypes.bool.isRequired,
  isOverCurrent: PropTypes.bool.isRequired,
  isDragging: PropTypes.bool.isRequired,
  hover: PropTypes.string,
  dragCell: PropTypes.func.isRequired,
  clearHover: PropTypes.func.isRequired
}

const mapDispatchToProps = { ...hoverActions, ...insertActions }

export default (dragType = 'CELL', dropTypes = ['CELL']) => connect(null, mapDispatchToProps)(dropTarget(dropTypes, target, monitorConnect)(dragSource(dragType, source, collect)(cssModules(DragDroppable, styles, { allowMultiple: true }))))
