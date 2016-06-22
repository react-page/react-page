import uuid from "node-uuid"
import {
  CELL_HOVER_CELL,
  CELL_CANCEL_DRAG,
  CELL_DROP,
  CELL_FOCUS,
  CELL_BLUR,
  CELL_UPDATE,
  CELL_RESIZE
} from "src/common/actions/cell"

export const MAX_CELLS_PER_ROW = 12

const isEmpty = ({ cells = [], rows = [], plugin = null }) => {
  if (cells.length > 0) {
    return cells.filter((c) => !isEmpty(c)).length === 0
  } else if (rows.length > 0) {
    return rows.filter((r) => !isEmpty(r)).length === 0
  }
  return !plugin
}

const flattenCells = (cells = []) => {
  return [].concat.apply([], cells.map((c) => {
    const { rows = [], wrap } = c
    if (rows.length !== 1 || (Boolean(wrap) && rows.length > 0)) {
      return [c]
    }
    const { cells: rowCells = [] } = rows[0]
    if (rowCells.length === 1) {
      return rowCells
    }
    return [c]
  }))
}

const isActive = ({ action, e = {}, level = 0 }) => {
  const children = e.rows || e.cells || []
  if (level > 0) {
    return Boolean(children.find((child) => isActive({
      action,
      e: child,
      level: level - 1
    })))
  }
  return action.hover.id === e.id
}

const isCellActive = ({ action, cell = {}, level = 0 }) => {
  if (level > 0) {
    return cell.rows.filter((r) => r.cells.filter((c) => isCellActive({
        action,
        cell: c,
        level: level - 2
      })).length > 0).length > 0
  }
  return action.hover.id === cell.id
}

const flattenRows = (rows = []) => {
  return [].concat.apply([], rows.map((r) => {
    const { cells = [] } = r
    if (cells.length !== 1) {
      return [r]
    }
    const { rows: cellRows = [], wrap } = cells[0]
    if (cellRows.length > 0 && !wrap) {
      return cellRows
    }
    return [r]
  }))
}

export const rows = (state = [], action, parents = []) => {
  switch (action.type) {
    case CELL_HOVER_CELL:
      return state
        .map((r) => row({
            ...r,
            hover: isActive({ action, e: r, level: action.level }) ? action.position : null
          }, action, parents)
        )
    case CELL_DROP:
      return flattenRows(
        [].concat
          .apply([], state.map((r) => {
            if (isActive({ action, e: r, level: action.level })) {
              switch (action.position) {
                case 'top':
                  return [
                    { id: uuid.v4(), cells: [{ ...(action.item), id: uuid.v4() }] },
                    { ...r, id: uuid.v4() }
                  ]
                case 'bottom':
                  return [
                    { ...r, id: uuid.v4() },
                    { id: uuid.v4(), cells: [{ ...(action.item), id: uuid.v4() }] }
                  ]
              }
            }
            return [r]
          }))
          .map((r) => row({ ...r, hover: null }, action, parents))
          .filter((r) => !isEmpty(r))
      )
    default:
      return flattenRows(state
        .map((r) => row(r, action, parents))
      )
  }
}

const row = (state = {
  id: null,
  cells: []
}, action, parents) => {
  switch (action.type) {
    case CELL_DROP:
      if (isActive({ action, e: state, level: action.level })) {
        switch (action.position) {
          case 'left':
            return {
              ...state,
              cells: cells([
                { ...(action.item), id: uuid.v4() },
                ...(state.cells)
              ], action, [...parents, state.id])
            }
          case 'right':
            return {
              ...state,
              cells: cells([
                ...(state.cells),
                { ...(action.item), id: uuid.v4() }
              ], action, [...parents, state.id])
            }
        }
      }
      return {
        ...state,
        parents,
        cells: cells(state.cells, action, [...parents, state.id])
      }
    case CELL_CANCEL_DRAG:
      return {
        ...state,
        hover: null,
        cells: cells(state.cells, action, [...parents, state.id])
      }
    default:
      const id = state.id || uuid.v4()
      return {
        ...state,
        id,
        parents,
        cells: cells(state.cells, action, [...parents, id])
      }
  }
}

