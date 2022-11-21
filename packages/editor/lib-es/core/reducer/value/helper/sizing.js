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
import deepEquals from '../../../utils/deepEquals';
var MAX_CELLS_PER_ROW = 12;
/**
 * Sum up cell sizes: Σ(cell[size]).
 */
export var sumSizes = function (cells) {
    if (cells === void 0) { cells = []; }
    return cells.reduce(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    function (_a, _b) {
        var _c = _a.size, p = _c === void 0 ? 99 : _c, a = _a.inline;
        var _d = _b.size, c = _d === void 0 ? 99 : _d, b = _b.inline;
        return ({
            size: (a ? 0 : 1) * p + (b ? 0 : 1) * c,
        });
    }, { size: 0 }).size;
};
/**
 * Computes sizes an inline element was found.
 */
export var computeInlines = function (cells) {
    if (cells === void 0) { cells = []; }
    var doit = function () {
        if (cells.length !== 2 || !cells[0].inline) {
            return cells.map(function (_a) {
                var hasInlineNeighbour = _a.hasInlineNeighbour, c = __rest(_a, ["hasInlineNeighbour"]);
                return (__assign(__assign({}, c), { inline: null }));
            });
        }
        return [
            __assign(__assign({}, cells[0]), { size: cells[0].size || Math.round(MAX_CELLS_PER_ROW / 2) }),
            __assign(__assign({}, cells[1]), { size: 12, hasInlineNeighbour: cells[0].id }),
        ];
    };
    var result = doit();
    // FIXME: this function is run on every action but is a noop in most casses
    // however this will create new cells all the time, breaking memoization
    // workaround is to do not return new instances if nothing's changed
    if (deepEquals(cells, result)) {
        return cells;
    }
    return result;
};
/**
 * Resize cells.
 */
export var resizeCells = function (cells, _a) {
    if (cells === void 0) { cells = []; }
    var id = _a.id, size = _a.size;
    var prev = 0;
    return cells.map(function (c) {
        var _a, _b;
        if (prev > 0) {
            var ret = __assign(__assign({}, c), { size: ((_a = c.size) !== null && _a !== void 0 ? _a : 0) + prev - (size !== null && size !== void 0 ? size : 0) });
            prev = 0;
            return ret;
        }
        else if (id === c.id) {
            if (!c.inline) {
                prev = (_b = c.size) !== null && _b !== void 0 ? _b : 0;
            }
            return __assign(__assign({}, c), { size: size });
        }
        return c;
    });
};
/**
 * Balance cell sizes.
 *
 * @param {[...cell]} cells
 * @return {[...cell]}
 */
export var computeSizes = function (cells) {
    if (cells === void 0) { cells = []; }
    var total = sumSizes(cells);
    if (total === MAX_CELLS_PER_ROW) {
        return cells;
    }
    var count = cells.length;
    var sizePerCell = Math.floor(MAX_CELLS_PER_ROW / count);
    var spaceLeft = MAX_CELLS_PER_ROW - sizePerCell * (count - 1);
    return cells.map(function (c, k) { return (__assign(__assign({}, c), { size: k === count - 1 ? spaceLeft : sizePerCell })); });
};
//# sourceMappingURL=sizing.js.map