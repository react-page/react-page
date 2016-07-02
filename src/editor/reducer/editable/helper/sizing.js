const MAX_CELLS_PER_ROW = 12

/**
 * Sum up cell sizes: Σ(cell[size]).
 *
 * @param {[...cell]} cells
 * @return {number} total size.
 */
export const sumSizes = (cells = []) => cells.reduce(({ size: p = 99 } = {}, { size: c = 99 }) => ({ size: p + c }), { size: 0 }).size

/**
 * Compute responsive classes for each cell
 *
 * @param {Array} cells
 * @return {Array}
 */
export const computeResponsive = (cells = []) => cells.map((c) => ({ ...c, responsive: [12, 12] }))

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
      return { ...c, size: c.size + prev - size }
    } else if (id === c.id) {
      prev = c.size
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
