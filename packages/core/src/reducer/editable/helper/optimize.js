/*
 * This file is part of ORY Editor.
 *
 * ORY Editor is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Lesser General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * ORY Editor is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public License
 * along with ORY Editor.  If not, see <http://www.gnu.org/licenses/>.
 *
 * @license LGPL-3.0
 * @copyright 2016-2018 Aeneas Rekkas
 * @author Aeneas Rekkas <aeneas+oss@aeneas.io>
 *
 */

// @flow
import { emptyFilter } from './empty'
import type { Row, Cell } from '../../../types/editable'

export const flatten = function<T>(c: Array<T>, n: Array<T>): Array<T> {
  return [...c, ...n]
}

export const optimizeCells = (cells: Array<Cell> = []): Array<Cell> =>
  cells.filter(emptyFilter)

export const optimizeRows = (rows: Array<Row> = []): Array<Row> =>
  rows.filter(emptyFilter)

export const optimizeCell = ({ rows, ...other }: Cell): Cell => ({
  ...other,
  rows: (rows || [])
    .map(
      (r: Row): Array<Row> => {
        const { cells = [] } = r
        if (cells.length !== 1) {
          return [r]
        }

        const { rows: cellRows = [], layout }: Cell = cells[0]
        if (cellRows.length > 0 && !layout) {
          return cellRows
        }
        return [r]
      }
    )
    .reduce(flatten, [])
})

export const optimizeRow = ({ cells, ...other }: Row): Row => ({
  ...other,
  cells: (cells || [])
    .map((c: Cell) => {
      const { rows = [] } = c
      if (rows.length !== 1 || c.layout) {
        return [c]
      }

      const { cells: rowCells = [] }: Row = rows[0]
      if (rowCells.length === 1) {
        return rowCells
      }

      return [c]
    })
    .reduce(flatten, [])
})
