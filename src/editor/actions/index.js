import {
  updateCellContent,
  updateCellLayout,
  removeCell,
  resizeCell,
  focusCell,
  focusNextCell,
  focusPreviousCell,
  blurAllCells
} from './cell/core'

import {
  cellHoverLeftOf,
  cellHoverRightOf,
  cellHoverAbove,
  cellHoverBelow,
  cellHoverInlineLeft,
  cellHoverInlineRight,
  dragCell,
  clearHover,
  cancelCellDrag
} from './cell/drag'

import {
  insertCellBelow, insertCellAbove, insertCellRightOf, insertCellLeftOf, insertCellLeftInline, insertCellRightInline
} from './cell/insert'

import { undo, redo } from 'undo'

import { updateEditable } from './editables'

import {
  insertMode,
  editMode,
  previewMode,
  layoutMode,
  resizeMode,
  previousMode
} from './display'

export const actions = {
  cell: {
    updateContent: (id: string, state: {}) => updateCellContent(id)(state),
    updateLayout: (id: string, state: {}) => updateCellLayout(id)(state),

    remove: removeCell,
    resize: (id: string, size: number) => resizeCell(id)(size),
    focus: (id: string, source: {}) => focusCell(id)(source),
    focusNext: (id: string) => focusNextCell(id)(),
    focusPrevious: (id: string) => focusPreviousCell(id)(),
    blurAll: blurAllCells(),

    drag: dragCell,
    cancelDrag: cancelCellDrag,

    hoverLeftOf: cellHoverLeftOf,
    hoverRightOf: cellHoverRightOf,
    hoverAbove: cellHoverAbove,
    hoverBelow: cellHoverBelow,
    hoverFloatingLeft: cellHoverInlineLeft,
    hoverFloatingRight: cellHoverInlineRight,
    clearHover,

    insertBelow: insertCellBelow,
    insertAbove: insertCellAbove,
    insertRightOf: insertCellRightOf,
    insertLeftOf: insertCellLeftOf,
    insertFloatingLeft: insertCellLeftInline,
    insertFloatingRight: insertCellRightInline
  },

  editable: {
    update: updateEditable
  },

  mode: {
    toggleInsert: insertMode,
    toggleEdit: editMode,
    togglePreview: previewMode,
    toggleLayout: layoutMode,
    toggleResize: resizeMode
  },

  undo, redo
}
