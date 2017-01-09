// @flow
import React, { Component } from 'react'
import { shouldPureComponentUpdate } from 'src/editor/helper/shouldComponentUpdate'
import * as hoverActions from 'src/editor/actions/cell/drag'
import * as insertActions from 'src/editor/actions/cell/insert'
import { DropTarget as dropTarget } from 'react-dnd'
import { connect } from 'react-redux'
import { target, connect as monitorConnect } from './helper/dnd'
import classNames from 'classnames'
import serverContext from 'src/editor/components/ServerContext/connect'

import './index.css'

class Droppable extends Component {
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
    connectDropTarget<T>(e: T): T,
  }

  render() {
    const { connectDropTarget, isLayoutMode, isInsertMode, className, isLeaf, node: { hover }, children, isServerContext } = this.props

    if (isServerContext) {
      return children
    }

    if (!(isLayoutMode || isInsertMode)) {
      return (
        <div className={classNames(className, 'ory-cell-droppable-placeholder')}>
          {children}
        </div>
      )
    }

    return connectDropTarget(
      <div className={classNames(
        className,
        'ory-cell-droppable',
        {
          'ory-cell-droppable-is-over-current': hover,
          [`ory-cell-droppable-is-over-${hover}`]: hover,
          'ory-cell-droppable-leaf': isLeaf
        })}>
        {children}
      </div>
    )
  }
}

const mapDispatchToProps = { ...hoverActions, ...insertActions }

export default serverContext()(connect(null, mapDispatchToProps)(dropTarget(({ dropTypes }: { dropTypes: Array<string> }) => dropTypes, target, monitorConnect)(Droppable)))
