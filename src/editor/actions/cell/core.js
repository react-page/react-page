// @flow
import type { Action } from 'types/redux'

export const CELL_UPDATE_CONTENT = 'CELL_UPDATE_CONTENT'
export const CELL_UPDATE_LAYOUT = 'CELL_UPDATE_LAYOUT'
export const CELL_REMOVE = 'CELL_REMOVE'
export const CELL_RESIZE = 'CELL_RESIZE'
export const CELL_FOCUS = 'CELL_FOCUS'
export const CELL_BLUR = 'CELL_BLUR'

/**
 * Dispatch to update cell content data.
 */
export const updateCellContent = (id: string) => (state : {} = {}): Action => ({
  type: CELL_UPDATE_CONTENT,
  ts: new Date(),
  id,
  state
})

/**
 * Dispatch to update cell content data.
 */
export const updateCellLayout = (id: string) => (state : {} = {}): Action => ({
  type: CELL_UPDATE_LAYOUT,
  ts: new Date(),
  id,
  state
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
