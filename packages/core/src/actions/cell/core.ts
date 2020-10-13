import { Action } from 'redux';
import uuid from 'uuid';
import { NewIds } from '../../types/editable';
import { EditorState } from '../../types/editor';
import { generateIds } from '../helpers';

export const CELL_UPDATE_CONTENT = 'CELL_UPDATE_CONTENT';
export const CELL_UPDATE_IS_DRAFT = 'CELL_UPDATE_IS_DRAFT';
export const CELL_UPDATE_LAYOUT = 'CELL_UPDATE_LAYOUT';
export const CELL_REMOVE = 'CELL_REMOVE';
export const CELL_RESIZE = 'CELL_RESIZE';
export const CELL_FOCUS = 'CELL_FOCUS';
export const CELL_BLUR = 'CELL_BLUR' as const;
export const CELL_BLUR_ALL = 'CELL_BLUR_ALL' as const;

export interface UpdateCellContentAction extends Action {
  ts: Date;
  id: string;
  state: EditorState;
  lang?: string;
  type: typeof CELL_UPDATE_CONTENT;
}

export interface UpdateCellIsDraftAction extends Action {
  ts: Date;
  id: string;
  isDraft: boolean;
  lang?: string;
  type: typeof CELL_UPDATE_IS_DRAFT;
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
  state: EditorState = {},
  lang?: string
): UpdateCellContentAction => ({
  type: CELL_UPDATE_CONTENT,
  ts: new Date(),
  id,
  state,
  lang,
});

/**
 * An action creator for setting the cell's isDraft property
 *
 * @example
 * // const store = redux.createStore()
 * // const cell = { id: '1', ... }
 * store.dispatch(updateCellContent(cell.id, { foo: 'bar' }))
 *
 * @param {string} id The id of the cell that should be updated
 * @return {Action}
 */
export const updateCellIsDraft = (
  id: string,
  isDraft = false,
  lang: string = null
): UpdateCellIsDraftAction => ({
  type: CELL_UPDATE_IS_DRAFT,
  ts: new Date(),
  id,
  isDraft,
  lang,
});

export interface UpdateCellLayoutAction extends Action {
  ts: Date;
  id: string;
  state: EditorState;
  lang?: string;
  type: typeof CELL_UPDATE_LAYOUT;
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
  state: EditorState = {},
  lang?: string
): UpdateCellLayoutAction => ({
  type: CELL_UPDATE_LAYOUT,
  ts: new Date(),
  id,
  state,
  lang,
});

export interface RemoveCellAction extends Action {
  ts: Date;
  id: string;
  ids: NewIds;
  type: typeof CELL_REMOVE;
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
 * @param {string} ids An object of IDs for new cells that might be created.
 * @return {Action}
 */
export const removeCell = (
  id: string,
  ids: NewIds = null
): RemoveCellAction => ({
  type: CELL_REMOVE,
  ts: new Date(),
  id,
  ids: ids ? ids : generateIds(),
});

export interface ResizeCellAction extends Action {
  ts: Date;
  id: string;
  size: number;
  type: typeof CELL_RESIZE;
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
export const resizeCell = (id: string) => (size = 1): ResizeCellAction => ({
  type: CELL_RESIZE,
  ts: new Date(),
  id,
  size,
});

export interface FocusCellAction extends Action {
  ts: Date;
  id: string;
  source: string;
  scrollToCell?: boolean;
  type: typeof CELL_FOCUS;
}
/**
 * Dispatch to focus a cell.
 */
export const focusCell = (
  id: string,
  scrollToCell = false,
  source: string = undefined
): FocusCellAction => ({
  type: CELL_FOCUS,
  ts: new Date(),
  id,
  scrollToCell,
  source,
});

export interface BlurCellAction extends Action {
  ts: Date;
  id: string;
  type: typeof CELL_BLUR;
}
/**
 * Dispatch to blur a cell.
 */
export const blurCell = (id: string): BlurCellAction => ({
  type: CELL_BLUR,
  ts: new Date(),
  id,
});

export interface BlurAllCellsAction extends Action {
  ts: Date;
  type: typeof CELL_BLUR_ALL;
}
/**
 * Dispatch to blur all cells. For example when clicking on document body.
 */
export const blurAllCells = (): BlurAllCellsAction => ({
  type: CELL_BLUR_ALL,
  ts: new Date(),
});

export type CellCoreAction =
  | UpdateCellLayoutAction
  | RemoveCellAction
  | UpdateCellContentAction
  | UpdateCellIsDraftAction
  | BlurAllCellsAction
  | FocusCellAction;

export const coreActions = {
  blurAllCells,
  blurCell,

  focusCell,
  resizeCell,
  removeCell,
  updateCellLayout,
  updateCellContent,
  updateCellIsDraft,
};