export const cells = (state = [], action, parents = []) => {
  switch (action.type) {
    case CELL_HOVER_CELL:
      return state
        .map((c) => {
          const active = isActive({ action, e: c, level: action.level })
          return cell({
            ...c,
            hover: active ? action.position : null,
            readOnly: c.id === action.hover.id
          }, action, parents)
        })
    case CELL_RESIZE:
      let wasPrevious = 0
      return state
        .map((c) => {
          if (wasPrevious > 0) {
            return cell({
              ...c,
              size: c.size + wasPrevious - action.size
            }, action, parents)
          } else if (action.id === c.id) {
            wasPrevious = c.size
            return cell({ ...c, size: action.size }, action, parents)
          }
          return cell(c, action, parents)
        })
    case CELL_UPDATE:
      return state
        .map((c) => c.id === action.id ? cell({ ...c, data: action.data }, action, parents) : cell(c, action, parents))
    case CELL_DROP:
      return computeSizes(flattenCells(
        [].concat
          .apply([], state.map((c) => {
            if (isActive({ action, e: c, level: action.level })) {
              switch (action.position) {
                case 'left':
                  return [
                    { ...(action.item), id: uuid.v4() },
                    { ...c, id: uuid.v4() }
                  ]
                case 'right':
                  return [
                    { ...c, id: uuid.v4() },
                    { ...(action.item), id: uuid.v4() }
                  ]
              }
            }
            return [{ ...c, hover: null }]
          }))
          .map((c) => cell({ ...c, hover: null, readOnly: false }, action, parents))
          .filter((c) => c.id !== action.item.id && !isEmpty(c))
      ))
    default:
      return computeSizes(flattenCells(state
        .map((c, k) => cell({
          ...c,
          resizeable: state.length > 1 ? k < state.length - 1 : false
        }, action, parents))
      ))
  }
}

const computeSizes = (cells = []) => {
  if (cells.reduce(({ size: p = 99 }, { size: c = 99 }) => ({ size: p + c }), { size: 0 }).size === MAX_CELLS_PER_ROW) {
    return cells
  }

  const size = Math.floor(MAX_CELLS_PER_ROW / cells.length)
  let currentSize = 0
  return cells.map((c, k) => {
    if (k === cells.length - 1) {
      return { ...c, size: MAX_CELLS_PER_ROW - currentSize }
    }

    currentSize += size
    return { ...c, size }
  })
}

const cell = (state = {
  id: null,
  plugin: null,
  readOnly: true,
  resizeable: false,
  size: 0,
  data: {},
  wrap: null,
  rows: []
}, action, parents = []) => {
  switch (action.type) {
    case CELL_CANCEL_DRAG:
      return { ...state, hover: null, readOnly: false, rows: rows(state.rows, action) }
    case CELL_DROP:
      if (isActive({ action, e: state, level: action.level })) {
        const id = uuid.v4()
        switch (action.position) {
          case 'top':
            return {
              id,
              rows: rows([
                {
                  id: uuid.v4(),
                  cells: [{ ...(action.item), id: uuid.v4() }]
                },
                {
                  id: uuid.v4(),
                  cells: [{ ...state, id: uuid.v4() }]
                }
              ], { ...action, hover: {} }, [...parents, id]),
              hover: null
            }
          case 'bottom':
            return {
              id,
              rows: rows([
                {
                  id: uuid.v4(),
                  cells: [{ ...state, id: uuid.v4() }]
                },
                {
                  id: uuid.v4(),
                  cells: [{ ...(action.item), id: uuid.v4() }]
                }
              ], { ...action, hover: {} }, [...parents, id]),
              hover: null
            }
        }
      }
      return {
        ...state,
        rows: rows(state.rows, action, [...parents, state.id])
      }
    default:
      const id = state.id || uuid.v4()
      return {
        ...state,
        parents,
        id,
        rows: rows(state.rows, action, [...parents, id])
      }
  }
}
