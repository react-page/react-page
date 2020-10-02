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
export const CELL_BLUR = 'CELL_BLUR';
export const CELL_BLUR_ALL = 'CELL_BLUR_ALL';
export const CELL_FOCUS_PREV = 'CELL_FOCUS_PREV';
export const CELL_FOCUS_NEXT = 'CELL_FOCUS_NEXT';
export const CELL_CREATE_FALLBACK = 'CELL_CREATE_FALLBACK';

export interface UpdateCellContentAction extends Action {
  ts: Date;
  id: string;
  state: EditorState;
  lang?: string;
}

export interface UpdateCellIsDraftAction extends Action {
  ts: Date;
  id: string;
  isDraft: boolean;
  lang?: string;
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
}
/**
 * Dispatch to focus a cell.
 */
export const focusCell = (id: string, scrollToCell = false) => ({
  source,
}: { source?: string } = {}): FocusCellAction => ({
  type: CELL_FOCUS,
  ts: new Date(),
  id,
  scrollToCell,
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
  ids: {
    cell: string;
  };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  fallback: any;
}
/**
 * Creates a fallback cell, usually done when an editable is empty.
 */
export const createFallbackCell = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  fallback: any,
  editable: string
): CreateFallbackCellAction => ({
  type: CELL_CREATE_FALLBACK,
  ts: new Date(),
  editable,
  ids: {
    cell: uuid.v4(),
  },
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
  updateCellIsDraft,
};
