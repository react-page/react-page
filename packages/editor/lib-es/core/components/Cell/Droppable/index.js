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
import React, { useCallback, useEffect } from 'react';
import { useDrop } from 'react-dnd';
import { useSelector } from '../../../reduxConnect';
import { useNodeAsHoverTarget, useCellHasPlugin, useCellIsAllowedHere, useCellSpacing, useDropActions, useHoverActions, useIsInsertMode, useIsLayoutMode, useNodeHoverPosition, usePluginOfCell, useOption, useAllCellPluginsForNode, } from '../../hooks';
import { onDrop, onHover } from './helper/dnd';
export var useCellDrop = function (nodeId) {
    var _a;
    var ref = React.useRef();
    var hoverTarget = useNodeAsHoverTarget(nodeId);
    var targetParentNodeId = (_a = hoverTarget === null || hoverTarget === void 0 ? void 0 : hoverTarget.ancestorIds) === null || _a === void 0 ? void 0 : _a[0];
    var checkIfAllowed = useCellIsAllowedHere(targetParentNodeId);
    var plugin = usePluginOfCell(nodeId);
    var cellPlugins = useAllCellPluginsForNode(targetParentNodeId);
    var hoverActions = useHoverActions();
    var dropActions = useDropActions(targetParentNodeId);
    var isHoveringOverThis = useSelector(function (state) { var _a; return ((_a = state.reactPage.hover) === null || _a === void 0 ? void 0 : _a.nodeId) === nodeId; });
    var _b = __read(useDrop({
        accept: 'cell',
        canDrop: function (item) {
            var _a;
            if (!item.cell) {
                return false;
            }
            // check if plugin is allowed here
            if (!checkIfAllowed(item)) {
                return false;
            }
            if (plugin === null || plugin === void 0 ? void 0 : plugin.allowNeighbour) {
                if (!plugin.allowNeighbour(item.cell)) {
                    return false;
                }
            }
            return (item.cell.id !== nodeId &&
                !(item.cell.id && ((_a = hoverTarget === null || hoverTarget === void 0 ? void 0 : hoverTarget.ancestorIds) === null || _a === void 0 ? void 0 : _a.includes(item.cell.id))));
        },
        collect: function (monitor) { return ({
            isOver: monitor.isOver(),
            isAllowed: checkIfAllowed(monitor.getItem()),
        }); },
        hover: function (item, monitor) {
            if (!item.cell || !hoverTarget || !ref.current) {
                return false;
            }
            if (plugin === null || plugin === void 0 ? void 0 : plugin.allowNeighbour) {
                if (!plugin.allowNeighbour(item.cell)) {
                    return false;
                }
            }
            onHover(hoverTarget, monitor, ref.current, hoverActions, cellPlugins);
        },
        drop: function (item, monitor) {
            if (!hoverTarget || !ref.current) {
                return;
            }
            onDrop(hoverTarget, monitor, ref.current, dropActions, cellPlugins);
        },
    }), 2), _c = _b[0], isOver = _c.isOver, isAllowed = _c.isAllowed, dropRef = _b[1];
    useEffect(function () {
        if (!isOver && isHoveringOverThis) {
            hoverActions.clear();
        }
    }, [isOver, isHoveringOverThis, hoverActions.clear]);
    // see https://github.com/react-dnd/react-dnd/issues/1955
    var attach = useCallback(function (domElement) {
        dropRef(domElement);
        ref.current = domElement;
        // use dom element here for measuring
    }, [dropRef]);
    return [attach, isAllowed];
};
var Droppable = function (props) {
    var _a;
    var _b;
    var isLayoutMode = useIsLayoutMode();
    var isInsertMode = useIsInsertMode();
    var _c = __read(useCellDrop(props.nodeId), 2), attach = _c[0], isAllowed = _c[1];
    var hoverPosition = useNodeHoverPosition(props.nodeId);
    var allowMoveInEditMode = useOption('allowMoveInEditMode');
    var hasPlugin = useCellHasPlugin(props.nodeId);
    var cellSpacingY = ((_b = useCellSpacing()) !== null && _b !== void 0 ? _b : { y: 0 }).y;
    var needVerticalMargin = !props.isLeaf && !hasPlugin;
    if (!(isLayoutMode || isInsertMode) && !allowMoveInEditMode) {
        return (React.createElement("div", { className: 'react-page-cell-droppable-container' }, props.children));
    }
    return (React.createElement("div", { ref: attach, style: {
            height: '100%',
        }, className: "react-page-cell-droppable" },
        React.createElement("div", { style: {
                position: 'absolute',
                pointerEvents: 'none',
                top: needVerticalMargin ? "".concat(cellSpacingY / 2, "px") : 0,
                left: 0,
                bottom: needVerticalMargin ? "".concat(cellSpacingY / 2, "px") : 0,
                right: 0,
            }, className: classNames((_a = {
                    'react-page-cell-droppable-not-allowed': !isAllowed,
                    'react-page-cell-droppable-is-over-current': isAllowed && hoverPosition
                },
                _a["react-page-cell-droppable-is-over-".concat(hoverPosition)] = isAllowed && hoverPosition,
                _a['react-page-cell-droppable-leaf'] = props.isLeaf,
                _a)) }),
        props.children));
};
export default Droppable;
//# sourceMappingURL=index.js.map