import { Action } from 'redux';

import { NewIds } from '../../types/editable';

import { generateIds } from '../helpers';

export const CELL_UPDATE_IS_DRAFT = 'CELL_UPDATE_IS_DRAFT';
export const CELL_UPDATE_DATA = 'CELL_UPDATE_DATA';
export const CELL_REMOVE = 'CELL_REMOVE';
export const CELL_RESIZE = 'CELL_RESIZE';
export const CELL_FOCUS = 'CELL_FOCUS';
export const CELL_BLUR = 'CELL_BLUR' as const;
export const CELL_BLUR_ALL = 'CELL_BLUR_ALL' as const;

export interface UpdateCellIsDraftAction extends Action {
  ts: Date;
  id: string;
  isDraft: boolean;
  lang?: string;
  type: typeof CELL_UPDATE_IS_DRAFT;
}

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

export interface UpdateCellDataAction extends Action {
  ts: Date;
  id: string;
  data: void | { [key: string]: unknown };
  lang: string;
  type: typeof CELL_UPDATE_DATA;
  notUndoable?: boolean;
}

export const updateCellData = (id: string) => (
  data: void | { [key: string]: unknown },
  options: {
    lang: string;
    notUndoable?: boolean;
  }
): UpdateCellDataAction => ({
  type: CELL_UPDATE_DATA,
  ts: new Date(),
  id,
  data,
  ...options,
});

export interface RemoveCellAction extends Action {
  ts: Date;
  id: string;
  ids: NewIds;
  type: typeof CELL_REMOVE;
}

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
  | RemoveCellAction
  | UpdateCellDataAction
  | UpdateCellIsDraftAction
  | BlurAllCellsAction
  | FocusCellAction;

export const coreActions = {
  blurAllCells,
  blurCell,

  focusCell,
  resizeCell,
  removeCell,
  updateCellData,
  updateCellIsDraft,
};
