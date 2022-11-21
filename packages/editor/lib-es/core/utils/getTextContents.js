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
import { getChildCellPlugins } from './getAvailablePlugins';
import { getCellData } from './getCellData';
var getTextContentsFromCell = function (cell, options) {
    var _a, _b, _c, _d, _e, _f;
    var data = getCellData(cell, options.lang);
    var childOptions = __assign(__assign({}, options), { cellPlugins: getChildCellPlugins(options.cellPlugins, {
            pluginId: (_a = cell.plugin) === null || _a === void 0 ? void 0 : _a.id,
            data: data,
        }) });
    var currentPlugin = cell.plugin
        ? (_b = options.cellPlugins) === null || _b === void 0 ? void 0 : _b.find(function (c) { var _a; return c.id === ((_a = cell.plugin) === null || _a === void 0 ? void 0 : _a.id); })
        : null;
    return __spreadArray(__spreadArray([], __read(((_d = (_c = cell.rows) === null || _c === void 0 ? void 0 : _c.reduce(function (arr, row) { return __spreadArray(__spreadArray([], __read(arr), false), __read(getTextContentsFromRow(row, childOptions)), false); }, [])) !== null && _d !== void 0 ? _d : [])), false), __read(((_f = (_e = currentPlugin === null || currentPlugin === void 0 ? void 0 : currentPlugin.getTextContents) === null || _e === void 0 ? void 0 : _e.call(currentPlugin, data)) !== null && _f !== void 0 ? _f : [])), false);
};
var getTextContentsFromRow = function (row, options) {
    return row.cells.reduce(function (arr, cell) { return __spreadArray(__spreadArray([], __read(arr), false), __read(getTextContentsFromCell(cell, options)), false); }, []);
};
export var getTextContents = function (value, options) {
    return value.rows.reduce(function (arr, row) { return __spreadArray(__spreadArray([], __read(arr), false), __read(getTextContentsFromRow(row, options)), false); }, []);
};
//# sourceMappingURL=getTextContents.js.map