export var SET_DISPLAY_REFERENCE_NODE_ID = 'SET_DISPLAY_REFERENCE_NODE_ID';
export var SET_DISPLAY_MODE = 'SET_DISPLAY_MODE';
export var SET_PREVIOUS_DISPLAY_MODE = 'SET_PREVIOUS_DISPLAY_MODE';
export var DISPLAY_MODE_PREVIEW = 'preview';
export var DISPLAY_MODE_LAYOUT = 'layout';
export var DISPLAY_MODE_EDIT = 'edit';
export var DISPLAY_MODE_INSERT = 'insert';
export var DISPLAY_MODE_RESIZING = 'resizing';
export var DISPLAY_SET_ZOOM = 'DISPLAY_SET_ZOOM';
export var DEFAULT_DISPLAY_MODE = DISPLAY_MODE_EDIT;
var setDisplayMode = function (mode, referenceNodeId) {
    return function () { return ({
        type: SET_DISPLAY_MODE,
        ts: new Date(),
        mode: mode,
        referenceNodeId: referenceNodeId,
    }); };
};
export var setDisplayReferenceNodeId = function (referenceNodeId) { return ({
    type: SET_DISPLAY_REFERENCE_NODE_ID,
    ts: new Date(),
    referenceNodeId: referenceNodeId,
}); };
/**
 * Dispatch to switch to arbitrary mode.
 */
export var setMode = function (mode, referenceNodeId) { return ({
    type: SET_DISPLAY_MODE,
    ts: new Date(),
    mode: mode,
    referenceNodeId: referenceNodeId,
}); };
/**
 * Dispatch to switch to insert display mode.
 */
export var insertMode = setDisplayMode(DISPLAY_MODE_INSERT);
/**
 * Dispatch to switch to edit display mode.
 */
export var editMode = setDisplayMode(DISPLAY_MODE_EDIT);
/**
 * Dispatch to switch to preview display mode.
 */
export var previewMode = setDisplayMode(DISPLAY_MODE_PREVIEW);
/**
 * Dispatch to switch to layout display mode.
 */
export var layoutMode = setDisplayMode(DISPLAY_MODE_LAYOUT);
/**
 * Dispatch to switch to resize display mode.
 */
export var resizeMode = setDisplayMode(DISPLAY_MODE_RESIZING);
/**
 * Dispatch Zoom the content
 */
export var setZoom = function (zoom) { return ({
    type: DISPLAY_SET_ZOOM,
    zoom: zoom,
}); };
//# sourceMappingURL=display.js.map