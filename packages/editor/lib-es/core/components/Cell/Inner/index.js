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
import React from 'react';
import { getPluginCellSpacing, normalizeCellSpacing, } from '../../../utils/getCellSpacing';
import { useCellData, useCellHasPlugin, useCellInnerDivStylingProps, useCellSpacing, useCellSpacingProvider, useFocusCell, useIsEditMode, useIsFocused, useIsPreviewMode, useNodeChildrenIds, useOption, usePluginOfCell, useSetEditMode, } from '../../hooks';
import Row from '../../Row';
import Draggable from '../Draggable';
import Droppable from '../Droppable';
import InsertNew from '../InsertNew';
import PluginComponent from '../PluginComponent';
var Inner = function (_a) {
    var _b, _c, _d, _e, _f, _g;
    var nodeId = _a.nodeId;
    var isPreviewMode = useIsPreviewMode();
    var isEditMode = useIsEditMode();
    var cellShouldHavePlugin = useCellHasPlugin(nodeId);
    var plugin = usePluginOfCell(nodeId);
    var setEditMode = useSetEditMode();
    var focus = useFocusCell(nodeId);
    var focused = useIsFocused(nodeId);
    var childrenIds = useNodeChildrenIds(nodeId);
    var cellSpacing = useCellSpacing();
    var ref = React.useRef(null);
    var hasChildren = childrenIds.length > 0;
    var data = useCellData(nodeId);
    var pluginCellSpacing = getPluginCellSpacing(plugin, data);
    var _h = __read(useCellSpacingProvider(pluginCellSpacing), 2), Provider = _h[0], providerValue = _h[1];
    var cellSpacingY = 0;
    if (typeof pluginCellSpacing !== 'undefined' && pluginCellSpacing != null) {
        cellSpacingY = (_c = (_b = normalizeCellSpacing(pluginCellSpacing)) === null || _b === void 0 ? void 0 : _b.y) !== null && _c !== void 0 ? _c : 0;
    }
    else {
        cellSpacingY = (_d = cellSpacing === null || cellSpacing === void 0 ? void 0 : cellSpacing.y) !== null && _d !== void 0 ? _d : 0;
    }
    var onClick = React.useCallback(function (e) {
        var _a, _b;
        var target = e.target;
        // check whether the click was inside cell-inner, but not inside a nested cell
        if (!focused &&
            isEditMode &&
            // this arrives when they stop resizing
            !((_a = target.classList) === null || _a === void 0 ? void 0 : _a.contains('react-page-row')) &&
            (target === null || target === void 0 ? void 0 : target.closest) &&
            target.closest('.react-page-cell-inner') === ref.current &&
            target.closest('.react-page-cell.react-page-cell-has-plugin') ===
                ((_b = ref.current) === null || _b === void 0 ? void 0 : _b.closest('.react-page-cell'))) {
            var mode = e.metaKey || e.ctrlKey ? 'add' : 'replace';
            focus(false, mode);
            setEditMode();
        }
    }, [focus, focused, isEditMode, setEditMode]);
    var insertAllowed = ((_e = plugin === null || plugin === void 0 ? void 0 : plugin.childConstraints) === null || _e === void 0 ? void 0 : _e.maxChildren)
        ? ((_f = plugin === null || plugin === void 0 ? void 0 : plugin.childConstraints) === null || _f === void 0 ? void 0 : _f.maxChildren) > childrenIds.length
        : true;
    var innerDivProps = useCellInnerDivStylingProps(nodeId);
    var children = childrenIds.map(function (id) { return React.createElement(Row, { nodeId: id, key: id }); });
    var components = useOption('components');
    var InsertNewWithDefault = (_g = components === null || components === void 0 ? void 0 : components.InsertNew) !== null && _g !== void 0 ? _g : InsertNew;
    if (!cellShouldHavePlugin) {
        return React.createElement(Droppable, { nodeId: nodeId }, children);
    }
    return (React.createElement(Droppable, { nodeId: nodeId, isLeaf: !hasChildren },
        React.createElement(Draggable, { nodeId: nodeId, isLeaf: !hasChildren },
            React.createElement("div", __assign({ onClick: !isPreviewMode ? onClick : undefined, tabIndex: -1, ref: ref }, innerDivProps),
                React.createElement(PluginComponent, { nodeId: nodeId, hasChildren: hasChildren },
                    hasChildren ? (React.createElement(Provider, { value: providerValue },
                        React.createElement("div", { style: cellSpacingY !== 0
                                ? { margin: "".concat(-cellSpacingY / 2, "px 0") }
                                : undefined }, children))) : (children),
                    insertAllowed ? (React.createElement(InsertNewWithDefault, { parentCellId: nodeId, childrenIds: childrenIds })) : null)))));
};
export default React.memo(Inner);
//# sourceMappingURL=index.js.map