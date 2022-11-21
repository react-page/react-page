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
import { isEmpty } from './empty';
import { removeUndefinedProps } from '../../../utils/removeUndefinedProps';
export var flatten = function (c, n) {
    return __spreadArray(__spreadArray([], __read(c), false), __read(n), false);
};
export var optimizeCells = function (cells) {
    if (cells === void 0) { cells = []; }
    return cells.filter(function (c) { return !isEmpty(c); });
};
export var optimizeRows = function (rows) {
    if (rows === void 0) { rows = []; }
    return rows.filter(function (c) { return !isEmpty(c); });
};
export var optimizeCell = function (cell) {
    var rows = cell.rows, rest = __rest(cell, ["rows"]);
    var optimized = __assign(__assign({}, rest), { rows: rows === null || rows === void 0 ? void 0 : rows.map(function (r) {
            var _a = r.cells, cells = _a === void 0 ? [] : _a;
            if (cells.length !== 1) {
                return [r];
            }
            var _b = cells[0], cellRows = _b.rows, plugin = _b.plugin;
            if (cellRows && (cellRows === null || cellRows === void 0 ? void 0 : cellRows.length) > 0 && !plugin) {
                return cellRows;
            }
            return [r];
        }).reduce(flatten, []) });
    return removeUndefinedProps(optimized);
};
export var optimizeRow = function (_a) {
    var cells = _a.cells, other = __rest(_a, ["cells"]);
    return removeUndefinedProps(__assign(__assign({}, other), { cells: cells === null || cells === void 0 ? void 0 : cells.map(function (c) {
            var rows = c.rows, size = c.size;
            if (!rows || rows.length !== 1 || c.plugin) {
                return [c];
            }
            var _a = rows[0].cells, rowCells = _a === void 0 ? [] : _a;
            if (rowCells.length === 1) {
                return rowCells.map(function (r) { return (__assign(__assign({}, r), { size: size })); });
            }
            return [c];
        }).reduce(flatten, []) }));
};
//# sourceMappingURL=optimize.js.map