import { useCallback } from 'react';
import { DISPLAY_MODE_EDIT, DISPLAY_MODE_INSERT, DISPLAY_MODE_LAYOUT, DISPLAY_MODE_PREVIEW, DISPLAY_MODE_RESIZING, setMode, } from '../../actions/display';
import { useDispatch, useSelector } from '../../reduxConnect';
import { isEditMode, isInsertMode, isLayoutMode, isPreviewMode, isResizeMode, } from '../../selector/display';
/**
 * @returns true whether the editor is in edit mode
 */
export var useIsEditMode = function () {
    return useSelector(isEditMode);
};
/**
 * @returns true whether the editor is in insert mode
 */
export var useIsInsertMode = function () {
    return useSelector(isInsertMode);
};
/**
 * @returns true whether the editor is in layout mode
 */
export var useIsLayoutMode = function () {
    return useSelector(isLayoutMode);
};
/**
 * @returns true whether the editor is in preview mode mode
 */
export var useIsPreviewMode = function () {
    return useSelector(isPreviewMode);
};
/**
 * @returns true whether the editor is in resize mode mode
 */
export var useIsResizeMode = function () {
    return useSelector(isResizeMode);
};
/**
 * @returns the current display mode
 */
export var useDisplayMode = function () {
    return useSelector(function (state) { return state.reactPage.display.mode; });
};
/**
 * experimental, used internaly for the add new button.
 * @returns a referenced nodeId for the current display mode.
 *
 *
 */
export var useDisplayModeReferenceNodeId = function () {
    return useSelector(function (state) { var _a, _b; return (_b = (_a = state.reactPage) === null || _a === void 0 ? void 0 : _a.display) === null || _b === void 0 ? void 0 : _b.referenceNodeId; });
};
/**
 * @returns function to set the display mode
 */
export var useSetMode = function () {
    var dispatch = useDispatch();
    return useCallback(function (mode, referenceNodeId) {
        dispatch(setMode(mode, referenceNodeId));
    }, [dispatch]);
};
/**
 * @returns function to change to resize mode
 */
export var useSetResizeMode = function () {
    var setMode = useSetMode();
    return useCallback(function () { return setMode(DISPLAY_MODE_RESIZING); }, [setMode]);
};
/**
 * @returns function to change to edit mode mode
 */
export var useSetEditMode = function () {
    var setMode = useSetMode();
    return useCallback(function () { return setMode(DISPLAY_MODE_EDIT); }, [setMode]);
};
/**
 * @returns function to change to layout mode
 */
export var useSetLayoutMode = function () {
    var setMode = useSetMode();
    return useCallback(function () { return setMode(DISPLAY_MODE_LAYOUT); }, [setMode]);
};
/**
 * @returns function to change to insert mode
 */
export var useSetInsertMode = function () {
    var setMode = useSetMode();
    return useCallback(function () { return setMode(DISPLAY_MODE_INSERT); }, [setMode]);
};
/**
 * @returns function to change to preview mode
 */
export var useSetPreviewMode = function () {
    var setMode = useSetMode();
    return useCallback(function () { return setMode(DISPLAY_MODE_PREVIEW); }, [setMode]);
};
//# sourceMappingURL=displayMode.js.map