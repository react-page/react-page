/* eslint-disable no-use-before-define */
import {
  CELL_REMOVE,
  CELL_SET
} from 'src/editor/actions/cell'

const inner = (cb, action) => (state) => cb(state, action)

export const cell = (state = {
  id: null,
  rows: []
}, action) => {
  switch (action.type) {
    case CELL_SET:
      return {
        ...state,
        data: action.data,
        rows: state.rows.map(inner(rows, action))
      }
    default:
      return {
        ...state,
        rows: state.rows.map(inner(rows, action))
      }
  }
}

export const cells = (state = [], action) => {
  switch (action.type) {
    case CELL_REMOVE:
      return state.filter(({ id }) => id === action.id).map(inner(cell, action))
    default:
      return state.map(inner(cell, action))
  }
}

export const row = (state = {
  id: null,
  cells: []
}, action) => {
  switch (action.type) {
    default:
      return {
        ...state,
        cells: state.cells.map(inner(cells, action))
      }
  }
}

export const rows = (state = [], action) => {
  switch (action.type) {
    default:
      return state.map(inner(row, action))
  }
}
