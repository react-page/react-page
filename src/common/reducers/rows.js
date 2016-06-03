import {CELL_HOVER_CELL, CELL_CANCEL_DRAG} from 'src/common/actions/cell'
import {CELL_HOVER_ROW} from 'src/common/actions/row'
import uuid from 'node-uuid'
import CellPlaceholder from 'src/common/Plugins/CellPlaceholder'

const placeholders = {
  cells: [
    {
      id: uuid.v4(),
      plugin: CellPlaceholder,
      isPlaceholder: true
    },
    {
      id: uuid.v4(),
      plugin: CellPlaceholder,
      isPlaceholder: true
    }
  ]
}

export const rows = (state = [], action) => {
  let items = []
  switch (action.type) {
    case CELL_HOVER_ROW:
      state.filter(({isPlaceholder}) => !isPlaceholder).forEach(item => {
        if (!action.ancestors.find((a) => a === item.id)) {
          items.push(item)
          return
        }

        items.push(
          {
            id: uuid.v4(),
            isPlaceholder: true,
            cells: [{
              id: uuid.v4(),
              plugin: CellPlaceholder,
              isPlaceholder: true
            }]
          }, item,
          {
            id: uuid.v4(),
            isPlaceholder: true,
            cells: [{
              id: uuid.v4(),
              plugin: CellPlaceholder,
              isPlaceholder: true
            }]
          })
      })
      return items.map((item) => row(item, action))
    case CELL_CANCEL_DRAG:
      return state.filter(({isPlaceholder}) => !isPlaceholder).map((item) => row(item, action))
    default:
      return state.map((item) => row(item, action))
  }
}

const row = (state = {
  id: null,
  cells: [],
  wrap: {}
}, action) => {
  switch (action.type) {
    default:
      return {...state, id: state.id || uuid.v4(), cells: cells(state.cells, action)}
  }
}

const cells = (state = [], action) => {
  const items = []
  switch (action.type) {
    case CELL_HOVER_CELL:
      state.forEach(item => {
        if (item.isPlaceholder && item.id === action.hover) {
        } else if (item.isPlaceholder) {
          return
        } else  if (item.id !== action.hover) {
          items.push(item)
          return
        }

        items.push(placeholders.cells[0], item, placeholders.cells[1])
      })
      return items.map((item) => cell(item, action))
    case CELL_CANCEL_DRAG:
      return state.filter(({isPlaceholder}) => !isPlaceholder).map((item) => cell(item, action))
    default:
      return state.map((item) => cell(item, action))
  }
}

const cell = (state = {
  id: null,
  isPlaceholder: false,
  dragging: false,
  plugin: null,
  data: {},
  wrap: {},
  rows: []
}, action) => {
  switch (action.type) {
    case CELL_HOVER_CELL:
      return {
        ...state,
        dragging: action.id === state.id,
        rows: rows(state.rows, action)
      }
    case CELL_CANCEL_DRAG:
      return {...state, dragging: false, rows: rows(state.rows, action)}
    default:
      return {...state, id: state.id || uuid.v4(), rows: rows(state.rows, action)}
  }
}
