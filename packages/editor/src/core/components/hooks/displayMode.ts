import { useCallback } from 'react';
import type { DisplayModes } from '../../actions/display';
import {
  DISPLAY_MODE_EDIT,
  DISPLAY_MODE_INSERT,
  DISPLAY_MODE_LAYOUT,
  DISPLAY_MODE_PREVIEW,
  DISPLAY_MODE_RESIZING,
  setMode,
} from '../../actions/display';
import { useDispatch, useSelector } from '../../reduxConnect';

import {
  isEditMode,
  isInsertMode,
  isLayoutMode,
  isPreviewMode,
  isResizeMode,
} from '../../selector/display';

/**
 * @returns true whether the editor is in edit mode
 */
export const useIsEditMode = () => {
  return useSelector(isEditMode);
};

/**
 * @returns true whether the editor is in insert mode
 */
export const useIsInsertMode = () => {
  return useSelector(isInsertMode);
};
/**
 * @returns true whether the editor is in layout mode
 */
export const useIsLayoutMode = () => {
  return useSelector(isLayoutMode);
};

/**
 * @returns true whether the editor is in preview mode mode
 */
export const useIsPreviewMode = () => {
  return useSelector(isPreviewMode);
};

/**
 * @returns true whether the editor is in resize mode mode
 */
export const useIsResizeMode = () => {
  return useSelector(isResizeMode);
};

/**
 * @returns the current display mode
 */
export const useDisplayMode = () => {
  return useSelector((state) => state.reactPage.display.mode);
};

/**
 * experimental, used internaly for the add new button.
 * @returns a referenced nodeId for the current display mode.
 *
 *
 */
export const useDisplayModeReferenceNodeId = () => {
  return useSelector((state) => state.reactPage?.display?.referenceNodeId);
};

/**
 * @returns function to set the display mode
 */
export const useSetMode = () => {
  const dispatch = useDispatch();

  return useCallback(
    (mode: DisplayModes, referenceNodeId?: string) => {
      dispatch(setMode(mode, referenceNodeId));
    },
    [dispatch]
  );
};

/**
 * @returns function to change to resize mode
 */
export const useSetResizeMode = () => {
  const setMode = useSetMode();
  return useCallback(() => setMode(DISPLAY_MODE_RESIZING), [setMode]);
};

/**
 * @returns function to change to edit mode mode
 */
export const useSetEditMode = () => {
  const setMode = useSetMode();
  return useCallback(() => setMode(DISPLAY_MODE_EDIT), [setMode]);
};

/**
 * @returns function to change to layout mode
 */
export const useSetLayoutMode = () => {
  const setMode = useSetMode();
  return useCallback(() => setMode(DISPLAY_MODE_LAYOUT), [setMode]);
};

/**
 * @returns function to change to insert mode
 */
export const useSetInsertMode = () => {
  const setMode = useSetMode();
  return useCallback(() => setMode(DISPLAY_MODE_INSERT), [setMode]);
};

/**
 * @returns function to change to preview mode
 */
export const useSetPreviewMode = () => {
  const setMode = useSetMode();
  return useCallback(() => setMode(DISPLAY_MODE_PREVIEW), [setMode]);
};
