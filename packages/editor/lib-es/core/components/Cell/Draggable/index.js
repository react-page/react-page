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
import { useCell, useFocusCell, useIsLayoutMode, useOption } from '../../hooks';
import { useDragHandle } from './useDragHandle';
var DefaultSmallHandle = function (_a) {
    var onClick = _a.onClick;
    return (React.createElement("div", { className: "react-page-cell-draggable-overlay-handle", onClick: onClick },
        React.createElement("div", { className: "react-page-cell-draggable-overlay-handle-icon" })));
};
var Draggable = function (_a) {
    var _b;
    var _c;
    var isLeaf = _a.isLeaf, children = _a.children, nodeId = _a.nodeId;
    var cell = useCell(nodeId);
    var _d = __read(useDragHandle(nodeId), 3), isDragging = _d[0], dragRef = _d[1], previewElement = _d[2];
    var focus = useFocusCell(nodeId);
    var isLayoutMode = useIsLayoutMode();
    var allowMoveInEditMode = useOption('allowMoveInEditMode');
    var components = useOption('components');
    var ResizeHandle = (_c = components === null || components === void 0 ? void 0 : components.EditModeResizeHandle) !== null && _c !== void 0 ? _c : DefaultSmallHandle;
    return (React.createElement(React.Fragment, null,
        previewElement,
        React.createElement("div", { ref: isLayoutMode ? dragRef : undefined, style: {
                height: '100%',
            }, className: classNames({
                'react-page-cell-draggable-in-edit': !isLayoutMode && allowMoveInEditMode,
                'react-page-cell-draggable': isLayoutMode,
                'react-page-cell-draggable-is-dragging': isDragging,
            }) },
            isLayoutMode ? (React.createElement("div", { onClick: function (e) {
                    var mode = e.metaKey || e.ctrlKey ? 'add' : 'replace';
                    focus(false, mode);
                }, className: classNames((_b = {
                        'react-page-cell-draggable-overlay': isLayoutMode
                    },
                    _b["react-page-cell-draggable-inline-".concat(cell === null || cell === void 0 ? void 0 : cell.inline)] = cell === null || cell === void 0 ? void 0 : cell.inline,
                    _b['react-page-cell-draggable-leaf'] = isLeaf,
                    _b)) })) : allowMoveInEditMode ? (React.createElement("div", { ref: dragRef },
                React.createElement(ResizeHandle, { onClick: focus }))) : null,
            children)));
};
export default Draggable;
//# sourceMappingURL=index.js.map