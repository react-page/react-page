// @flow
import type { Cell } from '../../../types/editable'

const MAX_CELLS_PER_ROW = 12

/**
 * Sum up cell sizes: Σ(cell[size]).
 */
export const sumSizes = (cells: Array<Cell> = []): number =>
  cells.reduce(
    ({ size: p = 99, inline: a }: any, { size: c = 99, inline: b }: any) => ({
      size: (a ? 0 : 1) * p + (b ? 0 : 1) * c
    }),
    { size: 0 }
  ).size

/**
 * Updates each cell's size boundaries.
 */
export const computeBounds = (cells: Array<Cell> = []): Array<Cell> =>
  cells.map((c: Cell, k: number): Cell => ({
    ...c,
    bounds: {
      left: k > 0 ? cells[k - 1].size + c.size - 1 : 0,
      right: k === cells.length - 1 ? 0 : c.size - 1 + cells[k + 1].size
    }
  }))

/**
 * Computes if a cell is resizable.
 */
export const computeResizeable = (cells: Array<Cell> = []): Array<Cell> =>
  cells.map((c: Cell, k: number): Cell => ({
    ...c,
    resizable: cells.length > 1 && k !== cells.length - 1
  }))

/**
 * Computes sizes an inline element was found.
 */
export const computeInlines = (cells: Array<Cell> = []): Array<Cell> => {
  if (cells.length !== 2 || !cells[0].inline) {
    return cells.map((c: Cell) => ({
      ...c,
      inline: null,
      hasInlineNeighbour: null
    }))
  }

  const inline = cells[0].inline
  return [
    {
      ...cells[0],
      resizable: true,
      size: cells[0].size || Math.round(MAX_CELLS_PER_ROW / 2),
      bounds: {
        left: inline === 'left' ? 0 : MAX_CELLS_PER_ROW - 1,
        right: inline === 'right' ? 0 : MAX_CELLS_PER_ROW - 1
      }
    },
    {
      ...cells[1],
      bounds: { left: 0, right: 0 },
      size: 12,
      hasInlineNeighbour: cells[0].id
    }
  ]
}

/**
 * Resize cells.
 */
export const resizeCells = (
  cells: Array<Cell> = [],
  { id, size }: Cell
): Array<Cell> => {
  let prev = 0
  return cells.map((c: Cell) => {
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
 * @return {[...cell]}
 */
export const computeSizes = (cells: Array<Cell> = []): Array<Cell> => {
  const total = sumSizes(cells)
  if (total === MAX_CELLS_PER_ROW) {
    return cells
  }

  const count = cells.length
  const sizePerCell = Math.floor(MAX_CELLS_PER_ROW / count)
  const spaceLeft = MAX_CELLS_PER_ROW - sizePerCell * (count - 1)
  return cells.map((c: Cell, k: number) => ({
    ...c,
    size: k === count - 1 ? spaceLeft : sizePerCell
  }))
}
