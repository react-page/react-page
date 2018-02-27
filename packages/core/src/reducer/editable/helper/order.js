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
const computeOrder = ({
  rows,
  cells,
  content: { plugin: { name = '' } = {} } = {},
  id
}: {
  rows: Array<any>,
  cells: Array<any>,
  id: string,
  content: { plugin: { name: string } }
}) =>
  [
    [
      {
        id,
        isLeaf: Boolean(name)
      }
    ],
    ...(rows || []).map(computeOrder),
    ...(cells || []).map(computeOrder)
  ].reduce((p: Array<any>, n: Array<any>) => [...p, ...n], [])

export const cellOrder = (os: Array<any>) =>
  os
    .map(computeOrder)
    .reduce((p: Array<any>, n: Array<any>) => [...p, ...n], [])
