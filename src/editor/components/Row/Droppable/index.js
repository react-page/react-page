// @flow
import React, { Component, PropTypes } from 'react'
import * as hoverActions from 'src/editor/actions/cell/drag'
import * as insertActions from 'src/editor/actions/cell/insert'
import { DropTarget as dropTarget } from 'react-dnd'
import { connect } from 'react-redux'
import { target, connect as monitorConnect } from './dnd'
import cssModules from 'react-css-modules'
import styles from './index.scoped.css'

class Droppable extends Component {
  render() {
    return this.props.connectDropTarget(<div {...this.props} />)
  }
}

Droppable.propTypes = {
  connectDropTarget: PropTypes.func.isRequired
}

const mapDispatchToProps = { ...hoverActions, ...insertActions }

export default (dropTypes : string[] = ['CELL']) => connect(null, mapDispatchToProps)(dropTarget(dropTypes, target, monitorConnect)(cssModules(Droppable, styles, { allowMultiple: true })))
