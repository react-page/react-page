export const SET_DISPLAY_MODE = 'SET_DISPLAY_MODE'
export const DISPLAY_MODE_PREVIEW = 'preview'
export const DISPLAY_MODE_LAYOUT = 'layout'
export const DISPLAY_MODE_EDIT = 'edit'
export const DEFAULT_DISPLAY_MODE = 'DISPLAY_MODE_PREVIEW'

const setDisplayMode = (mode) => () => ({
  type: SET_DISPLAY_MODE,
  ts: new Date(),
  mode
})

export const editMode = setDisplayMode(DISPLAY_MODE_EDIT)
export const previewMode = setDisplayMode(DISPLAY_MODE_PREVIEW)
export const layoutMode = setDisplayMode(DISPLAY_MODE_LAYOUT)
