import {
  CELL_HOVER_CELL,
  CELL_DRAG,
  CELL_CANCEL_DRAG,
  CELL_REMOVE,
  CELL_DROP,
  CELL_FOCUS,
  CELL_BLUR,
  CELL_UPDATE
} from "src/common/actions/cell";
import {CREATE_PLACEHOLDERS, DESTROY_PLACEHOLDERS} from "src/common/actions/placeholders";
import {CELL_HOVER_ANCESTOR} from "src/common/actions/row";
import uuid from "node-uuid";

const cellPlaceholder = () => ({
  id: uuid.v4(),
  isPlaceholder: true
})

const rowPlaceholder = () => ({
  id: uuid.v4(),
  isPlaceholder: true,
  cells: [cellPlaceholder()]
})

const isEmpty = ({cells = [], rows = [], plugin = null}) => {
  if (cells.length > 0) {
    return cells.filter((c) => !isEmpty(c)).length === 0
  } else if (rows.length > 0) {
    return rows.filter((r) => !isEmpty(r)).length === 0
  }
  return !Boolean(plugin)
}

const flattenCells = (cells = []) => {
  return [].concat.apply([], cells.map((c) => {
    const {rows = []} = c
    if (rows.length !== 1) {
      return [c]
    }
    const {cells: rowCells = []} = rows[0]
    if (rowCells.length === 1) {
      return rowCells
    }
    return [c]
  }))
}

const flattenRows = (rows = []) => {
  return [].concat.apply([], rows.map((r) => {
    const {cells = []} = r
    if (cells.length !== 1 || (Boolean(r.wrap) && cells.length > 0)) {
      return [r]
    }
    const {rows: cellRows = []} = cells[0]
    if (cellRows.length > 0) {
      return cellRows
    }
    return [r]
  }))
}

// const isDropAncestor = (find, rows = []) => rows.filter((row) => Boolean(row.cells.find(({ id, rows = [] }) => id === find || isDropAncestor(find, rows)))).length > 0

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
    case CELL_DROP:
      return flattenRows(
        [].concat
          .apply([], state.map((r) => {
            if (isActive({action, e: r, level: action.level})) {
              switch (action.position) {
                case 'top':
                  return [
                    {
                      id: uuid.v4(),
                      cells: [
                        {
                          ...(action.item),
                          id: uuid.v4()
                        }
                      ]
                    },
                    {
                      ...r,
                      id: uuid.v4()
                    }
                  ]
                case 'bottom':
                  return [
                    {
                      ...r,
                      id: uuid.v4()
                    },
                    {
                      id: uuid.v4(),
                      cells: [{...(action.item), id: uuid.v4()}]
                    }
                  ]
              }
            }
            return [r]
          }))
          .map((r) => row({...r, hover: null}, action, parents))
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
  isPlaceholder: false,
  cells: [],
  wrap: {}
}, action, parents) => {
  switch (action.type) {
    case CELL_DROP:
      if (isActive({action, e: state, level: action.level})) {
        switch (action.position) {
          case 'left':
            return {
              ...state,
              cells: cells([
                {
                  ...(action.item),
                  id: uuid.v4()
                },
                ...(state.cells)
              ], action, [...parents, state.id])
            }
          case 'right':
            return {
              ...state,
              cells: cells([
                ...(state.cells),
                {
                  ...(action.item),
                  id: uuid.v4()
                }
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
      return {
        ...state,
        id: state.id || uuid.v4(),
        parents,
        cells: cells(state.cells, action, [...parents, state.id])
      }
  }
}

const isActive = ({action, e = {}, level = 0}) => {
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
          const active = isActive({action, e: c, level: action.level})
          return cell({
            ...c,
            hover: active ? action.position : null,
            readOnly: c.id === action.hover.id
          }, action, parents)
        })
    case CELL_FOCUS:
      return state
        .map((c) => c.id === action.id ? cell({...c, readOnly: false}, action, parents) : cell(c, action, parents))
    case CELL_BLUR:
      return state
        .map((c) => c.id === action.id ? cell({...c, readOnly: true}, action, parents) : cell(c, action, parents))
    case CELL_UPDATE:
      return state
        .map((c) => c.id === action.id ? cell({...c, data: action.data}, action, parents) : cell(c, action, parents))
    case CELL_DROP:
      return flattenCells(
        [].concat
          .apply([], state.map((c) => {
            if (isActive({action, e: c, level: action.level})) {
              switch (action.position) {
                case 'left':
                  return [
                    {
                      ...(action.item),
                      id: uuid.v4()
                    },
                    {
                      ...c,
                      id: uuid.v4()
                    }
                  ]
                case 'right':
                  return [
                    {
                      ...c,
                      id: uuid.v4()
                    },
                    {
                      ...(action.item),
                      id: uuid.v4(),
                    }
                  ]
              }
            }
            return [{...c, hover: null}]
          }))
          .map((c) => cell({...c, hover: null, size: 0, readOnly: false}, action, parents))
          .filter((c) => c.id !== action.item.id && !isEmpty(c))
      )
    default:
      return flattenCells(state
        .map((c) => cell(c, action, parents))
      )
  }
}

const cell = (state = {
  id: null,
  isPlaceholder: false,
  isNestedPlaceholder: false,
  plugin: null,
  readOnly: true,
  data: {},
  wrap: {},
  rows: []
}, action, parents = []) => {
  switch (action.type) {
    case CELL_CANCEL_DRAG:
      return {...state, hover: null, readOnly: false, rows: rows(state.rows, action)}
    case CELL_DROP:
      if (isActive({action, e: state, level: action.level})) {
        const id = uuid.v4()
        switch (action.position) {
          case 'top':
            return {
              id,
              flatten: true,
              rows: rows([
                {
                  id: uuid.v4(),
                  cells: [{
                    ...(action.item),
                    id: uuid.v4()
                  }]
                },
                {
                  id: uuid.v4(),
                  cells: [{
                    ...state,
                    id: uuid.v4()
                  }]
                }
              ], {...action, hover: {}}, [...parents, id]),
              hover: null
            }
          case 'bottom':
            return {
              id,
              flatten: true,
              rows: rows([
                {
                  id: uuid.v4(),
                  cells: [{
                    ...state,
                    id: uuid.v4()
                  }]
                },
                {
                  id: uuid.v4(),
                  cells: [{
                    ...(action.item),
                    id: uuid.v4()
                  }]
                }
              ], {...action, hover: {}}, [...parents, id]),
              hover: null
            }
        }
      }
      return {
        ...state,
        rows: rows(state.rows, action, [...parents, state.id])
      }
    default:
      return {
        ...state, id: state.id || uuid.v4(),
        parents,
        rows: rows(state.rows, action, [...parents, state.id])
      }
  }
}
