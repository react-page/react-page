import type { Action } from 'redux';
export declare const CELL_UPDATE_IS_DRAFT = "CELL_UPDATE_IS_DRAFT";
export declare const CELL_UPDATE_DATA = "CELL_UPDATE_DATA";
export declare const CELL_REMOVE = "CELL_REMOVE";
export declare const CELL_RESIZE = "CELL_RESIZE";
export declare const CELL_FOCUS = "CELL_FOCUS";
export declare const CELL_BLUR: "CELL_BLUR";
export declare const CELL_BLUR_ALL: "CELL_BLUR_ALL";
export interface UpdateCellIsDraftAction extends Action {
    ts: Date;
    id: string;
    isDraft: boolean;
    lang?: string | null;
    type: typeof CELL_UPDATE_IS_DRAFT;
}
export declare const updateCellIsDraft: (id: string, isDraft?: boolean, lang?: string | null) => UpdateCellIsDraftAction;
export interface UpdateCellDataAction extends Action {
    ts: Date;
    id: string;
    data: null | {
        [key: string]: unknown;
    };
    lang: string;
    type: typeof CELL_UPDATE_DATA;
    notUndoable?: boolean;
}
export declare const updateCellData: (id: string) => (data: {
    [key: string]: unknown;
} | null, options: {
    lang: string;
    notUndoable?: boolean;
}) => UpdateCellDataAction;
export interface RemoveCellAction extends Action {
    ts: Date;
    ids: string[];
    type: typeof CELL_REMOVE;
}
export declare const removeCells: (ids: string[]) => RemoveCellAction;
export interface ResizeCellAction extends Action {
    ts: Date;
    id: string;
    size: number;
    type: typeof CELL_RESIZE;
}
export declare const resizeCell: (id: string) => (size?: number) => ResizeCellAction;
export type FocusMode = 'replace' | 'add';
export interface FocusCellAction extends Action {
    ts: Date;
    id: string;
    scrollToCell?: boolean;
    type: typeof CELL_FOCUS;
    mode: FocusMode;
}
/**
 * Dispatch to focus a cell.
 */
export declare const focusCell: (id: string, scrollToCell?: boolean, mode?: FocusMode) => FocusCellAction;
export interface BlurCellAction extends Action {
    ts: Date;
    id: string;
    type: typeof CELL_BLUR;
}
/**
 * Dispatch to blur a cell.
 */
export declare const blurCell: (id: string) => BlurCellAction;
export interface BlurAllCellsAction extends Action {
    ts: Date;
    type: typeof CELL_BLUR_ALL;
}
/**
 * Dispatch to blur all cells. For example when clicking on document body.
 */
export declare const blurAllCells: () => BlurAllCellsAction;
export type CellCoreAction = RemoveCellAction | UpdateCellDataAction | UpdateCellIsDraftAction | BlurAllCellsAction | FocusCellAction;
export declare const coreActions: {
    blurAllCells: () => BlurAllCellsAction;
    blurCell: (id: string) => BlurCellAction;
    focusCell: (id: string, scrollToCell?: boolean, mode?: FocusMode) => FocusCellAction;
    resizeCell: (id: string) => (size?: number) => ResizeCellAction;
    removeCells: (ids: string[]) => RemoveCellAction;
    updateCellData: (id: string) => (data: {
        [key: string]: unknown;
    } | null, options: {
        lang: string;
        notUndoable?: boolean;
    }) => UpdateCellDataAction;
    updateCellIsDraft: (id: string, isDraft?: boolean, lang?: string | null) => UpdateCellIsDraftAction;
};
//# sourceMappingURL=core.d.ts.map