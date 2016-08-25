// @flow
import type { Action } from 'types/redux'
import type { Cell } from 'types/editable'
import { positions } from 'src/editor/const'

export const CELL_DRAG_HOVER = 'CELL_DRAG_HOVER'
export const CELL_DRAG = 'CELL_DRAG'
export const CELL_DRAG_CANCEL = 'CELL_DRAG_CANCEL'
export const CLEAR_CLEAR_HOVER = 'CLEAR_CLEAR_HOVER'

/**
 * Dispatch when a cell hovers another item.
 */
export const cellHover = ({ id: drag }: Cell, { id: hover }: Cell, level : number = 0, position: string): Action => ({
  type: CELL_DRAG_HOVER,
  ts: new Date(),
  drag,
  hover,
  level,
  position
})

/**
 * Dispatch when a cell is hovering another cell on the left.
 */
export const cellHoverLeftOf = (drag: Cell, hover: Cell, level: number) => cellHover(drag, hover, level, positions.LEFT_OF)

/**
 * Dispatch when a cell is hovering another cell on the right.
 */
export const cellHoverRightOf = (drag: Cell, hover: Cell, level: number) => cellHover(drag, hover, level, positions.RIGHT_OF)

/**
 * Dispatch when a cell is hovering another cell above.
 */
export const cellHoverAbove = (drag: Cell, hover: Cell, level: number) => cellHover(drag, hover, level, positions.ABOVE)

/**
 * Dispatch when a cell is hovering another cell below.
 */
export const cellHoverBelow = (drag: Cell, hover: Cell, level: number) => cellHover(drag, hover, level, positions.BELOW)

/**
 * Dispatch when a cell is hovering another cell on the left, but inline ("floating").
 */
export const cellHoverInlineLeft = (drag: Cell, hover: Cell) => cellHover(drag, hover, 0, positions.INLINE_LEFT)

/**
 * Dispatch when a cell is hovering another cell on the right, but inline ("floating").
 */
export const cellHoverInlineRight = (drag: Cell, hover: Cell) => cellHover(drag, hover, 0, positions.INLINE_RIGHT)

/**
 * Dispatch when a cell is being dragged.
 */
export const dragCell = (id: string): Action => ({
  type: CELL_DRAG,
  ts: new Date(),
  id
})

/**
 * Dispatch to clear hover state of a cell.
 */
export const clearHover = (): Action => ({
  type: CLEAR_CLEAR_HOVER,
  ts: new Date(),
})

/**
 * Dispatch when cell dragging ends.
 */
export const cancelCellDrag = (id: string): Action => ({
  type: CELL_DRAG_CANCEL,
  ts: new Date(),
  id
})
