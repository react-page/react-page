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
import React, { useMemo } from 'react';
import { BottomToolbar } from '../../../../ui';
import { usePluginOfCell, useDebouncedCellData, useIsEditMode, useIsPreviewMode, useLang, useRemoveCell, useCellProps, useOption, useIsExclusivlyFocused, } from '../../hooks';
import PluginControls from '../PluginControls';
import PluginMissing from '../PluginMissing';
import NoopProvider from '../NoopProvider';
var PluginComponent = function (_a) {
    var _b, _c;
    var nodeId = _a.nodeId, children = _a.children, hasChildren = _a.hasChildren;
    var lang = useLang();
    var components = useOption('components');
    var CustomPluginMissing = components === null || components === void 0 ? void 0 : components.CellPluginMissing;
    var isPreviewMode = useIsPreviewMode();
    var isEditMode = useIsEditMode();
    var _d = __read(useDebouncedCellData(nodeId), 2), data = _d[0], onChange = _d[1];
    var pluginId = useCellProps(nodeId, function (c) { var _a; return (_a = c === null || c === void 0 ? void 0 : c.plugin) === null || _a === void 0 ? void 0 : _a.id; });
    var plugin = usePluginOfCell(nodeId);
    var focused = useIsExclusivlyFocused(nodeId);
    var hasInlineNeighbour = useCellProps(nodeId, function (c) { return c === null || c === void 0 ? void 0 : c.hasInlineNeighbour; });
    var Renderer = plugin === null || plugin === void 0 ? void 0 : plugin.Renderer;
    var Missing = CustomPluginMissing !== null && CustomPluginMissing !== void 0 ? CustomPluginMissing : PluginMissing;
    var Provider = (_b = plugin === null || plugin === void 0 ? void 0 : plugin.Provider) !== null && _b !== void 0 ? _b : NoopProvider;
    var remove = useRemoveCell(nodeId);
    var Toolbar = (_c = components === null || components === void 0 ? void 0 : components.BottomToolbar) !== null && _c !== void 0 ? _c : BottomToolbar;
    var componentProps = useMemo(function () { return ({
        nodeId: nodeId,
        lang: lang,
        data: data,
        pluginConfig: plugin,
        focused: isEditMode && focused,
        readOnly: !isEditMode,
        onChange: onChange,
        isEditMode: isEditMode,
        isPreviewMode: isPreviewMode,
        remove: remove,
    }); }, [
        nodeId,
        lang,
        data,
        plugin,
        isEditMode,
        focused,
        onChange,
        isEditMode,
        isPreviewMode,
        remove,
    ]);
    // In case of non-zero cell spacing, nested layouts (layout plugins with children) should have their
    // margin collapsing functionality off. The simplest solution is to use display:flex for the below wrapping <div>.
    // This however is not compatible with inline elements flotation, so if a cell has inline neighbors, we are going
    // to have to keep display:block style. Layout plugins with inline cell support will have to take care of
    // margin collapsing internally on their own.
    var display = hasInlineNeighbour
        ? {}
        : {
            display: 'flex',
            flexDirection: 'column',
        };
    return (React.createElement(Provider, __assign({}, componentProps),
        React.createElement(React.Fragment, null,
            React.createElement("div", { style: __assign(__assign({}, display), { height: '100%', pointerEvents: !isPreviewMode &&
                        plugin &&
                        !(plugin === null || plugin === void 0 ? void 0 : plugin.allowClickInside) &&
                        !hasChildren
                        ? 'none'
                        : undefined }) }, Renderer ? (React.createElement(Renderer, __assign({}, componentProps), children)) : pluginId ? (React.createElement(Missing, __assign({}, componentProps, { pluginId: pluginId }))) : (children)),
            React.createElement(Toolbar, { nodeId: nodeId, open: focused, pluginControls: isEditMode && (plugin === null || plugin === void 0 ? void 0 : plugin.controls) ? (React.createElement(PluginControls, { componentProps: componentProps, controls: plugin === null || plugin === void 0 ? void 0 : plugin.controls })) : null }))));
};
export default PluginComponent;
//# sourceMappingURL=index.js.map