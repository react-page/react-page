export const SET_DISPLAY_MODE = 'SET_DISPLAY_MODE'

const setDisplayMode = (mode) => () => ({
  type: SET_DISPLAY_MODE,
  mode
})

export const editMode = setDisplayMode('edit')
export const previewMode = setDisplayMode('preview')
export const layoutMode = setDisplayMode('layout')
