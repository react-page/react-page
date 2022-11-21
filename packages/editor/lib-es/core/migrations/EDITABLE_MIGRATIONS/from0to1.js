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
import { createId } from '../../utils/createId';
import { removeUndefinedProps } from '../../utils/removeUndefinedProps';
import { Migration, sanitizeVersion } from '../Migration';
export default new Migration({
    fromVersion: 0,
    toVersion: 1,
    migrate: function (_a, _b) {
        var _c, _d;
        var cells = _a.cells, id = _a.id;
        var lang = _b.lang;
        var migrateRow = function (_a) {
            var _b;
            var cells = _a.cells, rowRest = __rest(_a, ["cells"]);
            return __assign(__assign({}, rowRest), { id: createId(), cells: (_b = cells === null || cells === void 0 ? void 0 : cells.map(migrateCell)) !== null && _b !== void 0 ? _b : [] });
        };
        var migrateCell = function (_a) {
            var _b;
            var _c, _d;
            var content = _a.content, layout = _a.layout, rows = _a.rows, cellRest = __rest(_a, ["content", "layout", "rows"]);
            var contentOrLayout = layout !== null && layout !== void 0 ? layout : content;
            var dataI18n = (_c = contentOrLayout === null || contentOrLayout === void 0 ? void 0 : contentOrLayout.stateI18n) !== null && _c !== void 0 ? _c : ((contentOrLayout === null || contentOrLayout === void 0 ? void 0 : contentOrLayout.state)
                ? (_b = {},
                    _b[lang] = (_d = contentOrLayout.state) !== null && _d !== void 0 ? _d : null,
                    _b) : undefined);
            var plugin = contentOrLayout
                ? {
                    id: contentOrLayout.plugin.name,
                    version: sanitizeVersion(contentOrLayout.plugin.version),
                }
                : undefined;
            return removeUndefinedProps(__assign(__assign({}, cellRest), { rows: rows === null || rows === void 0 ? void 0 : rows.map(migrateRow), plugin: plugin, dataI18n: dataI18n, id: createId() }));
        };
        var migratedCells = (_c = cells === null || cells === void 0 ? void 0 : cells.map(migrateCell)) !== null && _c !== void 0 ? _c : [];
        // check if is the only one cell with only rows, then we cann omit that
        var rootRows = migratedCells.length === 1 && !migratedCells[0].plugin
            ? (_d = migratedCells[0].rows) !== null && _d !== void 0 ? _d : []
            : [
                {
                    id: createId(),
                    cells: migratedCells,
                },
            ];
        return {
            id: id,
            rows: rootRows,
            version: 0, // will be overridden later
        };
    },
});
//# sourceMappingURL=from0to1.js.map