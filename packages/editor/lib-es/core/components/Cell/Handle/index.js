var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
import classNames from 'classnames';
import React from 'react';
import { useFocusCell, useIsLayoutMode, useOption, usePluginOfCell, useUiTranslator, } from '../../hooks';
import { useDragHandle } from '../Draggable/useDragHandle';
var Handle = function (_a) {
    var nodeId = _a.nodeId;
    var allowMoveInEditMode = useOption('allowMoveInEditMode');
    var isLayoutMode = useIsLayoutMode();
    var dragEnabled = allowMoveInEditMode || isLayoutMode;
    var _b = __read(useDragHandle(nodeId, dragEnabled), 3), isDragging = _b[0], dragRef = _b[1], previewElement = _b[2];
    var focus = useFocusCell(nodeId);
    var plugin = usePluginOfCell(nodeId);
    var t = useUiTranslator().t;
    if (!plugin) {
        return null;
    }
    return (React.createElement(React.Fragment, null,
        previewElement,
        React.createElement("div", { className: classNames('react-page-cell-handle', {
                'react-page-cell-handle-drag-enabled': dragEnabled,
                'react-page-cell-handle-is-dragging': isDragging,
            }), ref: dragRef, onClick: function (e) {
                var mode = e.metaKey || e.ctrlKey ? 'add' : 'replace';
                focus(false, mode);
            } }, t((plugin === null || plugin === void 0 ? void 0 : plugin.title) || (plugin === null || plugin === void 0 ? void 0 : plugin.text)))));
};
export default React.memo(Handle);
//# sourceMappingURL=index.js.map