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
import { computeSizes, computeInlines } from './sizing';
import { optimizeRow, optimizeRows, optimizeCells } from './optimize';
export var setAllSizesAndOptimize = function (rows) {
    if (rows === void 0) { rows = []; }
    return optimizeRows(rows).map(function (r) {
        var optimized = optimizeRow(r);
        if (optimized.cells) {
            optimized.cells = computeInlines(computeSizes(optimizeCells(optimized.cells.map(function (cell) { return (__assign(__assign({}, cell), { rows: cell.rows ? setAllSizesAndOptimize(cell.rows) : undefined })); }))));
        }
        return optimized;
    });
};
//# sourceMappingURL=setAllSizesAndOptimize.js.map