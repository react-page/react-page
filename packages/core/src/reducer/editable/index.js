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
import { CELL_CREATE_FALLBACK } from '../../actions/cell'
import { cellOrder } from './helper/order'
import { decorate } from './helper/tree'
import { cells } from './tree.js'
import { createCell } from '../../types/editable'

export const rawEditableReducer = (
  state: Object = {
    id: null,
    cells: [],
    config: {
      whitelist: []
    }
  },
  action: Object
) => {
  let newCells = decorate(cells(state.cells, action))

  // eslint-disable-next-line default-case
  switch (action.type) {
    case CELL_CREATE_FALLBACK:
      if (action.editable === state.id) {
        const c = {
          ...createCell(),
          content: {
            plugin: action.fallback,
            state: action.fallback.createInitialState()
          },
          id: action.ids[0]
        }
        newCells = decorate(cells([c], action))
      }
      break
  }

  return {
    ...state,
    cells: newCells,
    cellOrder: cellOrder(newCells || [])
  }
}

export const editable = rawEditableReducer
