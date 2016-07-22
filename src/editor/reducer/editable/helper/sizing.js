const MAX_CELLS_PER_ROW = 12

/**
 * Sum up cell sizes: Σ(cell[size]).
 *
 * @param {[...cell]} cells
 * @return {number} total size.
 */
export const sumSizes = (cells = []) => cells.reduce(({ size: p = 99, inline: a = false } = {}, { size: c = 99, inline: b = false }) => ({ size: (!Boolean(a) * p) + (!Boolean(b) * c) }), { size: 0 }).size

/**
 * Updates each cell's size boundaries.
 *
 * @param {[...cell]} cells
 * @@return {[...cell]}
 */
export const computeBounds = (cells = []) => cells.map((c, k) => ({
  ...c,
  bounds: {
    left: k > 0 ? cells[k - 1].size + c.size - 1 : 0,
    right: k === cells.length - 1 ? 0 : c.size - 1 + cells[k + 1].size
  }
}))

/**
 * Computes if a cell is resizable
 *
 * @param {[...cell]} cells
 * @@return {[...cell]}
 */
export const computeResizeable = (cells = []) => cells.map((c, k) => ({
  ...c,
  resizable: cells.length > 1 && k !== cells.length - 1
}))

/**
 * Computes sizes an inline element was found
 *
 * @param {[...cell]} cells
 * @@return {[...cell]}
 */
export const computeInlines = (cells = []) => {
  if (cells.length !== 2 || !cells[0].inline) {
    return cells.map((c) => ({ ...c, inline: null, hasInlineNeighbour: null }))
  }

  const inline = cells[0].inline
  return [{
    ...cells[0],
    resizable: true,
    size: cells[0].size || Math.round(MAX_CELLS_PER_ROW / 2),
    bounds: {
      left: inline === 'left' ? 0 : MAX_CELLS_PER_ROW - 1,
      right: inline === 'right' ? 0 : MAX_CELLS_PER_ROW - 1
    }
  }, {
    ...cells[1], bounds: { left: 0, right: 0 }, size: 12, hasInlineNeighbour: cells[0].id
  }]
}

/**
 * Resize cells.
 *
 * @param {[]} cells
 * @param {Object} action
 * @param {numeric} action.id
 * @param {numeric} action.size
 * @returns {Array}
 */
export const resizeCells = (cells = [], { id, size }) => {
  let prev = 0
  return cells.map((c) => {
    if (prev > 0) {
      const ret = { ...c, size: c.size + prev - size }
      prev = 0
      return ret
    } else if (id === c.id) {
      if (!c.inline) {
        prev = c.size
      }
      return { ...c, size }
    }
    return c
  })
}

/**
 * Balance cell sizes.
 *
 * @param {[...cell]} cells
 * @@return {[...cell]}
 */
export const computeSizes = (cells = []) => {
  const total = sumSizes(cells)
  if (total === MAX_CELLS_PER_ROW) {
    return cells
  }

  const count = cells.length
  const sizePerCell = Math.floor(MAX_CELLS_PER_ROW / count)
  const spaceLeft = MAX_CELLS_PER_ROW - (sizePerCell * (count - 1))
  return cells.map((c, k) => ({
    ...c,
    size: k === count - 1 ? spaceLeft : sizePerCell
  }))
}
