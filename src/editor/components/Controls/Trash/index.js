import React, { PropTypes } from 'react'
import { DropTarget as dropTarget } from 'react-dnd'
import Delete from 'material-ui/svg-icons/action/delete'
import FloatingActionButton from 'material-ui/FloatingActionButton'
import { connect } from 'react-redux'
import cssModules from 'react-css-modules'
import classNames from 'classnames'
import { removeCell } from 'src/editor/actions/cell/core'

import styles from './index.scoped.css'

const target = {
  drop(props, monitor, component) {
    const item = monitor.getItem()
    if (monitor.didDrop() || !monitor.isOver({ shallow: true })) {
      // If the item drop occurred deeper down the tree, don't do anything
      return
    }

    props.removeCell(item)
  }
}

const connectMonitor = (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  isOverCurrent: monitor.isOver({ shallow: true })
})

const Trash = ({ isLayoutMode, connectDropTarget, isOverCurrent }) => connectDropTarget(
  <div
    styleName={classNames('bar', { active: isLayoutMode })}
  >
    <div styleName="description">
      Drag cells here to delete them
    </div>
    <FloatingActionButton secondary disabled={!isOverCurrent}>
      <Delete />
    </FloatingActionButton>
  </div>
)

const types = (props) => [
  ...Object.keys(props.plugins.plugins.layout),
  ...Object.keys(props.plugins.plugins.content)
].map((p) => props.plugins.plugins.content[p].name || props.plugins.plugins.layout[p].name)

const mapDispatchToProps = {
  removeCell
}

export default connect(null, mapDispatchToProps)(dropTarget(types, target, connectMonitor)(cssModules(Trash, styles, { allowMultiple: true })))
