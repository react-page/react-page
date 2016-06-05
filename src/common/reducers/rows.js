import {CELL_HOVER_CELL, CELL_CANCEL_DRAG, CELL_REMOVE, CELL_DROP} from 'src/common/actions/cell'
import {CELL_HOVER_ANCESTOR} from 'src/common/actions/row'
import uuid from 'node-uuid'
import CellPlaceholder from 'src/common/Plugins/CellPlaceholder'

const cellPlaceholder = () => ({
  id: uuid.v4(),
  isPlaceholder: true,
  plugin: CellPlaceholder
})

const rowPlaceholder = () => ({
  id: uuid.v4(),
  isPlaceholder: true,
  cells: [cellPlaceholder()]
})

export const rows = (state = [], action) => {
  let items = []
  switch (action.type) {
    case CELL_HOVER_ANCESTOR:
      state.filter(({isPlaceholder}) => !isPlaceholder).forEach(item => {
        if (action.path.indexOf(item.id) === -1) {
          items.push(item)
          return
        }

        items.push(rowPlaceholder(), item, rowPlaceholder())
      })
      return items.map((r) => row(r, action))
    case CELL_DROP:
      return state
        .map((r) => ({...r, isPlaceholder: r.isPlaceholder && action.dropOn.path.indexOf(r.id) === -1}))
        .filter(({isPlaceholder, cells}) => !isPlaceholder)
        .map((r) => row(r, action))
        .filter(({cells}) => cells.length > 0)
    case CELL_CANCEL_DRAG:
      return state
        .filter(({isPlaceholder, cells}) => !isPlaceholder)
        .map((r) => row(r, action))
        .filter(({cells}) => cells.length > 0)
    default:
      return state
      //.filter(({cells}) => cells.length > 0)
        .map((r) => row(r, action))
  }
}

const row = (state = {
  id: null,
  isNestingPlaceholder: false,
  isPlaceholder: false,
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
      state
        .forEach(item => {
          if (item.isNestingPlaceholder) {
            items.push({...(item.rows[0].cells[1]), nestingPropagated: false})
            return
          } else if (item.id !== action.hover) {
            items.push(item)
            return
          }
          // items.push(cellPlaceholder(), item, cellPlaceholder())
          items.push({
            id: uuid.v4(),
            isNestingPlaceholder: true,
            rows: [
              {
                id: uuid.v4(),
                cells: [cellPlaceholder(), {...item, nestingPropagated: true}, cellPlaceholder()]
              }
            ]
          })
        })
      if (items.length === 0) {
        items.push(cellPlaceholder())
      }
      return items.map((c) => c.isNestingPlaceholder ? c : cell(c, action))
    case CELL_CANCEL_DRAG:
      return state
        .filter(({isPlaceholder}) => !isPlaceholder)
        .map((c) => {
          if (c.isNestingPlaceholder) {
            const find = ({rows = [], cells = []}) => {
              if (rows.length > 0) {
                const found = rows.find((r) => find(r))
                if (found) {
                  return found
                }
              }
              const original = cells.find((c) => !c.isPlaceholder)
              if (original) {
                return original
              }
            }

            const elem = find(c)
            if (elem) {
              return {...elem, nestingPropagated: false}
            }
            return {rows:[], id: uuid.v4()}
          }
          return cell(c, action)
        })
        .filter(({rows, plugin}) => Boolean(plugin) || rows.length > 0)
    case CELL_REMOVE:
      return state
        .filter(({id}) => action.id !== id)
        .map((c) => cell(c, action))
    case CELL_DROP:
      return state
        .map((c) => action.dropOn.id === c.id ? action.item : c)
        .filter(({isPlaceholder, id}) => !isPlaceholder && id !== action.remove)
        .map((c) => cell(c, action))
        .filter(({rows, plugin}) => Boolean(plugin) || rows.length > 0)
    default:
      return state
        .map((c) => cell(c, action))
  }
}

const cell = (state = {
  id: null,
  isPlaceholder: false,
  isNestingPlaceholder: false,
  plugin: null,
  data: {},
  wrap: {},
  rows: []
}, action) => {
  switch (action.type) {
    case CELL_HOVER_ANCESTOR:
      return {
        ...state,
        rows: rows(state.rows, action)
      }
    case CELL_CANCEL_DRAG:
      return {...state, rows: rows(state.rows, action)}
    default:
      return {...state, id: state.id || uuid.v4(), rows: rows(state.rows, action)}
  }
}
