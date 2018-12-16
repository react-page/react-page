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

import { gen } from '../helpers';
import { Action } from 'redux';
import { EditorState } from '../../types/editor';

export const CELL_UPDATE_CONTENT = 'CELL_UPDATE_CONTENT';
export const CELL_UPDATE_LAYOUT = 'CELL_UPDATE_LAYOUT';
export const CELL_REMOVE = 'CELL_REMOVE';
export const CELL_RESIZE = 'CELL_RESIZE';
export const CELL_FOCUS = 'CELL_FOCUS';
export const CELL_BLUR = 'CELL_BLUR';
export const CELL_BLUR_ALL = 'CELL_BLUR_ALL';
export const CELL_FOCUS_PREV = 'CELL_FOCUS_PREV';
export const CELL_FOCUS_NEXT = 'CELL_FOCUS_NEXT';
export const CELL_CREATE_FALLBACK = 'CELL_CREATE_FALLBACK';

export interface UpdateCellContentAction extends Action {
  ts: Date;
  id: string;
  state: EditorState;
}
/**
 * An action creator for updating a cell's content data.
 *
 * @example
 * // const store = redux.createStore()
 * // const cell = { id: '1', ... }
 * store.dispatch(updateCellContent(cell.id, { foo: 'bar' }))
 *
 * @param {string} id The id of the cell that should be updated
 * @return {Action}
 */
export const updateCellContent = (id: string) => (
  state: EditorState = {}
): UpdateCellContentAction => ({
  type: CELL_UPDATE_CONTENT,
  ts: new Date(),
  id,
  state,
});

export interface UpdateCellLayoutAction extends Action {
  ts: Date;
  id: string;
  state: EditorState;
}
/**
 * An action creator for updating a cell's layout data.
 *
 * @example
 * // const store = redux.createStore()
 * // const cell = { id: '1', ... }
 * store.dispatch(updateCellLayout(cell.id, { foo: 'bar' }))
 *
 * @param {string} id The id of the cell that should be updated
 * @return {Action}
 */
export const updateCellLayout = (id: string) => (
  state: EditorState = {}
): UpdateCellLayoutAction => ({
  type: CELL_UPDATE_LAYOUT,
  ts: new Date(),
  id,
  state,
});

export interface RemoveCellAction extends Action {
  ts: Date;
  id: string;
  ids: string[];
}
/**
 * An action creator for removing a cell.
 *
 * @example
 * // const store = redux.createStore()
 * // const cell = { id: '1', ... }
 * store.dispatch(removeCell(cell.id, ['1', '2', '3', '4', ...]))
 *
 * @param {string} id The id of the cell that should be removed.
 * @param {string} ids An array of IDs for new cells that might be created.
 * @return {Action}
 */
export const removeCell = (
  id: string,
  ids: string[] = []
): RemoveCellAction => ({
  type: CELL_REMOVE,
  ts: new Date(),
  id,
  ids: ids.length > 0 ? ids : gen(1),
});

export interface ResizeCellAction extends Action {
  ts: Date;
  id: string;
  size: number;
}
/**
 * An action creator for resizing a cell.
 *
 * @example
 * // const store = redux.createStore()
 * // const cell = { id: '1', ... }
 * store.dispatch(resizeCell(cell.id)(size))
 *
 * @param {string} id The id of the cell that should be removed.
 * @param {number} size The cell's new size.
 * @return {Function}
 */
export const resizeCell = (id: string) => (
  size: number = 1
): ResizeCellAction => ({
  type: CELL_RESIZE,
  ts: new Date(),
  id,
  size,
});

export interface FocusCellAction extends Action {
  ts: Date;
  id: string;
  source: string;
}
/**
 * Dispatch to focus a cell.
 */
export const focusCell = (id: string) => ({
  source,
}: { source?: string } = {}): FocusCellAction => ({
  type: CELL_FOCUS,
  ts: new Date(),
  id,
  source,
});

export interface FocusNextCellAction extends Action {
  ts: Date;
  id: string;
}
/**
 * Dispatch to focus a cell.
 */
export const focusNextCell = (id: string) => (): FocusNextCellAction => ({
  type: CELL_FOCUS_NEXT,
  ts: new Date(),
  id,
});

export interface FocusPreviousCellAction extends Action {
  ts: Date;
  id: string;
}
/**
 * Dispatch to focus a cell.
 */
export const focusPreviousCell = (
  id: string
) => (): FocusPreviousCellAction => ({
  type: CELL_FOCUS_PREV,
  ts: new Date(),
  id,
});

export interface BlurCellAction extends Action {
  ts: Date;
  id: string;
}
/**
 * Dispatch to blur a cell.
 */
export const blurCell = (id: string) => (): BlurCellAction => ({
  type: CELL_BLUR,
  ts: new Date(),
  id,
});

export interface BlurAllCellsAction extends Action {
  ts: Date;
}
/**
 * Dispatch to blur all cells. For example when clicking on document body.
 */
export const blurAllCells = (): BlurAllCellsAction => ({
  type: CELL_BLUR_ALL,
  ts: new Date(),
});

export interface CreateFallbackCellAction extends Action {
  ts: Date;
  editable: string;
  ids: string[];
  // tslint:disable-next-line:no-any
  fallback: any;
}
/**
 * Creates a fallback cell, usually done when an editable is empty.
 */
export const createFallbackCell = (
  // tslint:disable-next-line:no-any
  fallback: any,
  editable: string
): CreateFallbackCellAction => ({
  type: CELL_CREATE_FALLBACK,
  ts: new Date(),
  editable,
  ids: gen(1),
  fallback,
});

export const coreActions = {
  createFallbackCell,
  blurAllCells,
  blurCell,
  focusPreviousCell,
  focusNextCell,
  focusCell,
  resizeCell,
  removeCell,
  updateCellLayout,
  updateCellContent,
};
