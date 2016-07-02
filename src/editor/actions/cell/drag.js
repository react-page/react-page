import { positions } from 'src/editor/const'

export const CELL_DRAG_HOVER = 'CELL_DRAG_HOVER'
export const CELL_DRAG = 'CELL_DRAG'
export const CELL_DRAG_CANCEL = 'CELL_DRAG_CANCEL'

/**
 * Dispatch when a cell hovers another item.
 *
 * @param {{id: string}} drag
 * @param {{id: string}} hover
 * @param {string} position
 * @param {number} level
 */
export const cellHover = ({ id: drag } = {}, { id: hover } = {}, level = 0, position) => ({
  type: CELL_DRAG_HOVER,
  drag,
  hover,
  level,
  position
})

export const cellHoverLeftOf = (drag, hover, level) => cellHover(drag, hover, level, positions.LEFT_OF)
export const cellHoverRightOf = (drag, hover, level) => cellHover(drag, hover, level, positions.RIGHT_OF)
export const cellHoverAbove = (drag, hover, level) => cellHover(drag, hover, level, positions.ABOVE)
export const cellHoverBelow = (drag, hover, level) => cellHover(drag, hover, level, positions.BELOW)
export const cellHoverInlineLeft = (drag, hover, level) => cellHover(drag, hover, level, positions.INLINE_LEFT)
export const cellHoverInlineRight = (drag, hover, level) => cellHover(drag, hover, level, positions.INLINE_RIGHT)

/**
 * Dispatch when a cell is being dragged.
 *
 * @param {{id}} id
 */
export const dragCell = ({ id } = {}) => ({
  type: CELL_DRAG,
  id
})

/**
 * Dispatch when cell dragging ends.
 *
 * @param {{id}} id
 */
export const cancelCellDrag = ({ id } = {}) => ({
  type: CELL_DRAG_CANCEL,
  id
})
