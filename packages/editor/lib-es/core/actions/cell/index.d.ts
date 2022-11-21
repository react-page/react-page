import type { CellHoverAction } from './drag';
import type { InsertAction } from './insert';
import type { CellCoreAction } from './core';
export declare const cellActions: {
    blurAllCells: () => import("./core").BlurAllCellsAction;
    blurCell: (id: string) => import("./core").BlurCellAction;
    focusCell: (id: string, scrollToCell?: boolean, mode?: import("./core").FocusMode) => import("./core").FocusCellAction;
    resizeCell: (id: string) => (size?: number) => import("./core").ResizeCellAction;
    removeCells: (ids: string[]) => import("./core").RemoveCellAction;
    updateCellData: (id: string) => (data: {
        [key: string]: unknown;
    } | null, options: {
        lang: string;
        notUndoable?: boolean | undefined;
    }) => import("./core").UpdateCellDataAction;
    updateCellIsDraft: (id: string, isDraft?: boolean, lang?: string | null) => import("./core").UpdateCellIsDraftAction;
    insertCellRightInline: (options: import("./insert").PluginsAndLang) => (partialCell: import("../../types").PartialCell, target: import("../../service/hover/computeHover").HoverTarget, insertOptions?: import("./insert").InsertOptions | undefined, ids?: import("../../types").NewIds) => (dispatch: any) => void;
    insertCellLeftInline: (options: import("./insert").PluginsAndLang) => (partialCell: import("../../types").PartialCell, target: import("../../service/hover/computeHover").HoverTarget, insertOptions?: import("./insert").InsertOptions | undefined, ids?: import("../../types").NewIds) => (dispatch: any) => void;
    insertCellLeftOf: (options: import("./insert").PluginsAndLang) => (partialCell: import("../../types").PartialCell, target: import("../../service/hover/computeHover").HoverTarget, insertOptions?: import("./insert").InsertOptions | undefined, ids?: import("../../types").NewIds) => (dispatch: any) => void;
    insertCellRightOf: (options: import("./insert").PluginsAndLang) => (partialCell: import("../../types").PartialCell, target: import("../../service/hover/computeHover").HoverTarget, insertOptions?: import("./insert").InsertOptions | undefined, ids?: import("../../types").NewIds) => (dispatch: any) => void;
    insertCellAbove: (options: import("./insert").PluginsAndLang) => (partialCell: import("../../types").PartialCell, target: import("../../service/hover/computeHover").HoverTarget, insertOptions?: import("./insert").InsertOptions | undefined, ids?: import("../../types").NewIds) => (dispatch: any) => void;
    insertCellBelow: (options: import("./insert").PluginsAndLang) => (partialCell: import("../../types").PartialCell, target: import("../../service/hover/computeHover").HoverTarget, insertOptions?: import("./insert").InsertOptions | undefined, ids?: import("../../types").NewIds) => (dispatch: any) => void;
    duplicateCell: (item: import("../../types").Cell, options?: import("./insert").DuplicateNodeOptions | undefined) => (dispatch: any) => void;
    insertCellAtTheEnd: (options: import("./insert").PluginsAndLang) => (partialCell: import("../../types").PartialCell, target: import("../../service/hover/computeHover").HoverTarget, insertOptions?: import("./insert").InsertOptions | undefined, ids?: import("../../types").NewIds) => (dispatch: any) => void;
    insert: <T extends "CELL_INSERT_ABOVE" | "CELL_INSERT_BELOW" | "CELL_INSERT_LEFT_OF" | "CELL_INSERT_RIGHT_OF" | "CELL_INSERT_INLINE_LEFT" | "CELL_INSERT_INLINE_RIGHT" | "CELL_INSERT_AT_END" | "CELL_INSERT_AS_NEW_ROW">(type: T) => (options: import("./insert").PluginsAndLang) => (partialCell: import("../../types").PartialCell, target: import("../../service/hover/computeHover").HoverTarget, insertOptions?: import("./insert").InsertOptions | undefined, ids?: import("../../types").NewIds) => (dispatch: any) => void;
    cancelCellDrag: () => import("./drag").CancelCellDragAction;
    clearHover: () => import("./drag").ClearHoverAction;
    dragCell: (id: string) => import("./drag").DragCellAction;
    cellHoverInlineRight: (drag: import("../../types").PartialCell, hover: import("../../service/hover/computeHover").HoverTarget) => CellHoverAction;
    cellHoverInlineLeft: (drag: import("../../types").PartialCell, hover: import("../../service/hover/computeHover").HoverTarget) => CellHoverAction;
    cellHoverBelow: (drag: import("../../types").PartialCell, hover: import("../../service/hover/computeHover").HoverTarget, level?: number | undefined) => CellHoverAction;
    cellHoverAbove: (drag: import("../../types").PartialCell, hover: import("../../service/hover/computeHover").HoverTarget, level?: number | undefined) => CellHoverAction;
    cellHoverRightOf: (drag: import("../../types").PartialCell, hover: import("../../service/hover/computeHover").HoverTarget, level?: number | undefined) => CellHoverAction;
    cellHoverLeftOf: (drag: import("../../types").PartialCell, hover: import("../../service/hover/computeHover").HoverTarget, level?: number | undefined) => CellHoverAction;
    cellHover: (drag: import("../../types").PartialCell, hover: import("../../service/hover/computeHover").HoverTarget, level: number | undefined, position: import("../../const").PositionEnum) => CellHoverAction;
};
export * from './insert';
export * from './core';
export * from './drag';
export type CellAction = CellCoreAction | CellHoverAction | InsertAction;
//# sourceMappingURL=index.d.ts.map