import { DISPLAY_MODE_EDIT, DISPLAY_MODE_LAYOUT, DISPLAY_MODE_PREVIEW } from 'src/editor/actions/display'

export const isPreviewMode = ({ display: { mode } }) => mode === DISPLAY_MODE_PREVIEW
export const isLayoutMode = ({ display: { mode } }) => mode === DISPLAY_MODE_LAYOUT
export const isEditMode = ({ display: { mode } }) => mode === DISPLAY_MODE_EDIT
