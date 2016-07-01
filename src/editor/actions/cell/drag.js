export const CELL_DRAG_HOVER = 'CELL_DRAG_HOVER'
export const CELL_DRAG = 'CELL_DRAG'
export const CELL_DRAG_CANCEL = 'CELL_DRAG_CANCEL'

/**
 * Dispatch when a cell hovers another item.
 *
 * @param {{id}} drag
 * @param {{id}} hover
 * @param {number} level
 */
export const cellHover = ({ id: drag } = {}, { id: hover } = {}, level = 0) => ({
  type: CELL_DRAG_HOVER,
  drag,
  hover,
  level
})

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
