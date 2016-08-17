import { positions } from 'src/editor/const'

export const CELL_DRAG_HOVER = 'CELL_DRAG_HOVER'
export const CELL_DRAG = 'CELL_DRAG'
export const CELL_DRAG_CANCEL = 'CELL_DRAG_CANCEL'
export const CLEAR_CLEAR_HOVER = 'CLEAR_CLEAR_HOVER'

/**
 * Dispatch when a cell hovers another item.
 *
 * @param {{id: string}} drag
 * @param {{id: string}} hover
 * @param {string} position
 * @param {number} level
 * @return {Object} action
 */
export const cellHover = ({ id: drag } = {}, { id: hover } = {}, level = 0, position) => ({
  type: CELL_DRAG_HOVER,
  ts: new Date(),
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
 * @return {Object} action
 */
export const dragCell = ({ id } = {}) => ({
  type: CELL_DRAG,
  ts: new Date(),
  id
})

/**
 * Dispatch to clear hover state
 *
 * @return {Object} action
 */
export const clearHover = () => ({
  type: CLEAR_CLEAR_HOVER,
  ts: new Date(),
})

/**
 * Dispatch when cell dragging ends.
 *
 * @param {{id}} id
 * @return {Object} action
 */
export const cancelCellDrag = ({ id } = {}) => ({
  type: CELL_DRAG_CANCEL,
  ts: new Date(),
  id
})
