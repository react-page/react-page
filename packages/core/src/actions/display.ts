import { Action } from 'redux';

export const SET_DISPLAY_MODE = 'SET_DISPLAY_MODE';
export const SET_PREVIOUS_DISPLAY_MODE = 'SET_PREVIOUS_DISPLAY_MODE';
export const DISPLAY_MODE_PREVIEW = 'preview';
export const DISPLAY_MODE_LAYOUT = 'layout';
export const DISPLAY_MODE_EDIT = 'edit';
export const DISPLAY_MODE_INSERT = 'insert';
export const DISPLAY_MODE_RESIZING = 'resizing';
export type DisplayModes =
  | 'preview'
  | 'layout'
  | 'edit'
  | 'insert'
  | 'resizing';

export const DEFAULT_DISPLAY_MODE = DISPLAY_MODE_EDIT;

export interface SetDisplayModeAction extends Action {
  ts: Date;
  mode: DisplayModes;
  remember: boolean;
}
const setDisplayMode = (
  mode: DisplayModes,
  remember = false
) => (): SetDisplayModeAction => ({
  type: SET_DISPLAY_MODE,
  ts: new Date(),
  mode,
  remember,
});

/**
 * Dispatch to switch to arbitrary mode.
 */
export const setMode = (
  mode: DisplayModes,
  remember = false
): SetDisplayModeAction => ({
  type: SET_DISPLAY_MODE,
  ts: new Date(),
  mode,
  remember,
});

/**
 * Dispatch to switch to insert display mode.
 */
export const insertMode = setDisplayMode(DISPLAY_MODE_INSERT);

/**
 * Dispatch to switch to edit display mode.
 */
export const editMode = setDisplayMode(DISPLAY_MODE_EDIT);

/**
 * Dispatch to switch to preview display mode.
 */
export const previewMode = setDisplayMode(DISPLAY_MODE_PREVIEW);

/**
 * Dispatch to switch to layout display mode.
 */
export const layoutMode = setDisplayMode(DISPLAY_MODE_LAYOUT);

/**
 * Dispatch to switch to resize display mode.
 */
export const resizeMode = setDisplayMode(DISPLAY_MODE_RESIZING);

export interface PreviousModeAction extends Action {
  fallback: DisplayModes;
}
/**
 * Dispatch to switch to the last display mode, or the fallback if reverting is not possible.
 */
export const previousMode = (fallback: DisplayModes): PreviousModeAction => ({
  type: SET_PREVIOUS_DISPLAY_MODE,
  fallback,
});
