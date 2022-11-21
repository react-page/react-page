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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import classNames from 'classnames';
import React from 'react';
import NoopProvider from '../core/components/Cell/NoopProvider';
import { migrateValue } from '../core/migrations/migrate';
import { optimizeRows } from '../core/reducer/value/helper/optimize';
import { setAllSizesAndOptimize } from '../core/reducer/value/helper/setAllSizesAndOptimize';
import { getChildCellPlugins } from '../core/utils/getAvailablePlugins';
import { getCellData } from '../core/utils/getCellData';
import { getPluginCellSpacing, normalizeCellSpacing, } from '../core/utils/getCellSpacing';
import { getCellInnerDivStylingProps, getCellOuterDivClassName, } from '../core/utils/getCellStylingProps';
var rowHasInlineChildren = function (_a) {
    var cells = _a.cells;
    return Boolean(cells.length === 2 && Boolean(cells[0].inline));
};
var HTMLRow = React.memo(function (_a) {
    var _b = _a.cells, cells = _b === void 0 ? [] : _b, className = _a.className, lang = _a.lang, cellPlugins = _a.cellPlugins, cellSpacing = _a.cellSpacing;
    return (React.createElement("div", { className: classNames('react-page-row', className, {
            'react-page-row-has-floating-children': rowHasInlineChildren({ cells: cells }),
        }), style: {
            margin: cellSpacing.x > 0 ? "0 ".concat(-cellSpacing.x / 2, "px") : undefined,
        } }, cells.map(function (c) { return (React.createElement(HTMLCell, __assign({ key: c.id }, c, { lang: lang, cellPlugins: cellPlugins !== null && cellPlugins !== void 0 ? cellPlugins : [], cellSpacing: cellSpacing }))); })));
});
// eslint-disable-next-line no-empty-function
var noop = function () {
    return;
};
var HTMLCell = React.memo(function (props) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j;
    var _k = props.lang, lang = _k === void 0 ? 'default' : _k, cellPlugins = props.cellPlugins, cellSpacing = props.cellSpacing, cell = __rest(props, ["lang", "cellPlugins", "cellSpacing"]);
    var size = cell.size, hasInlineNeighbour = cell.hasInlineNeighbour, inline = cell.inline, isDraftI18n = cell.isDraftI18n, isDraft = cell.isDraft;
    var hasChildren = ((_b = (_a = cell.rows) === null || _a === void 0 ? void 0 : _a.length) !== null && _b !== void 0 ? _b : 0) > 0;
    if ((_c = isDraftI18n === null || isDraftI18n === void 0 ? void 0 : isDraftI18n[lang]) !== null && _c !== void 0 ? _c : isDraft) {
        return null;
    }
    var data = (_d = getCellData(cell, lang)) !== null && _d !== void 0 ? _d : {};
    var plugin = cell.plugin
        ? cellPlugins.find(function (p) { var _a; return p.id === ((_a = cell.plugin) === null || _a === void 0 ? void 0 : _a.id); })
        : null;
    var outerClasses = getCellOuterDivClassName({
        hasChildren: hasChildren,
        size: size,
        hasInlineNeighbour: hasInlineNeighbour,
        inline: inline,
    });
    if (plugin) {
        var Renderer = plugin.Renderer;
        var Provider = plugin.Provider && !plugin.disableProviderInReadOnly
            ? plugin.Provider
            : NoopProvider;
        var pluginCellSpacing = getPluginCellSpacing(plugin, data);
        var normCellSpacing_1 = pluginCellSpacing
            ? normalizeCellSpacing(pluginCellSpacing)
            : cellSpacing;
        var props_1 = {
            readOnly: true,
            lang: lang,
            nodeId: cell.id,
            data: data,
            onChange: noop,
            pluginConfig: plugin,
            focused: false,
            isPreviewMode: false,
            isEditMode: false,
        };
        var childCellPlugins_1 = getChildCellPlugins(cellPlugins, {
            data: data,
            pluginId: plugin === null || plugin === void 0 ? void 0 : plugin.id,
        });
        var cellOuterStyle = cellSpacing.y !== 0 || cellSpacing.x !== 0
            ? {
                padding: "".concat(cellSpacing.y / 2, "px ").concat(cellSpacing.x / 2, "px"),
            }
            : undefined;
        var innerStylingProps = getCellInnerDivStylingProps(cell, plugin, data);
        return (React.createElement(Provider, __assign({}, props_1),
            React.createElement("div", { className: outerClasses, style: cellOuterStyle },
                React.createElement("div", __assign({}, innerStylingProps),
                    React.createElement("div", { style: hasInlineNeighbour
                            ? undefined
                            : {
                                display: 'flex',
                                flexDirection: 'column',
                                height: '100%',
                            } },
                        React.createElement(Renderer, __assign({}, props_1), ((_e = cell.rows) === null || _e === void 0 ? void 0 : _e.length) ? (React.createElement("div", { style: {
                                margin: normCellSpacing_1.y > 0
                                    ? "".concat(-normCellSpacing_1.y / 2, "px 0")
                                    : undefined,
                            } }, (_f = cell.rows) === null || _f === void 0 ? void 0 : _f.map(function (r) { return (React.createElement(HTMLRow, __assign({ key: r.id }, r, { cellPlugins: childCellPlugins_1, cellSpacing: normCellSpacing_1, lang: lang }))); }))) : null))))));
    }
    else if (((_h = (_g = cell.rows) === null || _g === void 0 ? void 0 : _g.length) !== null && _h !== void 0 ? _h : 0) > 0) {
        return (React.createElement("div", { className: outerClasses, style: {
                padding: cellSpacing.x > 0 ? "0 ".concat(cellSpacing.x / 2, "px") : undefined,
            } }, (_j = cell.rows) === null || _j === void 0 ? void 0 : _j.map(function (r) { return (React.createElement(HTMLRow, __assign({ key: r.id }, r, { lang: lang, cellPlugins: cellPlugins, cellSpacing: cellSpacing }))); })));
    }
    return (React.createElement("div", { className: outerClasses },
        React.createElement("div", { className: "react-page-cell-inner" })));
});
export var HTMLRenderer = React.memo(function (_a) {
    var value = _a.value, cellPlugins = _a.cellPlugins, cellSpacing = _a.cellSpacing, _b = _a.lang, lang = _b === void 0 ? 'default' : _b;
    var data = migrateValue(value, { cellPlugins: cellPlugins, lang: lang });
    var normCellSpacing = normalizeCellSpacing(cellSpacing);
    if (!data) {
        return null;
    }
    var rows = data.rows;
    var optRows = optimizeRows(rows);
    return (React.createElement("div", { style: {
            margin: (optRows === null || optRows === void 0 ? void 0 : optRows.length) && normCellSpacing.x > 0
                ? "".concat(-normCellSpacing.y / 2, "px 0")
                : undefined,
        } }, setAllSizesAndOptimize(optRows).map(function (row) { return (React.createElement(HTMLRow, __assign({ key: row.id, cellPlugins: cellPlugins, lang: lang, cellSpacing: normCellSpacing }, row))); })));
});
//# sourceMappingURL=HTMLRenderer.js.map