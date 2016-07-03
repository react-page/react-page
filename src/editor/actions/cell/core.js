export const CELL_UPDATE = 'CELL_UPDATE'
export const CELL_REMOVE = 'CELL_REMOVE'
export const CELL_RESIZE = 'CELL_RESIZE'

/**
 * Dispatch to update cell data.
 *
 * @param {{id: string}} id
 * @param {object} props
 * @return {object}
 */
export const updateCell = ({ id } = {}, props = {}) => ({
  type: CELL_UPDATE,
  ts: new Date(),
  id,
  props
})

/**
 * Dispatch to remove a cell.
 *
 * @param {{id: string}} id
 * @return {object}
 */
export const removeCell = ({ id } = {}) => ({
  type: CELL_REMOVE,
  ts: new Date(),
  id
})

/**
 * Dispatch to resize a cell.
 *
 * @param {{id: string}} id
 * @param {int} size
 * @return {object}
 */
export const resizeCell = ({ id } = {}, size = 1) => ({
  type: CELL_RESIZE,
  ts: new Date(),
  id,
  size
})
