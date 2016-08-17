import uuid from 'node-uuid'

export const CELL_INSERT_ABOVE = 'CELL_INSERT_ABOVE'
export const CELL_INSERT_BELOW = 'CELL_INSERT_BELOW'
export const CELL_INSERT_LEFT_OF = 'CELL_INSERT_LEFT_OF'
export const CELL_INSERT_RIGHT_OF = 'CELL_INSERT_RIGHT_OF'
export const CELL_INSERT_INLINE_LEFT = 'CELL_INSERT_INLINE_LEFT'
export const CELL_INSERT_INLINE_RIGHT = 'CELL_INSERT_INLINE_RIGHT'

const gen = (c = 1) => {
  const ret = []
  for (let i = 0; i <= c; i++) {
    ret.push(uuid.v4())
  }
  return ret
}

const insert = (type) => (item, { id: hover, inline, hasInlineNeighbour } = {}, level = 0, ids = false) => {
  let l = level
  switch (type) {
    case CELL_INSERT_ABOVE:
    case CELL_INSERT_BELOW: {
      if ((inline || hasInlineNeighbour) && level < 1) {
        l = 1
      }
      break
    }

    case CELL_INSERT_LEFT_OF:
    case CELL_INSERT_RIGHT_OF: {
      if ((inline || hasInlineNeighbour) && level < 2) {
        l = 2
      }
      break
    }
    default:
  }

  return ({
    type,
    ts: new Date(),
    item,
    hover,
    level: l,
    ids: ids || gen(5)
  })
}

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
