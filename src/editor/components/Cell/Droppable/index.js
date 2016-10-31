// @flow
import React, { Component } from 'react'
import { shouldPureComponentUpdate } from 'src/editor/helper/shouldComponentUpdate'
import * as hoverActions from 'src/editor/actions/cell/drag'
import * as insertActions from 'src/editor/actions/cell/insert'
import { DropTarget as dropTarget } from 'react-dnd'
import { connect } from 'react-redux'
import cssModules from 'react-css-modules'
import { target, connect as monitorConnect } from './helper/dnd'
import styles from './index.scoped.css'
import classNames from 'classnames'
import serverContext from 'src/editor/components/ServerContext/connect'

class Droppable extends Component {
  shouldComponentUpdate = shouldPureComponentUpdate

  props: {
    isLeaf: boolean,
    isOver: boolean,
    isOverCurrent: boolean,
    isDragging: boolean,
    isInsertMode: boolean,
    isLayoutMode: boolean,
    node: { hover: string, inline: string },
    children: any,
    className: string,
    connectDropTarget<T>(e: T): T,
  }

  render() {
    const { connectDropTarget, isLayoutMode, isInsertMode, className, isLeaf, node: { hover, }, children, isServerContext } = this.props

    if (!(isLayoutMode || isInsertMode)) {
      return (
        <div className={className}>
          {children}
        </div>
      )
    }

    if (isServerContext) {
      return children
    }

    return connectDropTarget(
      <div styleName={classNames({ 'is-over-current': hover, [`is-over-${hover}`]: hover, leaf: isLeaf })}
           className={className}
      >
        {children}
      </div>
    )
  }
}

const mapDispatchToProps = { ...hoverActions, ...insertActions }

export default serverContext()(connect(null, mapDispatchToProps)(dropTarget(({ dropTypes }: { dropTypes: Array<string> }) => dropTypes, target, monitorConnect)(cssModules(Droppable, styles, { allowMultiple: true }))))
