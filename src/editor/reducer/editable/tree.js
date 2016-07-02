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
import { optimizeCell, optimizeRow, optimizeRows, optimizeCells } from './helper/optimize'
import { isHoveringThis } from './helper/hover'
import { computeSizes, computeBounds, resizeCells, computeResponsive } from './helper/sizing'

const inner = (cb, action, ancestors) => (state) => cb(state, action, ancestors)

export const cell = (state = {
  id: null,
  hover: null,
  responsive: [],
  size: 0,
  inline: false,
  bounds: { left: 0, right: 0 },
  rows: []
}, action, ancestors) => optimizeCell(((state, action, ancestors) => {
  const reduce = () => ({
    ...state,
    hover: null,
    rows: rows(state.rows, action, [...ancestors, state.id])
  })

  switch (action.type) {
    case CELL_DRAG_CANCEL:
      // If cell drag is canceled, remove all hover
      return { ...reduce(), hover: null }

    case CELL_UPDATE:
      if (action.id === state.id) {
        // If this cell is being updated, set the data
        return { ...reduce(), data: action.data }
      }
      return reduce()

    case CELL_DRAG_HOVER:
      if (isHoveringThis(state, action)) {
        // if this is the cell we're hovering, set the hover attribute
        return { ...reduce(), hover: action.position }
      }
      // or remove it if not
      return { ...reduce(), hover: null }

    default:
      return reduce()
  }
})(state, action, ancestors))

export const cells = (state = [], action, ancestors) => computeResponsive(computeBounds(computeSizes(optimizeCells(((state, action, ancestors) => {
  switch (action.type) {
    case CELL_RESIZE:
      return resizeCells(state.map(inner(cell, action, ancestors)), action)

    case CELL_INSERT_LEFT_OF:
      return state
        .map((c) => isHoveringThis(c, action)
          ? [{ ...(action.item), id: action.ids[0] }, { ...c, id: action.ids[1] }]
          : [c])
        .reduce((c = [], n = []) => c.push(...n), [])
        .map(inner(row, action, ancestors))

    case CELL_INSERT_RIGHT_OF:
      return state
        .map((c) => isHoveringThis(c, action)
          ? [{ ...c, id: action.ids[0] }, { ...(action.item), id: action.ids[1] }]
          : [c])
        .reduce((c = [], n = []) => c.push(...n), [])
        .map(inner(row, action, ancestors))

    case CELL_INSERT_INLINE_RIGHT:
    case CELL_INSERT_INLINE_LEFT:
      return state.map((c) => isHoveringThis(c, action)
        ? [...state.map((s) => ({ ...s, inline: false })),
          {
            ...(action.item),
            inline: action.type === CELL_INSERT_INLINE_RIGHT ? 'right' : 'left',
            id: action.ids[1]
          }] : [c])
        .reduce((c = [], n = []) => c.push(...n), [])
        .map(inner(row, action, ancestors))

    case CELL_REMOVE:
      return state.filter(({ id }) => id !== action.id).map(inner(cell, action, ancestors))

    default:
      return state.map(inner(cell, action, ancestors))
  }
})(state, action, ancestors)))))

export const row = (state = {
  id: null,
  hover: null,
  cells: []
}, action, ancestors) => optimizeRow(((state, action, ancestors) => {
  const reduce = () => ({
    ...state,
    ancestors,
    hover: null,
    cells: cells(state.cells, action, [...ancestors, state.id])
  })

  switch (action.type) {
    case CELL_DRAG_CANCEL:
      return { ...reduce(), hover: null }

    case CELL_INSERT_LEFT_OF:
      if (!isHoveringThis(state, action)) {
        return reduce()
      }
      return {
        ...state,
        cells: inner(cells([
          ...(state.cells),
          { ...(action.item), id: action.ids[0] }
        ], action, ancestors))
      }

    case CELL_INSERT_RIGHT_OF:
      if (!isHoveringThis(state, action)) {
        return reduce()
      }
      return {
        ...state,
        cells: inner(cells([
          ...(state.cells),
          { ...(action.item), id: action.ids[0] }
        ], action, ancestors))
      }

    case CELL_DRAG_HOVER:
      if (isHoveringThis(state, action)) {
        return { ...reduce(), hover: action.position }
      }
      return reduce()

    default:
      return reduce()
  }
})(state, action, ancestors))


export const rows = (state = [], action, ancestors = []) => optimizeRows(((state, action, ancestors) => {
  const reduce = () => state.map(inner(row, action, ancestors))
  switch (action.type) {
    case CELL_INSERT_ABOVE:
      return state
        .map((r) => isHoveringThis(r, action)
          ? [{ id: action.ids[0], cells: [{ ...(action.item), id: action.ids[1] }] }, { ...r, id: action.ids[2] }]
          : [r])
        .reduce((c = [], n = []) => c.push(...n), [])
        .map(inner(row, action, ancestors))
    case CELL_INSERT_BELOW:
      return state
        .map((r) => isHoveringThis(r, action)
          ? [{ ...r, id: action.ids[2] }, { id: action.ids[0], cells: [{ ...(action.item), id: action.ids[1] }] }]
          : [r])
        .reduce((c = [], n = []) => c.push(...n), [])
        .map(inner(row, action, ancestors))

    default:
      return reduce()
  }
})(state, action, ancestors))
