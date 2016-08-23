// @flow
import type { Action } from 'types/redux'

export const CELL_UPDATE = 'CELL_UPDATE'
export const CELL_REMOVE = 'CELL_REMOVE'
export const CELL_RESIZE = 'CELL_RESIZE'
export const CELL_FOCUS = 'CELL_FOCUS'
export const CELL_BLUR = 'CELL_BLUR'

/**
 * Dispatch to update cell data.
 */
export const updateCell = (id: string) => (props : {} = {}): Action => ({
  type: CELL_UPDATE,
  ts: new Date(),
  id,
  props
})

/**
 * Dispatch to remove a cell.
 */
export const removeCell = (id: string): Action => ({
  type: CELL_REMOVE,
  ts: new Date(),
  id
})

/**
 * Dispatch to resize a cell.
 */
export const resizeCell = (id: string) => (size : number = 1): Action => ({
  type: CELL_RESIZE,
  ts: new Date(),
  id,
  size
})

/**
 * Dispatch to focus a cell.
 */
export const focusCell = (id: string) => (): Action => ({
  type: CELL_FOCUS,
  ts: new Date(),
  id
})

/**
 * Dispatch to blur a cell.
 */
export const blurCell = (id: string) => (): Action => ({
  type: CELL_BLUR,
  ts: new Date(),
  id
})
