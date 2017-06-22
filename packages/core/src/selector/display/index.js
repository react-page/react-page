// @flow
import {
  DISPLAY_MODE_EDIT,
  DISPLAY_MODE_LAYOUT,
  DISPLAY_MODE_PREVIEW,
  DISPLAY_MODE_INSERT,
} from '../../actions/display'

import type { Display } from '../../types/display'

export const isPreviewMode = ({
  display: { mode }
}: {
  display: Display
}): boolean => mode === DISPLAY_MODE_PREVIEW
export const isLayoutMode = ({
  display: { mode }
}: {
  display: Display
}): boolean => mode === DISPLAY_MODE_LAYOUT
export const isEditMode = ({
  display: { mode }
}: {
  display: Display
}): boolean => mode === DISPLAY_MODE_EDIT
export const isInsertMode = ({
  display: { mode }
}: {
  display: Display
}): boolean => mode === DISPLAY_MODE_INSERT
