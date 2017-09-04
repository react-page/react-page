// @flow
import React, { Component } from 'react'
import { DropTarget as dropTarget } from 'react-dnd'
import { connect } from 'react-redux'
import type { ComponetizedRow } from '../../../types/editable'

import * as hoverActions from '../../../actions/cell/drag'
import * as insertActions from '../../../actions/cell/insert'
import { target, connect as monitorConnect } from './dnd'

type Props = ComponetizedRow & {
  connectDropTarget<T>(e: T): T,
  children: any,
  isLayoutMode: boolean,
  isInsertMode: boolean,
  isOverCurrent: boolean
}

class Droppable extends Component {
  props: Props

  render() {
    if (!(this.props.isLayoutMode || this.props.isInsertMode)) {
      return (
        <div className="ory-row-droppable-container">{this.props.children}</div>
      )
    }

    return this.props.connectDropTarget(
      <div className="ory-row-droppable">{this.props.children}</div>
    )
  }
}

const mapDispatchToProps = { ...hoverActions, ...insertActions }

export default (dropTypes: string[] = ['CELL']) =>
  connect(null, mapDispatchToProps)(
    dropTarget(dropTypes, target, monitorConnect)(Droppable)
  )
