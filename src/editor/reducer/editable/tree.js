/* eslint-disable no-use-before-define */
import {
  CELL_REMOVE,
  CELL_UPDATE,
  CELL_INSERT_LEFT_OF,
  CELL_INSERT_RIGHT_OF,
  CELL_INSERT_ABOVE,
  CELL_INSERT_BELOW,
  CELL_INSERT_INLINE_LEFT,
  CELL_INSERT_INLINE_RIGHT,
  CELL_DRAG_CANCEL,
  CELL_DRAG_HOVER,
  CELL_RESIZE
} from 'src/editor/actions/cell'
import { optimizeCell, optimizeRow, optimizeRows, optimizeCells, flatten } from './helper/optimize'
import { isHoveringThis } from './helper/hover'
import { computeSizes, computeInlines, computeBounds, resizeCells, computeResponsive, computeResizeable } from './helper/sizing'

const inner = (cb, action) => (state) => cb(state, action)

export const cell = (state = {
  id: null,
  hover: null,
  responsive: [],
  size: 0,
  inline: null,
  bounds: { left: 0, right: 0 },
  rows: []
}, action) => optimizeCell(((state, action) => {
  const reduce = () => ({
    ...state,
    hover: null,
    rows: rows(state.rows, action)
  })

  switch (action.type) {
    case CELL_DRAG_CANCEL:
      // If cell drag is canceled, remove all hover
      return { ...reduce(), hover: null }

    case CELL_UPDATE:
      if (action.id === state.id) {
        // If this cell is being updated, set the data
        return { ...reduce(), props: action.props }
      }
      return reduce()

    case CELL_DRAG_HOVER:
      if (isHoveringThis(state, action)) {
        // if this is the cell we're hovering, set the hover attribute
        return { ...reduce(), hover: action.position }
      }
      // or remove it if not
      return reduce()

    case CELL_INSERT_ABOVE:
      if (isHoveringThis(state, action)) {
        return {
          id: action.ids[0],
          hover: null,
          rows: rows([{
            id: action.ids[1],
            cells: [{ ...(action.item), id: action.ids[2] }]
          }, {
            id: action.ids[3],
            cells: [{ ...reduce(), id: action.ids[4] }]
          }], action)
        }
      }
      return reduce()

    case CELL_INSERT_BELOW:
      if (isHoveringThis(state, action)) {
        return {
          id: action.ids[0],
          hover: null,
          rows: rows([{
            id: action.ids[1],
            cells: [{ ...state, id: action.ids[2] }]
          }, {
            id: action.ids[3],
            cells: [{ ...(action.item), id: action.ids[4] }]
          }], action)
        }
      }
      return reduce()

    default:
      return reduce()
  }
})(state, action))

export const cells = (state = [], action) => computeInlines(computeResizeable(computeResponsive(computeBounds(computeSizes(optimizeCells(((state, action) => {
  switch (action.type) {
    case CELL_RESIZE:
      return resizeCells(state.map(inner(cell, action)), action)

    case CELL_INSERT_LEFT_OF:
      return state
        .map((c) => isHoveringThis(c, action)
          ? [{ ...(action.item), id: action.ids[0] }, { ...c, id: action.ids[1] }]
          : [c])
        .reduce(flatten, [])
        .map(inner(cell, action))

    case CELL_INSERT_RIGHT_OF:
      return state
        .map((c) => isHoveringThis(c, action)
          ? [{ ...c, id: action.ids[0] }, { ...(action.item), id: action.ids[1] }]
          : [c])
        .reduce(flatten, [])
        .map(inner(cell, action))

    case CELL_INSERT_INLINE_RIGHT:
    case CELL_INSERT_INLINE_LEFT:
      return state.map((c) => isHoveringThis(c, action)
        ? [...state.map((s) => ({ ...s, inline: null })),
          {
            ...(action.item),
            inline: action.type === CELL_INSERT_INLINE_RIGHT ? 'right' : 'left',
            id: action.ids[1]
          }] : [c])
        .reduce(flatten, [])
        .map(inner(cell, action))

    case CELL_REMOVE:
      return state.filter(({ id }) => id !== action.id).map(inner(cell, action))

    default:
      return state.map(inner(cell, action))
  }
})(state, action)))))))

export const row = (state = {
  id: null,
  hover: null,
  cells: []
}, action) => optimizeRow(((state, action) => {
  const reduce = () => ({
    ...state,
    hover: null,
    cells: cells(state.cells, action)
  })

  switch (action.type) {

    case CELL_INSERT_LEFT_OF:
      if (!isHoveringThis(state, action)) {
        return reduce()
      }
      return {
        ...state,
        hover: null,
        cells: inner(cells([
          ...(state.cells),
          { ...(action.item), id: action.ids[0] }
        ], action))
      }

    case CELL_INSERT_RIGHT_OF:
      if (!isHoveringThis(state, action)) {
        return reduce()
      }
      return {
        ...state,
        hover: null,
        cells: inner(cells([
          ...(state.cells),
          { ...(action.item), id: action.ids[0] }
        ], action))
      }

    case CELL_DRAG_HOVER:
      if (isHoveringThis(state, action)) {
        return { ...reduce(), hover: action.position }
      }
      return reduce()

    case CELL_DRAG_CANCEL:
    default:
      return reduce()
  }
})(state, action))


export const rows = (state = [], action) => optimizeRows(((state, action) => {
  const reduce = () => state.map(inner(row, action))
  switch (action.type) {
    case CELL_INSERT_ABOVE:
      return state
        .map((r) => isHoveringThis(r, action)
          ? [{ id: action.ids[0], cells: [{ ...(action.item), id: action.ids[1] }] }, { ...r, id: action.ids[2] }]
          : [r])
        .reduce(flatten, [])
        .map(inner(row, action))
    case CELL_INSERT_BELOW:
      return state
        .map((r) => isHoveringThis(r, action)
          ? [{ ...r, id: action.ids[0] }, { id: action.ids[1], cells: [{ ...(action.item), id: action.ids[2] }] }]
          : [r])
        .reduce(flatten, [])
        .map(inner(row, action))

    default:
      return reduce()
  }
})(state, action))
