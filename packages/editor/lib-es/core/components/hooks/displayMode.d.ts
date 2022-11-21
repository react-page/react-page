import type { DisplayModes } from '../../actions/display';
/**
 * @returns true whether the editor is in edit mode
 */
export declare const useIsEditMode: () => boolean;
/**
 * @returns true whether the editor is in insert mode
 */
export declare const useIsInsertMode: () => boolean;
/**
 * @returns true whether the editor is in layout mode
 */
export declare const useIsLayoutMode: () => boolean;
/**
 * @returns true whether the editor is in preview mode mode
 */
export declare const useIsPreviewMode: () => boolean;
/**
 * @returns true whether the editor is in resize mode mode
 */
export declare const useIsResizeMode: () => boolean;
/**
 * @returns the current display mode
 */
export declare const useDisplayMode: () => DisplayModes;
/**
 * experimental, used internaly for the add new button.
 * @returns a referenced nodeId for the current display mode.
 *
 *
 */
export declare const useDisplayModeReferenceNodeId: () => string | undefined;
/**
 * @returns function to set the display mode
 */
export declare const useSetMode: () => (mode: DisplayModes, referenceNodeId?: string) => void;
/**
 * @returns function to change to resize mode
 */
export declare const useSetResizeMode: () => () => void;
/**
 * @returns function to change to edit mode mode
 */
export declare const useSetEditMode: () => () => void;
/**
 * @returns function to change to layout mode
 */
export declare const useSetLayoutMode: () => () => void;
/**
 * @returns function to change to insert mode
 */
export declare const useSetInsertMode: () => () => void;
/**
 * @returns function to change to preview mode
 */
export declare const useSetPreviewMode: () => () => void;
//# sourceMappingURL=displayMode.d.ts.map