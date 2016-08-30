// @flow
import React, { PropTypes } from 'react'
import { HotKeys } from 'react-hotkeys'
import { connect } from 'react-redux'
import { undo, redo } from 'src/editor/actions/undo'
import { removeCell } from 'src/editor/actions/cell'
import { isEditMode } from 'src/editor/selector/display'
import { focus } from 'src/editor/selector/focus'
import { node } from 'src/editor/selector/editable'
import { createStructuredSelector } from 'reselect'
import { Plugin } from 'src/editor/service/plugin/classes'
import { pathOr } from 'ramda'

const hotKeyHandler = (n: Object, key: string) => pathOr(pathOr(() => true, ['content', 'plugin', key], n), ['layout', 'plugin', key], n)

const handlers = ({ id, undo, redo, focus, removeCell, isEditMode, node }: { id: string, undo: Function, redo: Function, removeCell(id: string): Object, focus: string[] }) => ({
  undo: () => undo(id),
  redo: () => redo(id),
  remove: (e: Event) => {
    if (isEditMode) {
      focus.forEach((cell: string) => {
        const n = node(cell, id)
        if (hotKeyHandler(n, 'onRemoveHotKey')(e, pathOr(pathOr({}, ['layout', 'state'], n), ['content', 'state'], n))) {
          removeCell(cell)
        }
      })
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
  isEditMode, focus,
  node: (state: any) => (id: string, editable: string) => node(state, { id, editable })
})

const mapDispatchToProps = {
  undo,
  redo,
  removeCell,
}

export default connect(mapStateToProps, mapDispatchToProps)(Decorator)
