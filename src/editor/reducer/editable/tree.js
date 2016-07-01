/* eslint-disable no-use-before-define */
import {
  CELL_REMOVE,
  CELL_UPDATE,
  CELL_INSERT_LEFT_OF,
  CELL_INSERT_RIGHT_OF
} from 'src/editor/actions/cell'
import { optimizeCell, optimizeRow, optimizeRows, optimizeCells } from './helper/optimize'
import { isHoveringThis } from './helper/hover'

const inner = (cb, action, ancestors) => (state) => cb(state, action, ancestors)

export const cell = (state = {
  id: null,
  rows: []
}, action, ancestors) => optimizeCell(((state, action, ancestors) => {
  const reduce = () => ({
    ...state,
    rows: rows(state.rows, action, [...ancestors, state.id])
  })

  switch (action.type) {
    case CELL_UPDATE:
      if (action.id === state.id) {
        return { ...(reduce()), data: action.data }
      }
      return reduce()
    default:
      return reduce()
  }
})(state, action, ancestors))

export const cells = (state = [], action, ancestors) => optimizeCells(((state, action, ancestors) => {
  switch (action.type) {
    case CELL_REMOVE:
      return state.filter(({ id }) => id !== action.id).map(inner(cell, action, ancestors))

    default:
      return state.map(inner(cell, action, ancestors))
  }
})(state, action, ancestors))

export const row = (state = {
  id: null,
  cells: []
}, action, ancestors) => optimizeRow(((state, action, ancestors) => {
  const reduce = () => ({
    ...state,
    ancestors,
    cells: cells(state.cells, action, [...ancestors, state.id])
  })

  switch (action.type) {
    case CELL_INSERT_LEFT_OF:
      if (!isHoveringThis(state, action)) {
        return reduce()
      }
      return {
        ...state,
        cells: inner(cells([
          ...(state.cells),
          { ...(action.item), id: action.ids[0] }
        ], action, ancestors))
      }

    case CELL_INSERT_RIGHT_OF:
      if (!isHoveringThis(state, action)) {
        return reduce()
      }
      return {
        ...state,
        cells: inner(cells([
          ...(state.cells),
          { ...(action.item), id: action.ids[0] }
        ], action, ancestors))
      }

    default:
      return reduce()
  }
})(state, action, ancestors))


export const rows = (state = [], action, ancestors = []) => optimizeRows(((state, action, ancestors) => {
  switch (action.type) {
    default:
      return state.map(inner(row, action, ancestors))
  }
})(state, action, ancestors))
