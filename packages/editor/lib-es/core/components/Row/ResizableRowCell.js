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
import React from 'react';
import Draggable from 'react-draggable';
import { useMeasure } from 'react-use';
import Cell from '../Cell';
import { useIsEditMode, useIsPreviewMode, useIsResizeMode, useResizeCell, useCellSpacing, useOption, } from '../hooks';
var ResizableRowCell = function (_a) {
    var _b;
    var nodeId = _a.nodeId, rowWidth = _a.rowWidth, rowHasInlineChildrenPosition = _a.rowHasInlineChildrenPosition, isLast = _a.isLast, offset = _a.offset, size = _a.size, maxSize = _a.maxSize;
    var stepWidth = rowWidth / 12; // we're going to keep it a real number to preserve some precision
    var allowResizeInEditMode = useOption('allowResizeInEditMode');
    var isResizeMode = useIsResizeMode();
    var isEditMode = useIsEditMode();
    var isPreviewMode = useIsPreviewMode();
    var resize = useResizeCell(nodeId);
    var _c = __read(useMeasure(), 2), ref = _c[0], cellHeight = _c[1].height;
    var cellSpacingY = ((_b = useCellSpacing()) !== null && _b !== void 0 ? _b : { y: 0 }).y;
    var showResizeHandle = !isPreviewMode &&
        !isLast &&
        (isResizeMode || (allowResizeInEditMode && isEditMode));
    return (React.createElement(React.Fragment, null,
        React.createElement(Cell, { nodeId: nodeId, measureRef: ref }),
        showResizeHandle ? (React.createElement(Draggable, { bounds: {
                top: 0,
                bottom: 0,
                left: Math.round(stepWidth),
                right: Math.round(rowWidth - stepWidth),
            }, position: {
                x: rowHasInlineChildrenPosition === 'right'
                    ? Math.round(stepWidth * (12 - offset))
                    : Math.round(stepWidth * offset),
                y: 0,
            }, axis: "x", onDrag: function (e, data) {
                var diff = Math.round(data.deltaX / stepWidth);
                var newSize = rowHasInlineChildrenPosition === 'right'
                    ? size - diff
                    : size + diff;
                if (newSize > 0 && newSize <= maxSize)
                    resize(newSize);
            }, grid: [Math.round(stepWidth), 0] },
            React.createElement("div", { className: "resize-handle", style: {
                    // fix floating style
                    height: rowHasInlineChildrenPosition ? cellHeight : 'auto',
                    margin: cellSpacingY !== 0 ? "".concat(cellSpacingY / 2, "px 0") : undefined,
                }, onClick: function (e) { return e.stopPropagation(); } }))) : null));
};
export default React.memo(ResizableRowCell);
//# sourceMappingURL=ResizableRowCell.js.map