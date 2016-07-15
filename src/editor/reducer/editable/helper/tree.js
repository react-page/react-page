import {
  computeSizes,
  computeInlines,
  computeBounds,
  computeResizeable
} from './sizing'
import { optimizeCell, optimizeRow, optimizeRows, optimizeCells } from './optimize'
import { computeDropLevels } from './level'

export const decorate = (cells = []) => computeInlines(computeResizeable(computeBounds(computeSizes(optimizeCells(cells))))).map((cell) => {
  if (cell.rows) {
    cell.rows = optimizeRows(cell.rows).map((r) => {
      const optimized = optimizeRow(r)
      if (optimized.cells) {
        optimized.cells = decorate(optimized.cells)
      }
      return optimized
    })
  }

  return computeDropLevels(optimizeCell(cell))
})
