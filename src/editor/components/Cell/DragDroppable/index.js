import React, { Component, PropTypes } from 'react'
import * as actions from 'src/editor/actions/cell/drag'
import { DragSource as dragSource, DropTarget as dropTarget } from 'react-dnd'
import { CELL } from 'src/common/items'
import { connect } from 'react-redux'
import cssModules from 'react-css-modules'
import { target, source, connect as monitorConnect, collect } from './helper'
import styles from './index.scoped.css'

class DragDroppable extends Component {
  render(props) {
    return (
      <div {...props} />
    )
  }
}

DragDroppable.propTypes = {}

const mapStateToProps = null

const mapDispatchToProps = actions

export default dropTarget(CELL, target, monitorConnect)(dragSource(CELL, source, collect)(connect(mapStateToProps, mapDispatchToProps)(cssModules(DragDroppable, styles))))
