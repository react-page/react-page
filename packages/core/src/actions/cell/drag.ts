/**
 * @module src/editor/actions/cell/drag
 */

import { PositionEnum } from '../../const';
import { Action } from 'redux';
import { Cell } from '../../types/editable';

export const CELL_DRAG_HOVER = 'CELL_DRAG_HOVER';
export const CELL_DRAG_HOVER_NEW = 'CELL_DRAG_HOVER_NEW';
export const CELL_DRAG = 'CELL_DRAG';
export const CELL_DRAG_CANCEL = 'CELL_DRAG_CANCEL';
export const CLEAR_HOVER = 'CLEAR_HOVER';
export const CLEAR_HOVER_NEW = 'CLEAR_HOVER_NEW';
export const CLEAR_HOVER_ALL_NEW = 'CLEAR_HOVER_ALL_NEW';

export interface CellHoverActionNew extends Action {
  ts: Date;
  nodeId: string;
  position: PositionEnum;
  type: typeof CELL_DRAG_HOVER_NEW;
  depth: number;
}

export interface ClearHoverActionNew extends Action {
  ts: Date;
  nodeId: string;
  type: typeof CLEAR_HOVER_NEW;
}

export interface ClearHoverAllActionNew extends Action {
  ts: Date;
  type: typeof CLEAR_HOVER_ALL_NEW;
}
export interface CellHoverAction extends Action {
  ts: Date;
  dragId: string;
  hoverId: string;
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
 * @param {Cell} drag The cell that is currently being dragged.
 * @param {Cell} hover The cell that is being hovered by the dragged cell.
 * @param {number} level Set the level if the dragged cells should hover over an ancestor of hover.
 * @param {string} position Can be left, right, above, below.
 * @return {Action}
 */
export const cellHover = (
  drag: Cell,
  hover: Cell,
  level = 0,
  position: PositionEnum
): CellHoverAction => {
  console.log(level);
  return {
    type: CELL_DRAG_HOVER,
    ts: new Date(),
    dragId: drag.id,
    hoverId: hover.id,
    level,
    position,
  };
};

export const cellHoverNew = (
  nodeId: string,
  position: PositionEnum,
  depth: number
): CellHoverActionNew => {
  return {
    type: CELL_DRAG_HOVER_NEW,
    ts: new Date(),
    nodeId,
    position,
    depth,
  };
};

export const clearHoverNew = (nodeId: string): ClearHoverActionNew => {
  return {
    type: CLEAR_HOVER_NEW,
    nodeId,
    ts: new Date(),
  };
};

export const clearHoverAllNew = (): ClearHoverAllActionNew => {
  return {
    type: CLEAR_HOVER_ALL_NEW,

    ts: new Date(),
  };
};

/**
 * Creates a redux action for when a cell is hovering another cell on the left.
 *
 * @example
 * // const store = redux.createStore()
 * store.dispatch(cellHoverLeftOf(drag, hover, level))
 *
 * @param {Cell} drag The cell that is currently being dragged.
 * @param {Cell} hover The cell that is being hovered by the dragged cell.
 * @param {number} level Set the level if the dragged cells should hover over an ancestor of hover.
 * @return {Action}
 */
export const cellHoverLeftOf = (drag: Cell, hover: Cell, level: number) =>
  cellHover(drag, hover, level, PositionEnum.LEFT_OF);

/**
 * Creates a redux action for when a cell is hovering another cell on the right.
 *
 * @example
 * // const store = redux.createStore()
 * store.dispatch(cellHoverRightOf(drag, hover, level))
 *
 * @param {Cell} drag The cell that is currently being dragged.
 * @param {Cell} hover The cell that is being hovered by the dragged cell.
 * @param {number} level Set the level if the dragged cells should hover over an ancestor of hover.
 * @return {Action}
 */
export const cellHoverRightOf = (drag: Cell, hover: Cell, level: number) =>
  cellHover(drag, hover, level, PositionEnum.RIGHT_OF);

/**
 * Creates a redux action for when a cell is hovering another cell above.
 *
 * @example
 * // const store = redux.createStore()
 * store.dispatch(cellHoverAbove(drag, hover, level))
 *
 * @param {Cell} drag The cell that is currently being dragged.
 * @param {Cell} hover The cell that is being hovered by the dragged cell.
 * @param {number} level Set the level if the dragged cells should hover over an ancestor of hover.
 * @return {Action}
 */
export const cellHoverAbove = (drag: Cell, hover: Cell, level: number) =>
  cellHover(drag, hover, level, PositionEnum.ABOVE);

/**
 * Creates a redux action for when a cell is hovering another cell below.
 *
 * @example
 * // const store = redux.createStore()
 * store.dispatch(cellHoverBelow(drag, hover, level))
 *
 * @param {Cell} drag The cell that is currently being dragged.
 * @param {Cell} hover The cell that is being hovered by the dragged cell.
 * @param {number} level Set the level if the dragged cells should hover over an ancestor of hover.
 * @return {Action}
 */
export const cellHoverBelow = (drag: Cell, hover: Cell, level: number) =>
  cellHover(drag, hover, level, PositionEnum.BELOW);

/**
 * Creates a redux action for when a cell is hovering another cell on the left, but inline (css floating).
 *
 * @example
 * // const store = redux.createStore()
 * store.dispatch(cellHoverInlineLeft(drag, hover))
 *
 * @param {Cell} drag The cell that is currently being dragged.
 * @param {Cell} hover The cell that is being hovered by the dragged cell.
 * @return {Action}
 */
export const cellHoverInlineLeft = (drag: Cell, hover: Cell) =>
  cellHover(drag, hover, 0, PositionEnum.INLINE_LEFT);

/**
 * Creates a redux action for when a cell is hovering another cell on the right, but inline (css floating).
 *
 * @example
 * // const store = redux.createStore()
 * store.dispatch(cellHoverInlineRight(drag, hover))
 *
 * @param {Cell} drag The cell that is currently being dragged.
 * @param {Cell} hover The cell that is being hovered by the dragged cell.
 * @return {Action}
 */
export const cellHoverInlineRight = (drag: Cell, hover: Cell) =>
  cellHover(drag, hover, 0, PositionEnum.INLINE_RIGHT);

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
export const dragCell = (id: string): DragCellAction => ({
  type: CELL_DRAG,
  ts: new Date(),
  id,
});

export interface ClearHoverAction extends Action {
  ts: Date;
  type: typeof CLEAR_HOVER;
}
/**
 * Creates a redux action to clear hover state of all cells.
 *
 * @return {Action}
 */
export const clearHover = (): ClearHoverAction => ({
  type: CLEAR_HOVER,
  ts: new Date(),
});

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
export const cancelCellDrag = (): CancelCellDragAction => ({
  type: CELL_DRAG_CANCEL,
  ts: new Date(),
});

export const dragActions = {
  cancelCellDrag,
  clearHover,
  dragCell,
  cellHoverInlineRight,
  cellHoverInlineLeft,
  cellHoverBelow,
  cellHoverAbove,
  cellHoverRightOf,
  cellHoverLeftOf,
  cellHover,
};
