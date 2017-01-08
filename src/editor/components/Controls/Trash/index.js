// @flow
import React from 'react'
import { DropTarget as dropTarget } from 'react-dnd'
import Delete from 'material-ui/svg-icons/action/delete'
import FloatingActionButton from 'material-ui/FloatingActionButton'
import { connect } from 'react-redux'
import cssModules from 'react-css-modules'
import classNames from 'classnames'
import { removeCell } from 'src/editor/actions/cell/core'
import throttle from 'lodash.throttle'
import type { Monitor, Connector } from 'types/react-dnd'
import styles from './index.scoped.css'
import { isEditMode, isLayoutMode, isPreviewMode, isInsertMode, isResizeMode } from 'src/editor/selector/display'
import { createStructuredSelector } from 'reselect'

const target = {
  hover: throttle((props: any, monitor: Monitor) => {
    const item = monitor.getItem()
    if (monitor.isOver({ shallow: true })) {
      item.clearHover()
    }
  }, 200, { trailing: false }),

  drop(props: { removeCell(id: string): void }, monitor: Monitor) {
    const item = monitor.getItem()
    if (monitor.didDrop() || !monitor.isOver({ shallow: true })) {
      // If the item drop occurred deeper down the tree, don't do anything
      return
    }

    props.removeCell(item.id)
  }
}

const connectMonitor = (connect: Connector, monitor: Monitor) => ({
  connectDropTarget: connect.dropTarget(),
  isOverCurrent: monitor.isOver({ shallow: true })
})

const Trash = ({ isLayoutMode, connectDropTarget, isOverCurrent }: Object) => connectDropTarget(
  <div styleName={classNames('bar', { active: isLayoutMode })}>
    <FloatingActionButton secondary disabled={!isOverCurrent}>
      <Delete />
    </FloatingActionButton>
  </div>
)

const types = (props: Object) => [
  ...Object.keys(props.plugins.plugins.layout),
  ...Object.keys(props.plugins.plugins.content)
].map((p: string) => props.plugins.plugins.content[p].name || props.plugins.plugins.layout[p].name)

const mapDispatchToProps = {
  removeCell
}

const mapStateToProps = createStructuredSelector({
  isEditMode, isLayoutMode, isPreviewMode, isInsertMode, isResizeMode
})

export default connect(mapStateToProps, mapDispatchToProps)(dropTarget(types, target, connectMonitor)(cssModules(Trash, styles, { allowMultiple: true })))
