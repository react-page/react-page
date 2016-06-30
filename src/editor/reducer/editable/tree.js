/* eslint-disable no-use-before-define */
import {
  CELL_REMOVE,
  CELL_SET
} from 'src/editor/actions/cell'
import { optimizeCell, optimizeRow } from './helper/optimize'

const inner = (cb, action, ancestors) => (state) => cb(state, action, ancestors)

export const cell = (state = {
  id: null,
  rows: []
}, action, ancestors) => optimizeCell((() => {
  switch (action.type) {
    case CELL_SET:
      return {
        ...state,
        data: action.data,
        rows: state.rows.map(inner(rows, action, [...ancestors, state.id]))
      }
    default:
      return {
        ...state,
        rows: state.rows.map(inner(rows, action, [...ancestors, state.id]))
      }
  }
})())

export const cells = (state = [], action, ancestors) => {
  switch (action.type) {
    case CELL_REMOVE:
      return state.filter(({ id }) => id === action.id).map(inner(cell, action, ancestors))
    default:
      return state.map(inner(cell, action, ancestors))
  }
}

export const row = (state = {
  id: null,
  cells: []
}, action, ancestors) => optimizeRow((() => {
  switch (action.type) {
    default:
      return {
        ...state,
        ancestors,
        cells: state.cells.map(inner(cells, action, [...ancestors, state.id]))
      }
  }
})())

export const rows = (state = [], action, ancestors = []) => {
  switch (action.type) {
    default:
      return state.map(inner(row, action, ancestors))
  }
}
