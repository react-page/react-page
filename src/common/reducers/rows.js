import {CELL_HOVER} from 'src/common/actions/cell'

export const rows = (
  state = [],
  action
) => {
  switch (action.type) {
    default:
      return state.map((item) => row(item, action))
  }
}

const row =  (
  state = {
    id: null,
    cells: [],
    wrap: {}
  },
  action
) => {
  switch (action.type) {
    default:
      return {...state, cells: cells(state.cells, action)}
  }
}

const cells = (
  state = [],
  action
) => {
  switch (action.type) {
    case CELL_HOVER:
      return state.filter((item) => {
        return item.id !== action.id
      }).map((item) => cell(item, action))
    default:
      return state.map((item) => cell(item, action))
  }
}

const cell = (
  state = {
    id: null,
    plugin: null,
    data: {},
    wrap: {},
    rows: []
  },
  action
) => {
  console.log(state.plugin)
  switch (action.type) {
    default:
      return {...state, rows: rows(state.rows, action)}
  }
}
