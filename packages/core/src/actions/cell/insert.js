// @flow
import uuid from 'uuid'
import type { Action } from '../../types/redux'
import type { Cell } from '../../types/editable'

export const CELL_INSERT_ABOVE = 'CELL_INSERT_ABOVE'
export const CELL_INSERT_BELOW = 'CELL_INSERT_BELOW'
export const CELL_INSERT_LEFT_OF = 'CELL_INSERT_LEFT_OF'
export const CELL_INSERT_RIGHT_OF = 'CELL_INSERT_RIGHT_OF'
export const CELL_INSERT_INLINE_LEFT = 'CELL_INSERT_INLINE_LEFT'
export const CELL_INSERT_INLINE_RIGHT = 'CELL_INSERT_INLINE_RIGHT'

const gen = (c: number = 1) => {
  const ret = []
  for (let i = 0; i <= c; i++) {
    ret.push(uuid.v4())
  }
  return ret
}

const insert = (type: string) => (
  item: Cell,
  { id: hover, inline, hasInlineNeighbour }: Cell,
  level: number = 0,
  ids: Array<string> = []
): Action => {
  let l = level
  switch (type) {
    case CELL_INSERT_ABOVE:
    case CELL_INSERT_BELOW: {
      if ((inline || hasInlineNeighbour) && level < 1) {
        l = 1
      }
      break
    }

    case CELL_INSERT_LEFT_OF:
    case CELL_INSERT_RIGHT_OF: {
      if ((inline || hasInlineNeighbour) && level < 1) {
        l = 1
      }
      break
    }
    default:
  }

  return {
    type,
    ts: new Date(),
    item,
    hover,
    level: l,
    ids: ids.length > 0 ? ids : gen(5)
  }
}

/**
 * Insert a cell below of the hovering cell.
 */
export const insertCellBelow = insert(CELL_INSERT_BELOW)

/**
 * Insert a cell above of the hovering cell.
 */
export const insertCellAbove = insert(CELL_INSERT_ABOVE)

/**
 * Insert a cell right of the hovering cell.
 */
export const insertCellRightOf = insert(CELL_INSERT_RIGHT_OF)

/**
 * Insert a cell left of the hovering cell.
 */
export const insertCellLeftOf = insert(CELL_INSERT_LEFT_OF)

/**
 * Insert a cell inside the hovering cell, on the left.
 */
export const insertCellLeftInline = insert(CELL_INSERT_INLINE_LEFT)

/**
 * Insert a cell inside the hovering cell, on the right.
 */
export const insertCellRightInline = insert(CELL_INSERT_INLINE_RIGHT)
