/*
 * This file is part of ORY Editor.
 *
 * ORY Editor is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Lesser General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * ORY Editor is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public License
 * along with ORY Editor.  If not, see <http://www.gnu.org/licenses/>.
 *
 * @license LGPL-3.0
 * @copyright 2016-2018 Aeneas Rekkas
 * @author Aeneas Rekkas <aeneas+oss@aeneas.io>
 *
 */

// @flow
import type { Action } from '../types/redux'

export const SET_DISPLAY_MODE = 'SET_DISPLAY_MODE'
export const SET_PREVIOUS_DISPLAY_MODE = 'SET_PREVIOUS_DISPLAY_MODE'
export const DISPLAY_MODE_PREVIEW = 'preview'
export const DISPLAY_MODE_LAYOUT = 'layout'
export const DISPLAY_MODE_EDIT = 'edit'
export const DISPLAY_MODE_INSERT = 'insert'
export const DISPLAY_MODE_RESIZING = 'resizing'
export const DEFAULT_DISPLAY_MODE = DISPLAY_MODE_PREVIEW

const setDisplayMode = (
  mode: string,
  remember: boolean = false
) => (): Action => ({
  type: SET_DISPLAY_MODE,
  ts: new Date(),
  mode,
  remember
})

/**
 * Dispatch to switch to insert display mode.
 */
export const insertMode = setDisplayMode(DISPLAY_MODE_INSERT)

/**
 * Dispatch to switch to edit display mode.
 */
export const editMode = setDisplayMode(DISPLAY_MODE_EDIT)

/**
 * Dispatch to switch to preview display mode.
 */
export const previewMode = setDisplayMode(DISPLAY_MODE_PREVIEW)

/**
 * Dispatch to switch to layout display mode.
 */
export const layoutMode = setDisplayMode(DISPLAY_MODE_LAYOUT)

/**
 * Dispatch to switch to resize display mode.
 */
export const resizeMode = setDisplayMode(DISPLAY_MODE_RESIZING)

/**
 * Dispatch to switch to the last display mode, or the fallback if reverting is not possible.
 */
export const previousMode = (fallback: string): Action => ({
  type: SET_PREVIOUS_DISPLAY_MODE,
  fallback
})
