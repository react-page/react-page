var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
import classNames from 'classnames';
import React from 'react';
import { useMeasure } from 'react-use';
import { isRow } from '../../types/node';
import { useCellSpacing, useNodeHoverPosition, useNodeProps } from '../hooks';
import Droppable from './Droppable';
import ResizableRowCell from './ResizableRowCell';
var reduceToIdAndSizeArray = function (acc, node, index, array) {
    var _a, _b, _c, _d;
    var nextNode = array[index + 1];
    var size = isRow(node) ? 12 : (_a = node.size) !== null && _a !== void 0 ? _a : 12;
    var nextSize = !nextNode || isRow(nextNode) ? 0 : (_b = nextNode.size) !== null && _b !== void 0 ? _b : 12;
    var offset = size + ((_d = (_c = acc[index - 1]) === null || _c === void 0 ? void 0 : _c.offset) !== null && _d !== void 0 ? _d : 0);
    return __spreadArray(__spreadArray([], __read(acc), false), [
        {
            id: node.id,
            size: size,
            maxSize: size + nextSize - 1,
            offset: offset,
        },
    ], false);
};
var Row = function (_a) {
    var _b;
    var nodeId = _a.nodeId;
    var _c = __read(useMeasure(), 2), ref = _c[0], rowWidth = _c[1].width;
    var hoverPosition = useNodeHoverPosition(nodeId);
    var childrenWithOffsets = useNodeProps(nodeId, function (node) {
        var _a, _b, _c, _d;
        return isRow(node)
            ? (_b = (_a = node.cells) === null || _a === void 0 ? void 0 : _a.reduce(reduceToIdAndSizeArray, [])) !== null && _b !== void 0 ? _b : []
            : (_d = (_c = node === null || node === void 0 ? void 0 : node.rows) === null || _c === void 0 ? void 0 : _c.reduce(reduceToIdAndSizeArray, [])) !== null && _d !== void 0 ? _d : [];
    });
    var rowHasInlineChildrenPosition = useNodeProps(nodeId, function (node) { var _a; return (isRow(node) && node.cells.length === 2 && ((_a = node.cells[0]) === null || _a === void 0 ? void 0 : _a.inline)) || null; });
    var cellSpacing = useCellSpacing();
    return (React.createElement(Droppable, { nodeId: nodeId },
        React.createElement("div", { 
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            ref: ref, className: classNames('react-page-row', {
                'react-page-row-has-floating-children': Boolean(rowHasInlineChildrenPosition),
            }), style: {
                position: 'relative',
                margin: cellSpacing && cellSpacing.x !== 0
                    ? "0 ".concat(-cellSpacing.x / 2, "px")
                    : undefined,
            } },
            React.createElement("div", { style: __assign({ position: 'absolute', pointerEvents: 'none' }, (cellSpacing
                    ? {
                        top: "".concat(cellSpacing.y / 2, "px"),
                        left: "".concat(cellSpacing.x / 2, "px"),
                        bottom: "".concat(cellSpacing.y / 2, "px"),
                        right: "".concat(cellSpacing.x / 2, "px"),
                    }
                    : {})), className: classNames((_b = {
                        'react-page-row-is-hovering-this': Boolean(hoverPosition)
                    },
                    _b["react-page-row-is-hovering-".concat(hoverPosition || '')] = Boolean(hoverPosition),
                    _b)) }),
            childrenWithOffsets.map(function (_a, index) {
                var offset = _a.offset, id = _a.id, size = _a.size, maxSize = _a.maxSize;
                return (React.createElement(ResizableRowCell, { key: id, isLast: index === childrenWithOffsets.length - 1, rowWidth: rowWidth, nodeId: id, rowHasInlineChildrenPosition: rowHasInlineChildrenPosition, offset: offset, size: size, maxSize: maxSize }));
            }))));
};
export default React.memo(Row);
//# sourceMappingURL=index.js.map