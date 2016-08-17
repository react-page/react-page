export const SET_DISPLAY_MODE = 'SET_DISPLAY_MODE'
export const SET_PREVIOUS_DISPLAY_MODE = 'SET_PREVIOUS_DISPLAY_MODE'

export const DISPLAY_MODE_PREVIEW = 'preview'
export const DISPLAY_MODE_LAYOUT = 'layout'
export const DISPLAY_MODE_EDIT = 'edit'
export const DISPLAY_MODE_INSERT = 'insert'
export const DISPLAY_MODE_RESIZING = 'resizing'
export const DEFAULT_DISPLAY_MODE = DISPLAY_MODE_PREVIEW

const setDisplayMode = (mode, remember = true) => () => ({
  type: SET_DISPLAY_MODE,
  ts: new Date(),
  mode,
  remember
})

export const insertMode = setDisplayMode(DISPLAY_MODE_INSERT)

export const editMode = setDisplayMode(DISPLAY_MODE_EDIT)

export const previewMode = setDisplayMode(DISPLAY_MODE_PREVIEW)

export const layoutMode = setDisplayMode(DISPLAY_MODE_LAYOUT)

export const resizeMode = setDisplayMode(DISPLAY_MODE_RESIZING, false)

export const previousMode = (fallback) => ({ type: SET_PREVIOUS_DISPLAY_MODE, fallback })
