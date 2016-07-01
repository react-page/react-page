export const CELL_DRAG_HOVER = 'CELL_DRAG_HOVER'
export const CELL_DRAG = 'CELL_DRAG'
export const CELL_DRAG_CANCEL = 'CELL_DRAG_CANCEL'

/**
 * Dispatch when a cell hovers another item
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
 * Set a cell's dragging state
 *
 * @param {{id}} id
 */
export const dragCell = ({ id } = {}) => ({
  type: CELL_DRAG,
  id
})

/**
 * Cancel the dragging state of a cell
 *
 * @param {{id}} id
 */
export const cancelCellDrag = ({ id } = {}) => ({
  type: CELL_DRAG_CANCEL,
  id
})
