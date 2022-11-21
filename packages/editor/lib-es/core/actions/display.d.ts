export declare const SET_DISPLAY_REFERENCE_NODE_ID = "SET_DISPLAY_REFERENCE_NODE_ID";
export declare const SET_DISPLAY_MODE = "SET_DISPLAY_MODE";
export declare const SET_PREVIOUS_DISPLAY_MODE = "SET_PREVIOUS_DISPLAY_MODE";
export declare const DISPLAY_MODE_PREVIEW = "preview";
export declare const DISPLAY_MODE_LAYOUT = "layout";
export declare const DISPLAY_MODE_EDIT = "edit";
export declare const DISPLAY_MODE_INSERT = "insert";
export declare const DISPLAY_MODE_RESIZING = "resizing";
export declare const DISPLAY_SET_ZOOM = "DISPLAY_SET_ZOOM";
export type DisplayModes = 'preview' | 'layout' | 'edit' | 'insert' | 'resizing';
export declare const DEFAULT_DISPLAY_MODE = "edit";
export type SetDisplayModeAction = {
    type: typeof SET_DISPLAY_MODE;
    ts: Date;
    mode: DisplayModes;
    referenceNodeId?: string | null;
};
export type SetZoomAction = {
    type: typeof DISPLAY_SET_ZOOM;
    zoom: number;
};
export type SetDisplayReferenceNodeIdAction = {
    type: typeof SET_DISPLAY_REFERENCE_NODE_ID;
    ts: Date;
    referenceNodeId?: string | null;
};
export type DisplayAction = SetDisplayModeAction | SetZoomAction | SetDisplayReferenceNodeIdAction;
export declare const setDisplayReferenceNodeId: (referenceNodeId?: string | null) => SetDisplayReferenceNodeIdAction;
/**
 * Dispatch to switch to arbitrary mode.
 */
export declare const setMode: (mode: DisplayModes, referenceNodeId?: string) => SetDisplayModeAction;
/**
 * Dispatch to switch to insert display mode.
 */
export declare const insertMode: () => SetDisplayModeAction;
/**
 * Dispatch to switch to edit display mode.
 */
export declare const editMode: () => SetDisplayModeAction;
/**
 * Dispatch to switch to preview display mode.
 */
export declare const previewMode: () => SetDisplayModeAction;
/**
 * Dispatch to switch to layout display mode.
 */
export declare const layoutMode: () => SetDisplayModeAction;
/**
 * Dispatch to switch to resize display mode.
 */
export declare const resizeMode: () => SetDisplayModeAction;
/**
 * Dispatch Zoom the content
 */
export declare const setZoom: (zoom: number) => SetZoomAction;
//# sourceMappingURL=display.d.ts.map