// @flow
import type { Action } from '../../types/redux'

import { gen } from '../helpers'

export const CELL_UPDATE_CONTENT = 'CELL_UPDATE_CONTENT'
export const CELL_UPDATE_LAYOUT = 'CELL_UPDATE_LAYOUT'
export const CELL_REMOVE = 'CELL_REMOVE'
export const CELL_RESIZE = 'CELL_RESIZE'
export const CELL_FOCUS = 'CELL_FOCUS'
export const CELL_BLUR = 'CELL_BLUR'
export const CELL_BLUR_ALL = 'CELL_BLUR_ALL'
export const CELL_FOCUS_PREV = 'CELL_FOCUS_PREV'
export const CELL_FOCUS_NEXT = 'CELL_FOCUS_NEXT'
export const CELL_CREATE_FALLBACK = 'CELL_CREATE_FALLBACK'

/**
 * An action creator for updating a cell's content data.
 *
 * @example
 * // const store = redux.createStore()
 * // const cell = { id: '1', ... }
 * store.dispatch(updateCellContent(cell.id, { foo: 'bar' }))
 *
 * @param {string} id The id of the cell that should be updated
 * @return {Action}
 */
export const updateCellContent = (id: string) => (state: {} = {}): Action => ({
  type: CELL_UPDATE_CONTENT,
  ts: new Date(),
  id,
  state
})

/**
 * An action creator for updating a cell's layout data.
 *
 * @example
 * // const store = redux.createStore()
 * // const cell = { id: '1', ... }
 * store.dispatch(updateCellLayout(cell.id, { foo: 'bar' }))
 *
 * @param {string} id The id of the cell that should be updated
 * @return {Action}
 */
export const updateCellLayout = (id: string) => (state: {} = {}): Action => ({
  type: CELL_UPDATE_LAYOUT,
  ts: new Date(),
  id,
  state
})

/**
 * An action creator for removing a cell.
 *
 * @example
 * // const store = redux.createStore()
 * // const cell = { id: '1', ... }
 * store.dispatch(removeCell(cell.id, ['1', '2', '3', '4', ...]))
 *
 * @param {string} id The id of the cell that should be removed.
 * @param {string} ids An array of IDs for new cells that might be created.
 * @return {Action}
 */
export const removeCell = (id: string, ids: Array<string> = []): Action => ({
  type: CELL_REMOVE,
  ts: new Date(),
  id,
  ids: ids.length > 0 ? ids : gen(1)
})

/**
 * An action creator for resizing a cell.
 *
 * @example
 * // const store = redux.createStore()
 * // const cell = { id: '1', ... }
 * store.dispatch(resizeCell(cell.id)(size))
 *
 * @param {string} id The id of the cell that should be removed.
 * @param {number} size The cell's new size.
 * @return {Function}
 */
export const resizeCell = (id: string) => (size: number = 1): Action => ({
  type: CELL_RESIZE,
  ts: new Date(),
  id,
  size
})

/**
 * Dispatch to focus a cell.
 */
export const focusCell = (id: string) => (
  { source }: { source?: string } = {}
): Action => ({
  type: CELL_FOCUS,
  ts: new Date(),
  id,
  source
})

/**
 * Dispatch to focus a cell.
 */
export const focusNextCell = (id: string) => (): Action => ({
  type: CELL_FOCUS_NEXT,
  ts: new Date(),
  id
})

/**
 * Dispatch to focus a cell.
 */
export const focusPreviousCell = (id: string) => (): Action => ({
  type: CELL_FOCUS_PREV,
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

/**
 * Dispatch to blur all cells. For example when clicking on document body.
 */
export const blurAllCells = (): Action => ({
  type: CELL_BLUR_ALL,
  ts: new Date()
})

/**
 * Creates a fallback cell, usually done when an editable is empty.
 */
export const createFallbackCell = (fallback: any, editable: string) => ({
  type: CELL_CREATE_FALLBACK,
  ts: new Date(),
  editable,
  ids: gen(1),
  fallback
})
