// @flow
import { identity } from 'ramda'
import React, { Component, PropTypes } from 'react'
import { shouldPureComponentUpdate } from 'src/editor/helper/shouldComponentUpdate'
import * as hoverActions from 'src/editor/actions/cell/drag'
import * as insertActions from 'src/editor/actions/cell/insert'
import { DragSource as dragSource, DropTarget as dropTarget } from 'react-dnd'
import { connect } from 'react-redux'
import cssModules from 'react-css-modules'
import { target, source, connect as monitorConnect, collect } from './helper/dnd'
import styles from './index.scoped.css'
import classNames from 'classnames'

class DragDroppable extends Component {
  shouldComponentUpdate = shouldPureComponentUpdate

  render() {
    const {
      allowDrop = false,
      connectDragSource,
      connectDropTarget,
      isDragging,
      isLayoutMode, isInsertMode,
      className,
      node: {
        hover,
        inline,
      },
      children
    } = this.props

    const decorator = allowDrop && !inline ? connectDropTarget : identity
    let classes = classNames(
      'draggable',
      {
        'is-over-current': hover && allowDrop,
        [`is-over-${hover}`]: hover && allowDrop,
        'is-dragging': isDragging
      }
    )

    if (!(isLayoutMode || isInsertMode)) {
      classes = ''
    }

    if (isLayoutMode || isInsertMode) {
      return connectDragSource(decorator(
        <div styleName={classes} className={className}>
          {children}
        </div>
      ))
    }

    return (
      <div styleName={classes} className={className}>
        {children}
      </div>
    )
  }
}

DragDroppable.propTypes = {
  allowDrop: PropTypes.bool,
  isOver: PropTypes.bool.isRequired,
  isOverCurrent: PropTypes.bool.isRequired,
  isDragging: PropTypes.bool.isRequired,

  node: PropTypes.shape({
    hover: PropTypes.string
  }).isRequired,

  connectDragSource: PropTypes.func.isRequired,
  connectDropTarget: PropTypes.func.isRequired,

  dragCell: PropTypes.func.isRequired,
  clearHover: PropTypes.func.isRequired
}

const mapDispatchToProps = { ...hoverActions, ...insertActions }

export default connect(null, mapDispatchToProps)(dropTarget(({ dropTypes }: { dropTypes: Array<string> }) => dropTypes, target, monitorConnect)(dragSource(({ dragType }: { dragType: string }) => dragType, source, collect)(cssModules(DragDroppable, styles, { allowMultiple: true }))))
