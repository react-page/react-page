import { DISPLAY_MODE_EDIT, DISPLAY_MODE_LAYOUT, DISPLAY_MODE_PREVIEW, DISPLAY_MODE_INSERT, DISPLAY_MODE_RESIZING, } from '../../actions/display';
export var isPreviewMode = function (_a) {
    var mode = _a.reactPage.display.mode;
    return mode === DISPLAY_MODE_PREVIEW;
};
export var isLayoutMode = function (_a) {
    var mode = _a.reactPage.display.mode;
    return mode === DISPLAY_MODE_LAYOUT;
};
export var isEditMode = function (_a) {
    var mode = _a.reactPage.display.mode;
    return mode === DISPLAY_MODE_EDIT;
};
export var isInsertMode = function (_a) {
    var mode = _a.reactPage.display.mode;
    return mode === DISPLAY_MODE_INSERT;
};
export var isResizeMode = function (_a) {
    var mode = _a.reactPage.display.mode;
    return mode === DISPLAY_MODE_RESIZING;
};
//# sourceMappingURL=index.js.map