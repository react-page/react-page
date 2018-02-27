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
/* eslint no-use-before-define: "off" */
import type { Cell, Row } from '../../../types/editable'

type Levels = { left: number, right: number, above: number, below: number }

const computeRowLevels = (a: Row, b: ?Levels): Row => {
  const { cells = [], ...props } = a || {}
  const { left = 0, right = 0, above = 0, below = 0 } = b || {}

  if (cells.length) {
    props.cells = cells.map((c: Cell, k: number) =>
      computeCellLevels(c, {
        left: k === 0 ? left + 1 : 0,
        right: k === cells.length - 1 ? right + 1 : 0,
        above: above + 1,
        below: below + 1
      })
    )
  }

  delete props.levels // eslint-disable-line prefer-reflect
  return { levels: { left, right, above, below }, ...props }
}

const computeCellLevels = (a: Cell, b: ?Levels): Cell => {
  const { rows = [], ...props } = a || {}
  const { left = 0, right = 0, above = 0, below = 0 } = b || {}

  if (rows.length) {
    props.rows = rows.map((r: Row, k: number) =>
      computeRowLevels(r, {
        left: left + 1,
        right: right + 1,
        above: k === 0 ? above + 1 : 0,
        below: k === rows.length - 1 ? below + 1 : 0
      })
    )
  }

  delete props.levels // eslint-disable-line prefer-reflect
  return { levels: { left, right, above, below }, ...props }
}

export const computeDropLevels = (c: Cell): Cell => computeCellLevels(c)
