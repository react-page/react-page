import {CELL_HOVER_CELL, CELL_DRAG, CELL_CANCEL_DRAG, CELL_REMOVE, CELL_DROP} from "src/common/actions/cell";
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
      return [].concat.apply([], state.map((r) => {
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
      })).map((r) => row({...r, hover: null}, action, parents))
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
          return cell({
            ...c,
            hover: isActive({action, e: c, level: action.level}) ? action.position : null
          }, action, parents)
        })
    case CELL_DROP:
      return [].concat
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
        .filter((c) => c.id !== action.item.id && (Boolean(c.plugin) || c.rows.length > 0))
        .map((c) => cell({...c, hover: null, size: 0}, action, parents))
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
    // case CELL_DROP:
    // case CELL_CANCEL_DRAG:
    //   return { ...state, hover: null, rows: rows(state.rows, action) }
    case CELL_DROP:
      if (isActive({action, e: state, level: action.level})) {
        const id = uuid.v4()
        switch (action.position) {
          case 'top':
            return {
              id,
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
