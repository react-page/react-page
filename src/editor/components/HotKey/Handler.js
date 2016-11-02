// @flow
/* eslint-disable no-empty-function */
import React from 'react'
import { HotKeys } from 'react-hotkeys'
import { connect } from 'react-redux'
import { undo, redo } from 'src/editor/actions/undo'
import { removeCell, focusCell, blurAllCells } from 'src/editor/actions/cell'
import { isEditMode } from 'src/editor/selector/display'
import { focus } from 'src/editor/selector/focus'
import { node, editable } from 'src/editor/selector/editable'
import { createStructuredSelector } from 'reselect'
import { pathOr } from 'ramda'
import type { Editable } from 'types/editable'

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

type Props = {
  children: any,
  id: string,
  undo(id: string): void,
  redo(id: string): void,
  removeCell(id: string): void,
  focus: string[],
  focusCell(id: string): void,
  blurAllCells(): void,
  isEditMode: boolean,
  node(cell: string, editable: string): Object,
  editable: Editable
}

const falser = () => {
}

// TODO cleanup and tests #143
const handlers = ({ id, undo, redo, focus, removeCell, focusCell, blurAllCells, isEditMode, node, editable }: Props) => ({
  undo: () => undo(id),
  redo: () => redo(id),

  // remove cells
  remove: (e: Event) => {
    if (!isEditMode) {
      return
    }

    const n = node(focus, id)
    hotKeyHandler(n, 'handleRemoveHotKey')(e, pathOr(pathOr({}, ['layout', 'state'], n), ['content', 'state'], n))
      .then(() => removeCell(focus))
      .catch(falser)
  },

  // focus next cell
  focusNext: (e: Event) => {
    if (!isEditMode) {
      return
    }

    const n = node(focus, id)
    hotKeyHandler(n, 'handleFocusNextHotKey')(e, pathOr(pathOr({}, ['layout', 'state'], n), ['content', 'state'], n))
      .then(() => {
        const found = nextLeaf(editable.cellOrder, focus)
        if (found) {
          blurAllCells()
          focusCell(found.id)
        }
      })
      .catch(falser)
  },

  // focus previous cell
  focusPrev: (e: Event) => {
    if (!isEditMode) {
      return
    }

    const n = node(focus, id)
    hotKeyHandler(n, 'handleFocusPreviousHotKey')(e, pathOr(pathOr({}, ['layout', 'state'], n), ['content', 'state'], n))
      .then(() => {
        const found = previousLeaf(editable.cellOrder, focus)
        if (found) {
          blurAllCells()
          focusCell(found.id)
        }
      })
      .catch(falser)
  }
})

const Decorator = (props: Props) => (
  <HotKeys handlers={handlers(props)} style={{ outline: 'none' }}>
    {props.children}
  </HotKeys>
)

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
