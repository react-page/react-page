/**
 * @module src/editor/actions/cell/drag
 */
import { PositionEnum } from '../../const';
import type { Action } from 'redux';
import type { PartialCell } from '../../types/node';
import type { HoverTarget } from '../../service/hover/computeHover';
export declare const CELL_DRAG_HOVER = "CELL_DRAG_HOVER";
export declare const CELL_DRAG = "CELL_DRAG";
export declare const CELL_DRAG_CANCEL = "CELL_DRAG_CANCEL";
export declare const CLEAR_CLEAR_HOVER = "CLEAR_CLEAR_HOVER";
export interface CellHoverAction extends Action {
    ts: Date;
    dragId?: string;
    hoverId?: string;
    level: number;
    position: PositionEnum;
    type: typeof CELL_DRAG_HOVER;
}
/**
 * Creates a redux action for when a cell hovers another item.
 *
 * @example
 * // const store = redux.createStore()
 * store.dispatch(cellHover(drag, hover, level, position))
 *
 * @param {PartialCell} drag The cell that is currently being dragged.
 * @param {Cell} hover The cell that is being hovered by the dragged cell.
 * @param {number} level Set the level if the dragged cells should hover over an ancestor of hover.
 * @param {string} position Can be left, right, above, below.
 * @return {Action}
 */
export declare const cellHover: (drag: PartialCell, hover: HoverTarget, level: number | undefined, position: PositionEnum) => CellHoverAction;
/**
 * Creates a redux action for when a cell is hovering another cell on the left.
 *
 * @example
 * // const store = redux.createStore()
 * store.dispatch(cellHoverLeftOf(drag, hover, level))
 *
 * @param {PartialCell} drag The cell that is currently being dragged.
 * @param {Cell} hover The cell that is being hovered by the dragged cell.
 * @param {number} level Set the level if the dragged cells should hover over an ancestor of hover.
 * @return {Action}
 */
export declare const cellHoverLeftOf: (drag: PartialCell, hover: HoverTarget, level?: number) => CellHoverAction;
/**
 * Creates a redux action for when a cell is hovering another cell on the right.
 *
 * @example
 * // const store = redux.createStore()
 * store.dispatch(cellHoverRightOf(drag, hover, level))
 *
 * @param {PartialCell} drag The cell that is currently being dragged.
 * @param {Cell} hover The cell that is being hovered by the dragged cell.
 * @param {number} level Set the level if the dragged cells should hover over an ancestor of hover.
 * @return {Action}
 */
export declare const cellHoverRightOf: (drag: PartialCell, hover: HoverTarget, level?: number) => CellHoverAction;
/**
 * Creates a redux action for when a cell is hovering another cell above.
 *
 * @example
 * // const store = redux.createStore()
 * store.dispatch(cellHoverAbove(drag, hover, level))
 *
 * @param {PartialCell} drag The cell that is currently being dragged.
 * @param {Cell} hover The cell that is being hovered by the dragged cell.
 * @param {number} level Set the level if the dragged cells should hover over an ancestor of hover.
 * @return {Action}
 */
export declare const cellHoverAbove: (drag: PartialCell, hover: HoverTarget, level?: number) => CellHoverAction;
/**
 * Creates a redux action for when a cell is hovering another cell below.
 *
 * @example
 * // const store = redux.createStore()
 * store.dispatch(cellHoverBelow(drag, hover, level))
 *
 * @param {PartialCell} drag The cell that is currently being dragged.
 * @param {Cell} hover The cell that is being hovered by the dragged cell.
 * @param {number} level Set the level if the dragged cells should hover over an ancestor of hover.
 * @return {Action}
 */
export declare const cellHoverBelow: (drag: PartialCell, hover: HoverTarget, level?: number) => CellHoverAction;
/**
 * Creates a redux action for when a cell is hovering another cell on the left, but inline (css floating).
 *
 * @example
 * // const store = redux.createStore()
 * store.dispatch(cellHoverInlineLeft(drag, hover))
 *
 * @param {PartialCell} drag The cell that is currently being dragged.
 * @param {Cell} hover The cell that is being hovered by the dragged cell.
 * @return {Action}
 */
export declare const cellHoverInlineLeft: (drag: PartialCell, hover: HoverTarget) => CellHoverAction;
/**
 * Creates a redux action for when a cell is hovering another cell on the right, but inline (css floating).
 *
 * @example
 * // const store = redux.createStore()
 * store.dispatch(cellHoverInlineRight(drag, hover))
 *
 * @param {PartialCell} drag The cell that is currently being dragged.
 * @param {Cell} hover The cell that is being hovered by the dragged cell.
 * @return {Action}
 */
export declare const cellHoverInlineRight: (drag: PartialCell, hover: HoverTarget) => CellHoverAction;
export interface DragCellAction extends Action {
    ts: Date;
    id: string;
}
/**
 * Creates a redux action for when a cell is being dragged.
 *
 * @example
 * // const store = redux.createStore()
 * // const cell = { id: '1', ... }
 * store.dispatch(dragCell(cell.id))
 *
 * @param {string} id The id of the cell that is being dragged.
 * @return {Action}
 */
export declare const dragCell: (id: string) => DragCellAction;
export interface ClearHoverAction extends Action {
    ts: Date;
    type: typeof CLEAR_CLEAR_HOVER;
}
/**
 * Creates a redux action to clear hover state of all cells.
 *
 * @return {Action}
 */
export declare const clearHover: () => ClearHoverAction;
export interface CancelCellDragAction extends Action {
    ts: Date;
}
/**
 * Creates a redux action for when cell dragging ends.
 *
 * @example
 * // const store = redux.createStore()
 * // const cell = { id: '1', ... }
 * store.dispatch(cancelCellDrag(cell.id))
 *
 * @param {string} id
 * @return {Action}
 */
export declare const cancelCellDrag: () => CancelCellDragAction;
export declare const dragActions: {
    cancelCellDrag: () => CancelCellDragAction;
    clearHover: () => ClearHoverAction;
    dragCell: (id: string) => DragCellAction;
    cellHoverInlineRight: (drag: PartialCell, hover: HoverTarget) => CellHoverAction;
    cellHoverInlineLeft: (drag: PartialCell, hover: HoverTarget) => CellHoverAction;
    cellHoverBelow: (drag: PartialCell, hover: HoverTarget, level?: number) => CellHoverAction;
    cellHoverAbove: (drag: PartialCell, hover: HoverTarget, level?: number) => CellHoverAction;
    cellHoverRightOf: (drag: PartialCell, hover: HoverTarget, level?: number) => CellHoverAction;
    cellHoverLeftOf: (drag: PartialCell, hover: HoverTarget, level?: number) => CellHoverAction;
    cellHover: (drag: PartialCell, hover: HoverTarget, level: number | undefined, position: PositionEnum) => CellHoverAction;
};
//# sourceMappingURL=drag.d.ts.map