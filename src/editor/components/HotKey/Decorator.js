// @flow
/* eslint-disable no-empty-function */
import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { undo, redo } from 'src/editor/actions/undo'
import { removeCell, focusCell, blurAllCells } from 'src/editor/actions/cell'
import { isEditMode } from 'src/editor/selector/display'
import { focus } from 'src/editor/selector/focus'
import { node, editable } from 'src/editor/selector/editable'
import { createStructuredSelector } from 'reselect'
import pathOr from 'ramda/src/pathOr'
import type { Editable } from 'types/editable'
import Mousetrap from 'mousetrap'

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
  editable: Editable
}

const hotKeyHandler = (n: Object, key: string) => pathOr(pathOr(() => Promise.resolve(), ['content', 'plugin', key], n), ['layout', 'plugin', key], n)

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

const previousLeaf = (order: [], current: string) => nextLeaf([...order].reverse(), current)

const falser = (err: Error) => {
  if (err) {
    console.log(err)
  }
}

// TODO cleanup and tests #143
const handlers = (props: Props) => {
  const { id, undo, redo, focus, removeCell, focusCell, blurAllCells, isEditMode, node, editable } = props
  return ({
    undo: () => {
      console.log('undo')
      undo(id)
    },
    redo: () => redo(id),

    // remove cells
    remove: (e: Event) => {
      if (!isEditMode) {
        return
      }

      const n = node(focus, id)
      hotKeyHandler(n, 'handleRemoveHotKey')(e, n)
        .then(() => removeCell(focus))
        .catch(falser)
    },

    // focus next cell
    focusNext: (e: Event) => {
      if (!isEditMode) {
        return
      }

      const n = node(focus, id)
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
      if (!isEditMode) {
        return
      }

      const n = node(focus, id)
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
  })
}

// const hotKeyMap = {
//   undo: ['ctrl+z', 'command+z'],
//   redo: ['ctrl+shift+z', 'ctrl+y', 'command+shift+z', 'command+y'],
//   remove: ['del', 'backspace'],
//   focusNext: ['down', 'right'],
//   focusPrev: ['up', 'left'],
//   // insert: ['insert']
// }

class Decorator extends Component {
  componentDidMount() {
    console.log('mousetrap')
    // Mousetrap.unbind(['ctrl+z', 'command+z'])
    // Mousetrap.unbind(['ctrl+shift+z', 'ctrl+y', 'command+shift+z', 'command+y'])
    // Mousetrap.unbind(['del', 'backspace'])
    // Mousetrap.unbind(['down', 'right'])
    // Mousetrap.unbind(['up', 'left'])
    Mousetrap.bind(['ctrl+z', 'command+z'], handlers(this.props).undo)
    Mousetrap.bind(['ctrl+shift+z', 'ctrl+y', 'command+shift+z', 'command+y'], handlers(this.props).redo)
    Mousetrap.bind(['del', 'backspace'], handlers(this.props).remove)
    Mousetrap.bind(['down', 'right'], handlers(this.props).focusNext)
    Mousetrap.bind(['up', 'left'], handlers(this.props).focusPrev)
  }

  componentDidUpdate() {
    // Mousetrap.unbind(['ctrl+z', 'command+z'])
    // Mousetrap.unbind(['ctrl+shift+z', 'ctrl+y', 'command+shift+z', 'command+y'])
    // Mousetrap.unbind(['del', 'backspace'])
    // Mousetrap.unbind(['down', 'right'])
    // Mousetrap.unbind(['up', 'left'])
    // Mousetrap.bind(['ctrl+z', 'command+z'], () => handlers(this.props).undo)
    // Mousetrap.bind(['ctrl+shift+z', 'ctrl+y', 'command+shift+z', 'command+y'], () => handlers(this.props).redo)
    // Mousetrap.bind(['del', 'backspace'], () => handlers(this.props).remove)
    // Mousetrap.bind(['down', 'right'], () => handlers(this.props).focusNext)
    // Mousetrap.bind(['up', 'left'], () => handlers(this.props).focusPrev)
  }

  props: Props

  render() {
    const { children, id } = this.props
    return <div>{ children }</div>
  }
}

Decorator.propTypes = {
  children: PropTypes.node.isRequired,
  id: PropTypes.string.isRequired
}

const mapStateToProps = createStructuredSelector({
  isEditMode, focus,
  node: (state: any) => (id: string, editable: string) => node(state, { id, editable }),
  editable: (state: any, props: any) => editable(state, props),
})

const mapDispatchToProps = {
  undo,
  redo,
  removeCell,
  focusCell: (id: string) => focusCell(id)(),
  blurAllCells
}

export default connect(mapStateToProps, mapDispatchToProps)(Decorator)
