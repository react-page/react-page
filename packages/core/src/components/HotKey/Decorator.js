// @flow
/* eslint-disable no-empty-function */
import { Component } from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import pathOr from 'ramda/src/pathOr'
import Mousetrap from 'mousetrap'

import { undo, redo } from '../../actions/undo'
import { removeCell, focusCell, blurAllCells } from '../../actions/cell'
import { isEditMode } from '../../selector/display'
import { focus } from '../../selector/focus'
import {
  node,
  editable,
  editables,
  searchNodeEverywhere
} from '../../selector/editable'

import type { Editable, ComponetizedCell } from '../../types/editable'

type Props = {
  children: any,
  id: string,
  undo(id: string): void,
  redo(id: string): void,
  removeCell(id: string): void,
  focus: string,
  focusCell(id: string): void,
  blurAllCells(): void,
  updateCellContent(): any,
  updateCellLayout(): any,
  isEditMode: boolean,
  node(cell: string, editable: string): Object,
  editable: Editable,
  searchNodeEverywhere(
    id: string
  ): { editable: Editable, node: ComponetizedCell }
}

const hotKeyHandler = (n: Object, key: string) =>
  pathOr(
    pathOr(() => Promise.resolve(), ['content', 'plugin', key], n),
    ['layout', 'plugin', key],
    n
  )

const nextLeaf = (order: Array<any> = [], current: string) => {
  let last

  return order.find((c: { id: string, isLeaf: boolean }) => {
    if (last === current) {
      return c.isLeaf
    }
    last = c.id
    return false
  })
}

const previousLeaf = (order: Array<any>, current: string) =>
  nextLeaf([...order].reverse(), current)

const falser = (err: Error) => {
  if (err) {
    console.log(err)
  }
}

if (Mousetrap && Mousetrap.prototype) {
  Mousetrap.prototype.stopCallback = () => false
}

let wasInitialized = false

class Decorator extends Component {
  componentDidMount() {
    if (!wasInitialized) {
      if (!Mousetrap) {
        return
      }

      Mousetrap.bind(['ctrl+z', 'command+z'], this.handlers.undo)
      Mousetrap.bind(
        ['ctrl+shift+z', 'ctrl+y', 'command+shift+z', 'command+y'],
        this.handlers.redo
      )
      Mousetrap.bind(['del', 'backspace'], this.handlers.remove)
      Mousetrap.bind(['down', 'right'], this.handlers.focusNext)
      Mousetrap.bind(['up', 'left'], this.handlers.focusPrev)
      wasInitialized = true
    }
  }

  props: Props

  handlers = {
    undo: () => {
      const { id, undo } = this.props
      undo(id)
    },
    redo: () => {
      const { id, redo } = this.props
      redo(id)
    },

    // remove cells
    remove: (e: Event) => {
      const { focus, removeCell, isEditMode } = this.props
      if (!isEditMode) {
        return
      }

      const { node: n } = this.props.searchNodeEverywhere(focus)
      hotKeyHandler(n, 'handleRemoveHotKey')(e, n)
        .then(() => removeCell(focus))
        .catch(falser)
    },

    // focus next cell
    focusNext: (e: Event) => {
      const { focus, focusCell, blurAllCells, isEditMode } = this.props
      if (!isEditMode) {
        return
      }

      const { node: n, editable } = this.props.searchNodeEverywhere(focus)
      hotKeyHandler(n, 'handleFocusNextHotKey')(e, n)
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
      const { focus, focusCell, blurAllCells, isEditMode } = this.props
      if (!isEditMode) {
        return
      }

      const { node: n, editable } = this.props.searchNodeEverywhere(focus)
      hotKeyHandler(n, 'handleFocusPreviousHotKey')(e, n)
        .then(() => {
          const found = previousLeaf(editable.cellOrder, focus)
          if (found) {
            blurAllCells()
            focusCell(found.id)
          }
        })
        .catch(falser)
    }
  }

  render() {
    const { children } = this.props
    return children
  }
}

const mapStateToProps = createStructuredSelector({
  isEditMode,
  focus,
  node: (state: any) => (id: string, editable: string) =>
    node(state, { id, editable }),
  searchNodeEverywhere: (state: any) => (id: string) =>
    searchNodeEverywhere(state, id),
  editable: (state: any, props: any) => (id?: string) =>
    editable(state, id ? { id } : props),
  editables
})

const mapDispatchToProps = {
  undo,
  redo,
  removeCell,
  focusCell: (id: string) => focusCell(id)(),
  blurAllCells
}

export default connect(mapStateToProps, mapDispatchToProps)(Decorator)
