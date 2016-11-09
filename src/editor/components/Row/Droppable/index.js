// @flow
import React, { Component, PropTypes } from 'react'
import * as hoverActions from 'src/editor/actions/cell/drag'
import * as insertActions from 'src/editor/actions/cell/insert'
import { DropTarget as dropTarget } from 'react-dnd'
import { connect } from 'react-redux'
import { target, connect as monitorConnect } from './dnd'
import cssModules from 'react-css-modules'
import classnames from 'classnames'
import styles from './index.scoped.css'
import serverContext from 'src/editor/components/ServerContext/connect'

class Droppable extends Component {
  props: {
    connectDropTarget(node: any): any,
    children: any,
    isLayoutMode: boolean,
    isInsertMode: boolean,
    isOverCurrent: boolean,
  }

  render() {
    if (this.props.isServerContext) {
      return this.props.children
    }

    if (!(this.props.isLayoutMode || this.props.isInsertMode)) {
      return <div>{this.props.children}</div>
    }

    const classes = classnames({
      // 'is-over-current': this.props.isOverCurrent
    })
    return this.props.connectDropTarget(<div styleName={classes}>{this.props.children}</div>)
  }
}

Droppable.propTypes = {
  connectDropTarget: PropTypes.func.isRequired
}

const mapDispatchToProps = { ...hoverActions, ...insertActions }

export default (dropTypes: string[] = ['CELL']) => connect(null, mapDispatchToProps)(dropTarget(dropTypes, target, monitorConnect)(cssModules(serverContext()(Droppable, styles, { allowMultiple: true }))))

