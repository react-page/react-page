// @flow
import React, { PropTypes } from 'react'
import { HotKeys } from 'react-hotkeys'
import { connect } from 'react-redux'
import { undo, redo } from 'src/editor/actions/undo'
import { removeCell, focusCell, blurAllCells } from 'src/editor/actions/cell'
import { isEditMode } from 'src/editor/selector/display'
import { focus } from 'src/editor/selector/focus'
import { node, editable } from 'src/editor/selector/editable'
import { createStructuredSelector } from 'reselect'
import { pathOr } from 'ramda'

const hotKeyHandler = (n: Object, key: string) => pathOr(pathOr(() => true, ['content', 'plugin', key], n), ['layout', 'plugin', key], n)

const nextLeaf = (order: [] = [], current: string) => {
  let last

  return order.find((c: {id: string, isLeaf: boolean}) => {
    if (last === current) {
      return c.isLeaf
    }
    last = c.id
    return false
  })
}

const previousLeaf = (order: [], current: string) => nextLeaf(order.reverse(), current)

// TODO cleanup and tests #143
const handlers = ({ id, undo, redo, focus, removeCell, focusCell, blurAllCells, isEditMode, node, editable }: { id: string, undo: Function, redo: Function, removeCell(id: string): Object, focus: string[] }) => ({
  undo: () => undo(id),
  redo: () => redo(id),

  // remove cells
  remove: (e: Event) => {
    if (!isEditMode) {
      return true
    }

    focus.forEach((cell: string) => {
      const n = node(cell, id)
      if (hotKeyHandler(n, 'onRemoveHotKey')(e, pathOr(pathOr({}, ['layout', 'state'], n), ['content', 'state'], n))) {
        removeCell(cell)
      }
    })
    return true
  },

  // focus next cell
  focusNext: (e: Event) => {
    if (!isEditMode) {
      return true
    }

    focus.forEach((cell: string) => {
      const n = node(cell, id)
      if (hotKeyHandler(n, 'onFocusNextHotKey')(e, pathOr(pathOr({}, ['layout', 'state'], n), ['content', 'state'], n))) {
        const found = nextLeaf(editable.cellOrder, cell)
        if (found) {
          blurAllCells()
          focusCell(found.id)
        }
      }
    })
  },

  // focus previous cell
  focusPrev: (e: Event) => {
    if (!isEditMode) {
      return true
    }

    focus.forEach((cell: string) => {
      const n = node(cell, id)
      if (hotKeyHandler(n, 'onFocusPreviousHotKey')(e, pathOr(pathOr({}, ['layout', 'state'], n), ['content', 'state'], n))) {
        const found = previousLeaf(editable.cellOrder, cell)
        if (found) {
          blurAllCells()
          focusCell(found.id)
        }
      }
    })
  }
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
  node: (state: any) => (id: string, editable: string) => node(state, { id, editable }),
  editable: (state: any, props: any) => editable(state, props)
})

const mapDispatchToProps = {
  undo,
  redo,
  removeCell,
  focusCell: (id: string) => focusCell(id)(),
  blurAllCells
}

export default connect(mapStateToProps, mapDispatchToProps)(Decorator)
