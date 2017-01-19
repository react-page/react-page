// @flow
import React, { Component, PropTypes } from 'react'
import { DropTarget as dropTarget } from 'react-dnd'
import { connect } from 'react-redux'

import * as hoverActions from '../../../actions/cell/drag'
import * as insertActions from '../../../actions/cell/insert'
import { target, connect as monitorConnect } from './dnd'

import serverContext from '../../ServerContext/connect'

class Droppable extends Component {
  props: {
    connectDropTarget(node: any): any,
    children: any,
    isLayoutMode: boolean,
    isInsertMode: boolean,
    isOverCurrent: boolean,
    isServerContext: boolean
  }

  render() {
    if (this.props.isServerContext) {
      return this.props.children
    }

    if (!(this.props.isLayoutMode || this.props.isInsertMode)) {
      return <div className="ory-row-droppable-placeholder">{this.props.children}</div>
    }

    return this.props.connectDropTarget(<div className="ory-row-droppable">{this.props.children}</div>)
  }
}

Droppable.propTypes = {
  connectDropTarget: PropTypes.func.isRequired
}

const mapDispatchToProps = { ...hoverActions, ...insertActions }

export default (dropTypes: string[] = ['CELL']) => serverContext()(connect(null, mapDispatchToProps)(dropTarget(dropTypes, target, monitorConnect)(Droppable)))
