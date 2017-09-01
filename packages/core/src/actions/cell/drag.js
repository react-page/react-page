// @flow
/**
 * @module src/editor/actions/cell/drag
 */

import type { Action } from '../../types/redux'
import type { Cell } from '../../types/editable'
import { positions } from '../../const'

export const CELL_DRAG_HOVER = 'CELL_DRAG_HOVER'
export const CELL_DRAG = 'CELL_DRAG'
export const CELL_DRAG_CANCEL = 'CELL_DRAG_CANCEL'
export const CLEAR_CLEAR_HOVER = 'CLEAR_CLEAR_HOVER'

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
  { id: drag }: Cell,
  { id: hover }: Cell,
  level: number = 0,
  position: string
): Action => ({
  type: CELL_DRAG_HOVER,
  ts: new Date(),
  drag,
  hover,
  level,
  position
})

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
  cellHover(drag, hover, level, positions.LEFT_OF)

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
  cellHover(drag, hover, level, positions.RIGHT_OF)

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
  cellHover(drag, hover, level, positions.ABOVE)

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
  cellHover(drag, hover, level, positions.BELOW)

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
  cellHover(drag, hover, 0, positions.INLINE_LEFT)

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
  cellHover(drag, hover, 0, positions.INLINE_RIGHT)

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
export const dragCell = (id: string): Action => ({
  type: CELL_DRAG,
  ts: new Date(),
  id
})

/**
 * Creates a redux action to clear hover state of all cells.
 *
 * @return {Action}
 */
export const clearHover = (): Action => ({
  type: CLEAR_CLEAR_HOVER,
  ts: new Date()
})

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
export const cancelCellDrag = (): Action => ({
  type: CELL_DRAG_CANCEL,
  ts: new Date()
})
