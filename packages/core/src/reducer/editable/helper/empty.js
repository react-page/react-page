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

export const isEmpty = ({
  cells,
  rows,
  layout: { plugin: { name: layout } = {} } = {},
  content: { plugin: { name: content } = {} } = {}
}: {
  cells: Array<Cell>,
  rows: Array<Row>,
  layout: Object,
  content: Object
}): boolean =>
  !(cells || []).filter(emptyFilter).length &&
  !(rows || []).filter(emptyFilter).length &&
  !content &&
  !(layout && (rows || []).filter(emptyFilter).length)

export const emptyFilter = (state: any): boolean => !isEmpty(state)
