import { bindActionCreators } from 'redux';
import {
  updateCellContent,
  updateCellLayout,
  removeCell,
  resizeCell,
  focusCell,
  focusNextCell,
  focusPreviousCell,
  blurAllCells,
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
  cancelCellDrag,
} from './cell/drag';

import {
  insertCellBelow,
  insertCellAbove,
  insertCellRightOf,
  insertCellLeftOf,
  insertCellLeftInline,
  insertCellRightInline,
} from './cell/insert';

import { undo, redo } from './undo';

import { updateEditable } from './editables';

import {
  insertMode,
  editMode,
  previewMode,
  layoutMode,
  resizeMode,
} from './display';
import { cellActions } from './cell';
import { setLang } from './setting';
const Display = {
  insertMode,
  editMode,
  previewMode,
  layoutMode,
  resizeMode,
};

const Setting = {
  setLang,
};
const Cell = cellActions;

export const Actions = {
  Display,
  Cell,
  Setting,
};

export const actions = (dispatch) => ({
  cell: {
    updateContent: (id: string, state: unknown, lang) =>
      dispatch(updateCellContent(id)(state, lang)),
    updateLayout: (id: string, state: unknown, lang) =>
      dispatch(updateCellLayout(id)(state, lang)),

    remove: bindActionCreators({ removeCell }, dispatch).removeCell,
    resize: (id: string, size: number) => dispatch(resizeCell(id)(size)),
    focus: (id: string, source: unknown) => dispatch(focusCell(id)(source)),
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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type ReturnType<T> = T extends (...args: any[]) => infer R ? R : any;

export type ActionsTypes = ReturnType<typeof actions>;
