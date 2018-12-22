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
import { bindActionCreators } from 'redux';
import {
  updateCellContent,
  updateCellLayout,
  removeCell,
  resizeCell,
  focusCell,
  focusNextCell,
  focusPreviousCell,
  blurAllCells
} from './cell/core';

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
} from './cell/drag';

import {
  insertCellBelow,
  insertCellAbove,
  insertCellRightOf,
  insertCellLeftOf,
  insertCellLeftInline,
  insertCellRightInline
} from './cell/insert';

import { undo, redo } from './undo';

import { updateEditable } from './editables';

import {
  insertMode,
  editMode,
  previewMode,
  layoutMode,
  resizeMode
} from './display';

export const actions = dispatch => ({
  cell: {
    updateContent: (id: string, state: {}) =>
      dispatch(updateCellContent(id)(state)),
    updateLayout: (id: string, state: {}) =>
      dispatch(updateCellLayout(id)(state)),

    remove: bindActionCreators({ removeCell }, dispatch).removeCell,
    resize: (id: string, size: number) => dispatch(resizeCell(id)(size)),
    focus: (id: string, source: {}) => dispatch(focusCell(id)(source)),
    focusNext: (id: string) => dispatch(focusNextCell(id)()),
    focusPrevious: (id: string) => dispatch(focusPreviousCell(id)()),
    blurAll: bindActionCreators({ blurAllCells }, dispatch).blurAllCells,

    drag: bindActionCreators({ dragCell }, dispatch).dragCell,
    cancelDrag: bindActionCreators({ cancelCellDrag }, dispatch).cancelCellDrag,

    hoverLeftOf: bindActionCreators({ cellHoverLeftOf }, dispatch)
      .cellHoverLeftOf,
    hoverRightOf: bindActionCreators({ cellHoverRightOf }, dispatch)
      .cellHoverRightOf,
    hoverAbove: bindActionCreators({ cellHoverAbove }, dispatch).cellHoverAbove,
    hoverBelow: bindActionCreators({ cellHoverBelow }, dispatch).cellHoverBelow,
    hoverFloatingLeft: bindActionCreators({ cellHoverInlineLeft }, dispatch)
      .cellHoverInlineLeft,
    hoverFloatingRight: bindActionCreators({ cellHoverInlineRight }, dispatch)
      .cellHoverInlineRight,
    clearHover: bindActionCreators({ clearHover }, dispatch).clearHover,

    insertBelow: bindActionCreators({ insertCellBelow }, dispatch)
      .insertCellBelow,
    insertAbove: bindActionCreators({ insertCellAbove }, dispatch)
      .insertCellAbove,
    insertRightOf: bindActionCreators({ insertCellRightOf }, dispatch)
      .insertCellRightOf,
    insertLeftOf: bindActionCreators({ insertCellLeftOf }, dispatch)
      .insertCellLeftOf,
    insertFloatingLeft: bindActionCreators({ insertCellLeftInline }, dispatch)
      .insertCellLeftInline,
    insertFloatingRight: bindActionCreators({ insertCellRightInline }, dispatch)
      .insertCellRightInline,
  },

  editable: {
    add: bindActionCreators({ updateEditable }, dispatch).updateEditable,
    update: bindActionCreators({ updateEditable }, dispatch).updateEditable,
  },

  mode: {
    insert: bindActionCreators({ insertMode }, dispatch).insertMode,
    edit: bindActionCreators({ editMode }, dispatch).editMode,
    preview: bindActionCreators({ previewMode }, dispatch).previewMode,
    layout: bindActionCreators({ layoutMode }, dispatch).layoutMode,
    resize: bindActionCreators({ resizeMode }, dispatch).resizeMode,
  },

  undo: bindActionCreators({ undo }, dispatch).undo,
  redo: bindActionCreators({ redo }, dispatch).redo,
});

// tslint:disable-next-line:no-any
type ReturnType<T> = T extends (...args: any[]) => infer R ? R : any;

export type ActionsTypes = ReturnType<typeof actions>;
