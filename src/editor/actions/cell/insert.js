import uuid from 'node-uuid'

export const CELL_INSERT_ABOVE = 'CELL_INSERT_ABOVE'
export const CELL_INSERT_BELOW = 'CELL_INSERT_BELOW'
export const CELL_INSERT_LEFT_OF = 'CELL_INSERT_LEFT_OF'
export const CELL_INSERT_RIGHT_OF = 'CELL_INSERT_RIGHT_OF'
export const CELL_INSERT_INLINE_LEFT = 'CELL_INSERT_INLINE_LEFT'
export const CELL_INSERT_INLINE_RIGHT = 'CELL_INSERT_INLINE_RIGHT'

const gen = (c = 1) => (new Array(c)).map(() => uuid.v4())

const insert = (type) => (item, { id: hover } = {}, level = 0, ids = []) => ({
  type,
  item,
  hover,
  level,
  ids: ids || gen(5)
})

/**
 * Insert a cell below the active element
 *
 * @param {{id}} drag
 * @param {{id}} hover
 * @param {number} level
 * @return {Object}
 */
export const insertCellBelow = insert(CELL_INSERT_BELOW)

/**
 * Insert a cell above the active element
 *
 * @param {{id}} drag
 * @param {{id}} hover
 * @param {number} level
 * @return {Object}
 */
export const insertCellAbove = insert(CELL_INSERT_ABOVE)

/**
 * Insert a cell right of the active element
 *
 * @param {{id}} drag
 * @param {{id}} hover
 * @param {number} level
 * @return {Object}
 */
export const insertCellRightOf = insert(CELL_INSERT_RIGHT_OF)

/**
 * Insert a cell left of the active element
 *
 * @param {{id}} drag
 * @param {{id}} hover
 * @param {number} level
 * @return {Object}
 */
export const insertCellLeftOf = insert(CELL_INSERT_LEFT_OF)

/**
 * Insert a cell left inside the active element
 *
 * @param {{id}} drag
 * @param {{id}} hover
 * @param {number} level
 * @return {Object}
 */
export const insertCellLeftInline = insert(CELL_INSERT_INLINE_LEFT)

/**
 * Insert a cell right inside the active element
 *
 * @param {{id}} drag
 * @param {{id}} hover
 * @param {number} level
 * @return {Object}
 */
export const insertCellRightInline = insert(CELL_INSERT_INLINE_RIGHT)
