import type { Action } from 'redux';
import type { HoverTarget } from '../../service/hover/computeHover';
import type { Cell, NewIds, Node, PartialCell, PartialRow, RenderOptions, Row } from '../../types';
export declare const CELL_INSERT_ABOVE = "CELL_INSERT_ABOVE";
export declare const CELL_INSERT_BELOW = "CELL_INSERT_BELOW";
export declare const CELL_INSERT_LEFT_OF = "CELL_INSERT_LEFT_OF";
export declare const CELL_INSERT_RIGHT_OF = "CELL_INSERT_RIGHT_OF";
export declare const CELL_INSERT_INLINE_LEFT = "CELL_INSERT_INLINE_LEFT";
export declare const CELL_INSERT_INLINE_RIGHT = "CELL_INSERT_INLINE_RIGHT";
export declare const CELL_INSERT_AT_END = "CELL_INSERT_AT_END";
export declare const CELL_INSERT_AS_NEW_ROW = "CELL_INSERT_AS_NEW_ROW";
type InsertType = typeof CELL_INSERT_ABOVE | typeof CELL_INSERT_BELOW | typeof CELL_INSERT_LEFT_OF | typeof CELL_INSERT_RIGHT_OF | typeof CELL_INSERT_INLINE_LEFT | typeof CELL_INSERT_INLINE_RIGHT | typeof CELL_INSERT_AT_END | typeof CELL_INSERT_AS_NEW_ROW;
export interface InsertAction extends Action {
    ts: Date;
    item: Cell;
    hoverId: string;
    options: InsertOptions;
    ids: NewIds;
    type: InsertType;
}
export type InsertOptions = {
    level?: number;
    focusAfter?: boolean;
    notUndoable?: boolean;
};
export type PluginsAndLang = {
    lang: string;
} & Pick<RenderOptions, 'cellPlugins'>;
export declare const createRow: (partialRow: PartialRow, options: PluginsAndLang) => Row;
export declare const createCell: (partialCell: PartialCell, options: PluginsAndLang) => Cell;
/**
 * Insert a cell below of the hovering cell.
 */
export declare const insertCellBelow: (options: PluginsAndLang) => (partialCell: PartialCell, target: HoverTarget, insertOptions?: InsertOptions, ids?: NewIds) => (dispatch: any) => void;
/**
 * Insert a cell above of the hovering cell.
 */
export declare const insertCellAbove: (options: PluginsAndLang) => (partialCell: PartialCell, target: HoverTarget, insertOptions?: InsertOptions, ids?: NewIds) => (dispatch: any) => void;
/**
 * Insert a cell right of the hovering cell.
 */
export declare const insertCellRightOf: (options: PluginsAndLang) => (partialCell: PartialCell, target: HoverTarget, insertOptions?: InsertOptions, ids?: NewIds) => (dispatch: any) => void;
/**
 * Insert a cell left of the hovering cell.
 */
export declare const insertCellLeftOf: (options: PluginsAndLang) => (partialCell: PartialCell, target: HoverTarget, insertOptions?: InsertOptions, ids?: NewIds) => (dispatch: any) => void;
/**
 * Insert a cell inside the hovering cell, on the left.
 */
export declare const insertCellLeftInline: (options: PluginsAndLang) => (partialCell: PartialCell, target: HoverTarget, insertOptions?: InsertOptions, ids?: NewIds) => (dispatch: any) => void;
/**
 * Insert a cell inside the hovering cell, on the right.
 */
export declare const insertCellRightInline: (options: PluginsAndLang) => (partialCell: PartialCell, target: HoverTarget, insertOptions?: InsertOptions, ids?: NewIds) => (dispatch: any) => void;
export declare const insertCellAtTheEnd: (options: PluginsAndLang) => (partialCell: PartialCell, target: HoverTarget, insertOptions?: InsertOptions, ids?: NewIds) => (dispatch: any) => void;
export declare const insertCellNewAsNewRow: (options: PluginsAndLang) => (partialCell: PartialCell, target: HoverTarget, insertOptions?: InsertOptions, ids?: NewIds) => (dispatch: any) => void;
export type DuplicateNodeOptions = {
    insertAfterNodeId?: string;
};
export declare const duplicateNode: (node: Node, options?: DuplicateNodeOptions) => (dispatch: any) => void;
export declare const duplicateCell: (item: Cell, options?: DuplicateNodeOptions) => (dispatch: any) => void;
export declare const insertActions: {
    insertCellRightInline: (options: PluginsAndLang) => (partialCell: PartialCell, target: HoverTarget, insertOptions?: InsertOptions, ids?: NewIds) => (dispatch: any) => void;
    insertCellLeftInline: (options: PluginsAndLang) => (partialCell: PartialCell, target: HoverTarget, insertOptions?: InsertOptions, ids?: NewIds) => (dispatch: any) => void;
    insertCellLeftOf: (options: PluginsAndLang) => (partialCell: PartialCell, target: HoverTarget, insertOptions?: InsertOptions, ids?: NewIds) => (dispatch: any) => void;
    insertCellRightOf: (options: PluginsAndLang) => (partialCell: PartialCell, target: HoverTarget, insertOptions?: InsertOptions, ids?: NewIds) => (dispatch: any) => void;
    insertCellAbove: (options: PluginsAndLang) => (partialCell: PartialCell, target: HoverTarget, insertOptions?: InsertOptions, ids?: NewIds) => (dispatch: any) => void;
    insertCellBelow: (options: PluginsAndLang) => (partialCell: PartialCell, target: HoverTarget, insertOptions?: InsertOptions, ids?: NewIds) => (dispatch: any) => void;
    duplicateCell: (item: Cell, options?: DuplicateNodeOptions) => (dispatch: any) => void;
    insertCellAtTheEnd: (options: PluginsAndLang) => (partialCell: PartialCell, target: HoverTarget, insertOptions?: InsertOptions, ids?: NewIds) => (dispatch: any) => void;
    insert: <T extends InsertType>(type: T) => (options: PluginsAndLang) => (partialCell: PartialCell, target: HoverTarget, insertOptions?: InsertOptions, ids?: NewIds) => (dispatch: any) => void;
};
export {};
//# sourceMappingURL=insert.d.ts.map