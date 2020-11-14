import {
  DISPLAY_MODE_EDIT,
  DISPLAY_MODE_LAYOUT,
  DISPLAY_MODE_PREVIEW,
  DISPLAY_MODE_INSERT,
  DISPLAY_MODE_RESIZING,
} from '../../actions/display';

import { RootState } from '../../types/state';

export const isPreviewMode = ({
  reactPage: {
    display: { mode },
  },
}: RootState): boolean => mode === DISPLAY_MODE_PREVIEW;
export const isLayoutMode = ({
  reactPage: {
    display: { mode },
  },
}: RootState): boolean => mode === DISPLAY_MODE_LAYOUT;
export const isEditMode = ({
  reactPage: {
    display: { mode },
  },
}: RootState): boolean => mode === DISPLAY_MODE_EDIT;
export const isInsertMode = ({
  reactPage: {
    display: { mode },
  },
}: RootState): boolean => mode === DISPLAY_MODE_INSERT;
export const isResizeMode = ({
  reactPage: {
    display: { mode },
  },
}: RootState): boolean => mode === DISPLAY_MODE_RESIZING;
