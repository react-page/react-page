// @flow
import {
  computeSizes,
  computeInlines,
  computeBounds,
  computeResizeable
} from './sizing'
import {
  optimizeCell,
  optimizeRow,
  optimizeRows,
  optimizeCells
} from './optimize'
import { computeDropLevels } from './level'
import type { Cell, Row } from '../../../types/editable'

export const decorate = (cells: Array<Cell> = []): Array<Cell> =>
  computeInlines(
    computeResizeable(computeBounds(computeSizes(optimizeCells(cells))))
  ).map((cell: Cell): Cell => {
    if (cell.rows) {
      cell.rows = optimizeRows(cell.rows).map((r: Row): Row => {
        const optimized = optimizeRow(r)
        if (optimized.cells) {
          optimized.cells = decorate(optimized.cells)
        }
        return optimized
      })
    }

    return computeDropLevels(optimizeCell(cell))
  })
