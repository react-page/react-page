var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import classNames from 'classnames';
import React, { useCallback } from 'react';
import { getCellOuterDivClassName } from '../../utils/getCellStylingProps';
import { useAllFocusedNodeIds, useCellHasPlugin, useCellProps, useCellSpacing, useIsFocused, useIsInsertMode, useIsLayoutMode, useIsPreviewMode, useIsResizeMode, useLang, useNodeHasChildren, useOption, useScrollToViewEffect, useSetDisplayReferenceNodeId, } from '../hooks';
import ErrorCell from './ErrorCell';
import Handle from './Handle';
import Inner from './Inner';
import MoveActions from './MoveActions';
import scrollIntoViewWithOffset from './utils/scrollIntoViewWithOffset';
var CellErrorGate = /** @class */ (function (_super) {
    __extends(class_1, _super);
    function class_1() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            error: null,
        };
        return _this;
    }
    class_1.prototype.componentDidCatch = function (error) {
        this.setState({ error: error });
    };
    class_1.prototype.render = function () {
        if (this.state.error) {
            return React.createElement(ErrorCell, { nodeId: this.props.nodeId, error: this.state.error });
        }
        return this.props.children;
    };
    return class_1;
}(React.Component));
var Cell = function (_a) {
    var _b;
    var nodeId = _a.nodeId, measureRef = _a.measureRef;
    var focused = useIsFocused(nodeId);
    var _c = useCellProps(nodeId, function (node) {
        var _a;
        return {
            inline: node === null || node === void 0 ? void 0 : node.inline,
            hasInlineNeighbour: node === null || node === void 0 ? void 0 : node.hasInlineNeighbour,
            isDraft: node === null || node === void 0 ? void 0 : node.isDraft,
            isDraftI18n: node === null || node === void 0 ? void 0 : node.isDraftI18n,
            size: (_a = node === null || node === void 0 ? void 0 : node.size) !== null && _a !== void 0 ? _a : 12,
        };
    }), inline = _c.inline, hasInlineNeighbour = _c.hasInlineNeighbour, isDraft = _c.isDraft, isDraftI18n = _c.isDraftI18n, size = _c.size;
    var lang = useLang();
    var isPreviewMode = useIsPreviewMode();
    var isResizeMode = useIsResizeMode();
    var isLayoutMode = useIsLayoutMode();
    var isInsertMode = useIsInsertMode();
    var multiNodesSelected = useAllFocusedNodeIds().length > 1;
    var hasChildren = useNodeHasChildren(nodeId);
    var showMoveButtons = useOption('showMoveButtonsInLayoutMode');
    var hasPlugin = useCellHasPlugin(nodeId);
    var cellSpacing = useCellSpacing();
    var needVerticalPadding = !hasChildren || hasPlugin;
    var isDraftInLang = (_b = isDraftI18n === null || isDraftI18n === void 0 ? void 0 : isDraftI18n[lang]) !== null && _b !== void 0 ? _b : isDraft;
    var ref = React.useRef(null);
    var setReferenceNodeId = useSetDisplayReferenceNodeId();
    var onClick = useCallback(function (e) {
        if (isInsertMode) {
            e.stopPropagation();
            setReferenceNodeId(nodeId);
        }
    }, [nodeId, isInsertMode, setReferenceNodeId]);
    useScrollToViewEffect(nodeId, function () {
        if (ref.current)
            scrollIntoViewWithOffset(ref.current, 120); // 120 is just a sane default, we might make int configurable in the future
    }, [ref.current]);
    if (isDraftInLang && isPreviewMode) {
        return null;
    }
    var cellOuterStlye = cellSpacing && (cellSpacing.y !== 0 || cellSpacing.x !== 0)
        ? {
            padding: "".concat(needVerticalPadding ? cellSpacing.y / 2 : 0, "px ").concat(cellSpacing.x / 2, "px"),
        }
        : undefined;
    return (React.createElement("div", { style: cellOuterStlye, ref: ref, className: getCellOuterDivClassName({
            hasChildren: hasChildren,
            hasInlineNeighbour: hasInlineNeighbour,
            size: size,
            inline: inline,
        }) +
            ' ' +
            classNames({
                'react-page-cell-has-plugin': hasPlugin,
                'react-page-cell-focused': focused,
                'react-page-cell-is-draft': isDraftInLang,
                'react-page-cell-bring-to-front': !isResizeMode && !isLayoutMode && inline, // inline must not be active for resize/layout
            }), onClick: onClick },
        React.createElement(Handle, { nodeId: nodeId }),
        showMoveButtons &&
            isLayoutMode &&
            !hasChildren &&
            !multiNodesSelected ? (React.createElement(MoveActions, { nodeId: nodeId })) : null,
        React.createElement("div", { 
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            ref: measureRef, style: {
                height: '100%',
                boxSizing: 'border-box',
            } },
            React.createElement(CellErrorGate, { nodeId: nodeId },
                React.createElement(Inner, { nodeId: nodeId })))));
};
export default React.memo(Cell);
//# sourceMappingURL=index.js.map