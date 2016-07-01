export const CELL_INSERT_ABOVE = 'CELL_INSERT_ABOVE'
export const CELL_INSERT_BELOW = 'CELL_INSERT_BELOW'
export const CELL_INSERT_LEFT_OF = 'CELL_INSERT_LEFT_OF'
export const CELL_INSERT_RIGHT_OF = 'CELL_INSERT_RIGHT_OF'
export const CELL_INSERT_INLINE_LEFT = 'CELL_INSERT_INLINE_LEFT'
export const CELL_INSERT_INLINE_RIGHT = 'CELL_INSERT_INLINE_RIGHT'

const hover = (type) => ({ id: drag } = {}, { id: hover } = {}, level = 0) => ({
  type,
  drag,
  hover,
  level
})

/**
 * Insert a cell below the active element
 *
 * @param {{id}} drag
 * @param {{id}} hover
 * @param {number} level
 * @return {Object}
 */
export const insertCellBelow = hover(CELL_INSERT_BELOW)

/**
 * Insert a cell above the active element
 *
 * @param {{id}} drag
 * @param {{id}} hover
 * @param {number} level
 * @return {Object}
 */
export const insertCellAbove = hover(CELL_INSERT_ABOVE)

/**
 * Insert a cell right of the active element
 *
 * @param {{id}} drag
 * @param {{id}} hover
 * @param {number} level
 * @return {Object}
 */
export const insertCellRightOf = hover(CELL_INSERT_RIGHT_OF)

/**
 * Insert a cell left of the active element
 *
 * @param {{id}} drag
 * @param {{id}} hover
 * @param {number} level
 * @return {Object}
 */
export const insertCellLeftOf = hover(CELL_INSERT_LEFT_OF)

/**
 * Insert a cell left inside the active element
 *
 * @param {{id}} drag
 * @param {{id}} hover
 * @param {number} level
 * @return {Object}
 */
export const insertCellLeftInline = hover(CELL_INSERT_INLINE_LEFT)

/**
 * Insert a cell right inside the active element
 *
 * @param {{id}} drag
 * @param {{id}} hover
 * @param {number} level
 * @return {Object}
 */
export const insertCellRightInline = hover(CELL_INSERT_INLINE_RIGHT)
