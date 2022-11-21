import { useMemo } from 'react';
import { isRow } from '../../../core/types';
import { useIsEditMode } from './displayMode';
import { useDropActions } from './dragDropActions';
import { useNodeAsHoverTarget, useNodeProps } from './node';
import { findSiblingRow } from './utils/findSiblingRow';
export var getTargetIndexForUpAndDownMove = function (currentRowLength, targetRowLength, myIndex) {
    if (myIndex === void 0) { myIndex = 0; }
    var factor = (targetRowLength + 1) / currentRowLength;
    var target = myIndex * factor;
    var wasLast = myIndex === currentRowLength - 1;
    var index = wasLast
        ? targetRowLength - 1
        : Math.min(Math.floor(target), targetRowLength - 1);
    return {
        action: wasLast || target - index > 0.5 ? 'rightOf' : 'leftOf',
        index: index,
    };
};
var useMoveCellAction = function (nodeId, selector) {
    var actions = useDropActions(nodeId);
    var _a = useNodeProps(nodeId, selector), node = _a.node, _b = _a.targetNodeId, targetNodeId = _b === void 0 ? null : _b, action = _a.action;
    var isEditMode = useIsEditMode();
    var hoverTarget = useNodeAsHoverTarget(targetNodeId);
    return useMemo(function () {
        // skip if no target
        if (!hoverTarget || !node) {
            return null;
        }
        return function () {
            actions[action](node, hoverTarget, { focusAfter: isEditMode });
        };
    }, [isEditMode, actions, hoverTarget, node]);
};
export var useMoveNodeUp = function (nodeId) {
    return useMoveCellAction(nodeId, function (node, ancestors) {
        var _a, _b, _c, _d;
        // if node is not the only sibling in the row, put it above the row to stretch it
        var rowWithMoreThanOneCell = searchAncestorRows(ancestors, function (row) {
            if ((row === null || row === void 0 ? void 0 : row.cells.length) > 1) {
                return row;
            }
            return null;
        }, 
        // breakIf
        // break if a parent row is not the first row of a cell, because then we would "jump" a parent
        function (row, parentOfRow) {
            var _a, _b;
            return ((_b = (row &&
                parentOfRow &&
                ((_a = parentOfRow === null || parentOfRow === void 0 ? void 0 : parentOfRow.rows) === null || _a === void 0 ? void 0 : _a.findIndex(function (r) { return r.id === row.id; })) !== 0)) !== null && _b !== void 0 ? _b : false);
        });
        if (rowWithMoreThanOneCell) {
            return {
                action: 'above',
                node: node,
                targetNodeId: rowWithMoreThanOneCell === null || rowWithMoreThanOneCell === void 0 ? void 0 : rowWithMoreThanOneCell.id,
            };
        }
        var parent = isRow(ancestors === null || ancestors === void 0 ? void 0 : ancestors[0]) ? ancestors === null || ancestors === void 0 ? void 0 : ancestors[0] : null;
        // else move it into previous row as sibling
        var myIndexInParent = parent === null || parent === void 0 ? void 0 : parent.cells.findIndex(function (c) { return c.id === nodeId; });
        var previousRow = findSiblingRow(nodeId, ancestors, 'previous');
        var previousRowCells = previousRow === null || previousRow === void 0 ? void 0 : previousRow.cells;
        var _e = getTargetIndexForUpAndDownMove((_b = (_a = parent === null || parent === void 0 ? void 0 : parent.cells) === null || _a === void 0 ? void 0 : _a.length) !== null && _b !== void 0 ? _b : 0, (_c = previousRowCells === null || previousRowCells === void 0 ? void 0 : previousRowCells.length) !== null && _c !== void 0 ? _c : 0, myIndexInParent), index = _e.index, action = _e.action;
        return {
            action: action,
            node: node,
            targetNodeId: (_d = previousRowCells === null || previousRowCells === void 0 ? void 0 : previousRowCells[index]) === null || _d === void 0 ? void 0 : _d.id,
        };
    });
};
export var useMoveNodeDown = function (nodeId) {
    return useMoveCellAction(nodeId, function (node, ancestors) {
        var _a, _b, _c, _d, _e;
        // if node is not the only sibling in the row, put it below the row to stretch it
        var rowWithMoreThanOneCell = searchAncestorRows(ancestors, function (row) {
            if ((row === null || row === void 0 ? void 0 : row.cells.length) > 1) {
                return row;
            }
            return null;
        }, 
        // breakIf
        // break if a parent row is not the last row of a cell, because then we would "jump" a parent
        function (row, parentOfRow) {
            var _a, _b, _c, _d;
            return ((_d = (row &&
                parentOfRow &&
                ((_a = parentOfRow === null || parentOfRow === void 0 ? void 0 : parentOfRow.rows) === null || _a === void 0 ? void 0 : _a.findIndex(function (r) { return r.id === row.id; })) !==
                    ((_c = (_b = parentOfRow.rows) === null || _b === void 0 ? void 0 : _b.length) !== null && _c !== void 0 ? _c : 0) - 1)) !== null && _d !== void 0 ? _d : false);
        });
        if (rowWithMoreThanOneCell) {
            return {
                action: 'below',
                node: node,
                targetNodeId: rowWithMoreThanOneCell === null || rowWithMoreThanOneCell === void 0 ? void 0 : rowWithMoreThanOneCell.id,
            };
        }
        // else move it into next row as sibling
        var parent = isRow(ancestors === null || ancestors === void 0 ? void 0 : ancestors[0]) ? ancestors === null || ancestors === void 0 ? void 0 : ancestors[0] : null;
        var nextRow = findSiblingRow(nodeId, ancestors, 'next');
        var myIndexInParent = (_a = parent === null || parent === void 0 ? void 0 : parent.cells.findIndex(function (c) { return c.id === nodeId; })) !== null && _a !== void 0 ? _a : 0;
        var nextRowCells = nextRow === null || nextRow === void 0 ? void 0 : nextRow.cells;
        var _f = getTargetIndexForUpAndDownMove((_c = (_b = parent === null || parent === void 0 ? void 0 : parent.cells) === null || _b === void 0 ? void 0 : _b.length) !== null && _c !== void 0 ? _c : 0, (_d = nextRowCells === null || nextRowCells === void 0 ? void 0 : nextRowCells.length) !== null && _d !== void 0 ? _d : 0, myIndexInParent), index = _f.index, action = _f.action;
        return {
            action: action,
            node: node,
            targetNodeId: (_e = nextRowCells === null || nextRowCells === void 0 ? void 0 : nextRowCells[index]) === null || _e === void 0 ? void 0 : _e.id,
        };
    });
};
var searchAncestorRows = function (ancestors, find, breakIf) {
    for (var i = 0; i < ancestors.length; i++) {
        var parent_1 = ancestors[i];
        var greatParent = ancestors[i + 1];
        var parentRow = isRow(parent_1) ? parent_1 : null;
        var greatParentCell = greatParent && isRow(greatParent) ? null : greatParent;
        if (parentRow) {
            var found = find(parentRow, greatParentCell);
            if (found)
                return found;
        }
        if (breakIf && breakIf(parentRow, greatParentCell)) {
            return null;
        }
    }
    return null;
};
export var useMoveNodeLeft = function (nodeId) {
    return useMoveCellAction(nodeId, function (node, ancestors) {
        var previousSibling = searchAncestorRows(ancestors, function (row) {
            var myIndexInParent = row === null || row === void 0 ? void 0 : row.cells.findIndex(function (c) { return c.id === nodeId; });
            return row === null || row === void 0 ? void 0 : row.cells[myIndexInParent - 1];
        });
        return {
            action: 'leftOf',
            node: node,
            targetNodeId: previousSibling === null || previousSibling === void 0 ? void 0 : previousSibling.id,
        };
    });
};
export var useMoveNodeRight = function (nodeId) {
    return useMoveCellAction(nodeId, function (node, ancestors) {
        var nextSibling = searchAncestorRows(ancestors, function (row) {
            var myIndexInParent = row === null || row === void 0 ? void 0 : row.cells.findIndex(function (c) { return c.id === nodeId; });
            return row === null || row === void 0 ? void 0 : row.cells[myIndexInParent + 1];
        });
        return {
            action: 'rightOf',
            node: node,
            targetNodeId: nextSibling === null || nextSibling === void 0 ? void 0 : nextSibling.id,
        };
    });
};
//# sourceMappingURL=nodeMove.js.map