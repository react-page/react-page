// @flow
import React, { PropTypes } from 'react'
import { HotKeys } from 'react-hotkeys'
import { connect } from 'react-redux'
import { undo, redo } from 'src/editor/actions/undo'
import { removeCell } from 'src/editor/actions/cell'
import { isEditMode } from 'src/editor/selector/display'
import { focus } from 'src/editor/selector/focus'
import { createStructuredSelector } from 'reselect'

const handlers = ({ id, undo, redo, focus, removeCell, isEditMode }: { id: string, undo: Function, redo: Function, removeCell(id: string): Object, focus: string[] }) => ({
  undo: () => undo(id),
  redo: () => redo(id),
  remove: () => {
    if (!isEditMode) {
      focus.map(removeCell)
    }
    return true
  }
  // navigate: () => console.log('navigate')
})

const Decorator = ({ children, ...props }: { children: any, id: string, undo: Function, redo: Function, focus: string[] }) => (
  <HotKeys handlers={handlers(props)} style={{ outline: 'none' }}>
    {children}
  </HotKeys>
)

Decorator.propTypes = {
  children: PropTypes.node.isRequired,
  id: PropTypes.string.isRequired,
  undo: PropTypes.func.isRequired,
  redo: PropTypes.func.isRequired
}

const mapStateToProps = createStructuredSelector({
  isEditMode, focus
})

const mapDispatchToProps = {
  undo,
  redo,
  removeCell
}

export default connect(mapStateToProps, mapDispatchToProps)(Decorator)
