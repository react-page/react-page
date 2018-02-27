/*
 * This file is part of ORY Editor.
 *
 * ORY Editor is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Lesser General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * ORY Editor is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public License
 * along with ORY Editor.  If not, see <http://www.gnu.org/licenses/>.
 *
 * @license LGPL-3.0
 * @copyright 2016-2018 Aeneas Rekkas
 * @author Aeneas Rekkas <aeneas+oss@aeneas.io>
 *
 */

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
  insertCellBelow,
  insertCellAbove,
  insertCellRightOf,
  insertCellLeftOf,
  insertCellLeftInline,
  insertCellRightInline
} from './cell/insert'

import { undo, redo } from './undo'

import { updateEditable } from './editables'

import {
  insertMode,
  editMode,
  previewMode,
  layoutMode,
  resizeMode
} from './display'

export const actions = dispatch => ({
  cell: {
    updateContent: (id: string, state: {}) =>
      dispatch(updateCellContent(id)(state)),
    updateLayout: (id: string, state: {}) =>
      dispatch(updateCellLayout(id)(state)),

    remove: (...args) => dispatch(removeCell(...args)),
    resize: (id: string, size: number) => dispatch(resizeCell(id)(size)),
    focus: (id: string, source: {}) => dispatch(focusCell(id)(source)),
    focusNext: (id: string) => dispatch(focusNextCell(id)()),
    focusPrevious: (id: string) => dispatch(focusPreviousCell(id)()),
    blurAll: (...args) => dispatch(blurAllCells(...args)),

    drag: (...args) => dispatch(dragCell(...args)),
    cancelDrag: (...args) => dispatch(cancelCellDrag(...args)),

    hoverLeftOf: (...args) => dispatch(cellHoverLeftOf(...args)),
    hoverRightOf: (...args) => dispatch(cellHoverRightOf(...args)),
    hoverAbove: (...args) => dispatch(cellHoverAbove(...args)),
    hoverBelow: (...args) => dispatch(cellHoverBelow(...args)),
    hoverFloatingLeft: (...args) => dispatch(cellHoverInlineLeft(...args)),
    hoverFloatingRight: (...args) => dispatch(cellHoverInlineRight(...args)),
    clearHover: (...args) => dispatch(clearHover(...args)),

    insertBelow: (...args) => dispatch(insertCellBelow(...args)),
    insertAbove: (...args) => dispatch(insertCellAbove(...args)),
    insertRightOf: (...args) => dispatch(insertCellRightOf(...args)),
    insertLeftOf: (...args) => dispatch(insertCellLeftOf(...args)),
    insertFloatingLeft: (...args) => dispatch(insertCellLeftInline(...args)),
    insertFloatingRight: (...args) => dispatch(insertCellRightInline(...args))
  },

  editable: {
    add: (...args) => dispatch(updateEditable(...args)),
    update: (...args) => dispatch(updateEditable(...args))
  },

  mode: {
    insert: (...args) => dispatch(insertMode(...args)),
    edit: (...args) => dispatch(editMode(...args)),
    preview: (...args) => dispatch(previewMode(...args)),
    layout: (...args) => dispatch(layoutMode(...args)),
    resize: (...args) => dispatch(resizeMode(...args))
  },

  undo: (...args) => dispatch(undo(...args)),
  redo: (...args) => dispatch(redo(...args))
})
