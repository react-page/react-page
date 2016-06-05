import {CELL_HOVER_CELL, CELL_DRAG, CELL_CANCEL_DRAG, CELL_REMOVE, CELL_DROP} from 'src/common/actions/cell'
import {CELL_HOVER_ANCESTOR} from 'src/common/actions/row'
import uuid from 'node-uuid'
import CellPlaceholder from 'src/common/Plugins/CellPlaceholder'

const cellPlaceholder = () => ({
  id: uuid.v4(),
  isPlaceholder: true
})

const rowPlaceholder = () => ({
  id: uuid.v4(),
  isPlaceholder: true,
  cells: [cellPlaceholder()]
})

const isDropAncestor = (find, rows = []) => rows.filter((row) => Boolean(row.cells.find(({id, rows = []}) => id === find || isDropAncestor(find, rows)))).length > 0

export const rows = (state = [], action) => {
  switch (action.type) {
    case CELL_DRAG:
      if (state.length === 0) {
        return state.map((r) => row(r, action))
      }
      const rows = [].concat.apply([], state.map((r) => [rowPlaceholder(), r]))
      rows.push(rowPlaceholder())
      return rows.map((r) => r.isPlaceholder ? r : row(r, action))
    case CELL_DROP:
      return state
        .map((r) => row(r, action))
        .filter(({id, isPlaceholder, cells = []}) => ((!isPlaceholder && cells.length > 0) || (isPlaceholder && isDropAncestor(action.dropOn.id, [{id, cells}]))))
    case CELL_CANCEL_DRAG:
      return state
        .filter(({isPlaceholder, cells = []}) => !isPlaceholder && cells.length > 0)
        .map((r) => row(r, action))
    default:
      return state
        .map((r) => row(r, action))
  }
}

const row = (state = {
  id: null,
  isPlaceholder: false,
  cells: [],
  wrap: {}
}, action) => {
  let cs = state.cells
  if (state.cells.length === 1) {
    if ((state.cells[0].rows || []).length > 0) {
      cs = [].concat.apply([], state.cells[0].rows.map((r) => r.cells))
    }
  }
  switch (action.type) {
    case CELL_DROP:
      if (isDropAncestor(action.dropOn.id, [state])) {
        return {
          ...state,
          isPlaceholder: false,
          id: state.id || uuid.v4(),
          cells: cells(cs, action)
        }
      }
    default:
      return {
        ...state,
        id: state.id || uuid.v4(),
        cells: cells(cs, action)
      }
  }
}

const cells = (state = [], action) => {
  switch (action.type) {
    case CELL_REMOVE:
      return state
        .filter(({id}) => action.id !== id)
        .map((c) => cell(c, action))
    case CELL_DRAG:
      if (state.length === 0) {
        return [cellPlaceholder()]
      }
      const cells = [].concat.apply([], state.map((c) => [cellPlaceholder(), cell(c, action)]))
      cells.push(cellPlaceholder())
      return cells
    case CELL_DROP:
      return state
        .map((cell) => {
          const {isNestedPlaceholder, rows = []} = cell
          if (!isNestedPlaceholder) {
            return cell
          }
          if(isDropAncestor(action.dropOn.id, rows)) {
            return {...cell, isNestedPlaceholder: false}
          }
          return rows[1].cells[0]
        })
        .filter(({id}) => action.item.id !== id)
        .map((c) => cell(c, action))
        .filter(({isPlaceholder, plugin, rows = []}) => !isPlaceholder && (Boolean(plugin) || rows.length > 0))
    case CELL_CANCEL_DRAG:
      return state
        .map((cell) => {
          const {isNestedPlaceholder, rows = []} = cell
          if (!isNestedPlaceholder) {
            return cell
          }
          return rows[1].cells[0]
        })
        .filter(({isPlaceholder, plugin, rows = []}) => !isPlaceholder && (Boolean(plugin) || rows.length > 0))
        .map((c) => cell(c, action))
    default:
      return state
        .map((c) => cell(c, action))
  }
}

const cell = (state = {
  id: null,
  isPlaceholder: false,
  isNestedPlaceholder: false,
  plugin: null,
  data: {},
  wrap: {},
  rows: []
}, action) => {
  switch (action.type) {
    case CELL_DRAG:
      if (state.rows.length > 0) {
        return {...state, size: 0, id: state.id || uuid.v4(), rows: rows(state.rows, action)}
      }
      return {
        id: uuid.v4(),
        isNestedPlaceholder: true,
        rows: [
          rowPlaceholder(),
          {
            id: uuid.v4(),
            cells: [
              {...state, size: 0, id: state.id || uuid.v4()}
            ]
          },
          rowPlaceholder(),
        ]
      }
    case CELL_DROP:
      if (action.dropOn.id === state.id) {
        return {...(action.item), size: 0, id: uuid.v4(), rows: rows(state.rows, action)}
      }
      return {...state, size: 0, id: state.id || uuid.v4(), rows: rows(state.rows, action)}
    case CELL_CANCEL_DRAG:
    default:
      return {...state, id: state.id || uuid.v4(), rows: rows(state.rows, action)}
  }
}
