const MAX_CELLS_PER_ROW = 12

/**
 * Sum up cell sizes: Σ(cell[size]).
 *
 * @param {[...cell]} cells
 * @return {number} total size.
 */
export const sumSizes = (cells = []) => cells.reduce(({ size: p = 99 } = {}, { size: c = 99 }) => ({ size: p + c }), { size: 0 }).size

/**
 * Updates each cell's size boundaries.
 *
 * @param {[...cell]} cells
 * @@return {[...cell]}
 */
export const setMaxSizes = (cells = []) => cells.map((c, k) => ({
  ...c,
  bounds: {
    left: k > 0 ? cells[k - 1].size + c.size - 1 : 0,
    right: k === cells.length - 1 ? 0 : c.size - 1 + cells[k + 1].size
  }
}))

export const computeCellSizes = (cells = []) => {
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
