import {CELL_HOVER_CELL, CELL_DRAG, CELL_CANCEL_DRAG, CELL_REMOVE, CELL_DROP} from 'src/common/actions/cell'
import {CREATE_PLACEHOLDERS, DESTROY_PLACEHOLDERS} from 'src/common/actions/placeholders'
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

export const rows = (state = [], action, parents = []) => {
  switch (action.type) {
    case CELL_HOVER_CELL:
      return state
        .map((r) => {
          return row({
            ...r,
            hover: isActive({action, e: r, level: action.level}) ? action.position : null
          }, action, parents)
        })
    // case CELL_HOVER_CELL:
    //   return state
    //     .map((r) => row(r, action))
    // case CREATE_PLACEHOLDERS:
    //   if (state.length === 0) {
    //     return state.map((r) => row(r, action))
    //   }
    //   const rows = [].concat.apply([], state.map((r) => [rowPlaceholder(), r]))
    //   rows.push(rowPlaceholder())
    //   return rows.map((r) => r.isPlaceholder ? r : row(r, action))
    //     .filter(({id, isPlaceholder, cells = []}) => ((!isPlaceholder && cells.length > 0) || (isPlaceholder && isDropAncestor(action.hover.id, [{id, cells}]))))
    // case DESTROY_PLACEHOLDERS:
    //   return state
    //     .filter(({isPlaceholder, cells = []}) => !isPlaceholder && cells.length > 0)
    //     .map((r) => row(r, action))
    default:
      return state
        .map((r) => row(r, action, parents))
  }
}

const row = (state = {
  id: null,
  isPlaceholder: false,
  cells: [],
  wrap: {}
}, action, parents) => {
  let cs = state.cells
  if (state.cells.length === 1) {
    if ((state.cells[0].rows || []).length > 0) {
      cs = [].concat.apply([], state.cells[0].rows.map((r) => r.cells))
    }
  }
  switch (action.type) {
    // case CELL_DROP:
    //   if (isDropAncestor(action.hover.id, [state])) {
    //     return {
    //       ...state,
    //       isPlaceholder: false,
    //       id: state.id || uuid.v4(),
    //       cells: cells(cs, action)
    //     }
    //   }
    default:
      return {
        ...state,
        id: state.id || uuid.v4(),
        parents,
        cells: cells(cs, action, [...parents, state.id])
      }
  }
}

const isActive = ({action, e = {}, level = 0}) => {
  const children = e.rows || e.cells || []
  if (level > 0 && children.length > 0) {
    return Boolean(children.find((c) => isActive({
        action,
        row: c,
        level: level - 1
      })))
  }
  console.log('isActive', action, e)
  if ( action.hover.id === e.id) {
    console.log('isActive', action.hover.id === e.id)
  }
  return action.hover.id === e.id
}

const isCellActive = ({action, cell = {}, level = 0}) => {
  if (level > 0) {
    return cell.rows.filter((r) => r.cells.filter((c) => isCellActive({
        action,
        cell: c,
        level: level - 2
      })).length > 0).length > 0
  }
  return action.hover.id === cell.id
}

export const cells = (state = [], action, parents = []) => {
  switch (action.type) {
    case CELL_HOVER_CELL:
      return state
        .map((c) => {
          return cell({
            ...c,
            hover: isCellActive({action, cell: c, level: action.level}) ? action.position : null
          }, action, parents)
        })
    // case CELL_REMOVE:
    //   return state
    //     .filter(({id}) => action.id !== id)
    //     .map((c) => cell(c, action))
    // case CREATE_PLACEHOLDERS:
    //   if (state.length === 0) {
    //     return [cellPlaceholder()]
    //   }
    //   const cells = [].concat.apply([], state.map((c) => [cellPlaceholder(), cell(c, action)]))
    //   cells.push(cellPlaceholder())
    //   return cells
    case CELL_DROP:
      return [].concat
        .apply([], state
          .filter(({id}) => action.item.id !== id)
          .map((c) => {
              if (isActive({action, cell: c, level: action.level})) {
                switch (action.hover.hover) {
                  case 'right':
                    return [cell(c, action, parents),c]
                  case 'left':
                    return [{...(action.item), size: 0},  c]
                }
              }

              return c
            }
          ))
      cells.push(cellPlaceholder())
    // .map((cell) => {
    //       const {isNestedPlaceholder, rows = []} = cell
    //       if (!isNestedPlaceholder) {
    //         return cell
    //       }
    //       if(isDropAncestor(action.hover.id, rows)) {
    //         return {...cell, isNestedPlaceholder: false}
    //       }
    //       return rows[1].cells[0]
    //     })
    //     .filter(({id}) => action.item.id !== id)
    //     .map((c) => cell(c, action))
    //     .filter(({isPlaceholder, plugin, rows = []}) => !isPlaceholder && (Boolean(plugin) || rows.length > 0))
    // case DESTROY_PLACEHOLDERS:
    //   return state
    //     .map((cell) => {
    //       const {isNestedPlaceholder, rows = []} = cell
    //       if (!isNestedPlaceholder) {
    //         return cell
    //       }
    //       return rows[1].cells[0]
    //     })
    //     .filter(({isPlaceholder, plugin, rows = []}) => !isPlaceholder && (Boolean(plugin) || rows.length > 0))
    //     .map((c) => cell(c, action))
    default:
      return state
        .map((c) => cell(c, action, parents))
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
}, action, parents = []) => {
  switch (action.type) {
    // case CREATE_PLACEHOLDERS:
    //   if (state.rows.length > 0) {
    //     return {...state, size: 0, id: state.id || uuid.v4(), rows: rows(state.rows, action)}
    //   }
    //   return {
    //     id: uuid.v4(),
    //     isNestedPlaceholder: true,
    //     rows: [
    //       rowPlaceholder(),
    //       {
    //         id: uuid.v4(),
    //         cells: [
    //           {...state, size: 0, id: state.id || uuid.v4()}
    //         ]
    //       },
    //       rowPlaceholder(),
    //     ]
    //   }
    // case CELL_DROP:
    //   if (action.hover.id === state.id) {
    //     return {...(action.item), size: 0, id: uuid.v4(), rows: rows(state.rows, action)}
    //   }
    //   return {...state, size: 0, id: state.id || uuid.v4(), rows: rows(state.rows, action)}
    case CELL_DROP:
    case CELL_CANCEL_DRAG:
      return {...state, hover: null, rows: rows(state.rows, action)}
    default:
      return {
        ...state, id: state.id || uuid.v4(),
        parents,
        rows: rows(state.rows, action, [...parents, state.id])
      }
  }
}
