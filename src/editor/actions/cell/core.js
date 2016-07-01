export const CELL_UPDATE = 'CELL_UPDATE'
export const CELL_REMOVE = 'CELL_REMOVE'

/**
 * Update a cell
 *
 * @param {{id}} id
 * @param {object} data
 */
export const updateCell = ({ id } = {}, data = {}) => ({
  type: CELL_UPDATE,
  id,
  data
})

/**
 * Remove a cell
 *
 * @param {{id}} id
 */
export const removeCell = ({ id } = {}) => ({
  type: CELL_REMOVE,
  id
})
