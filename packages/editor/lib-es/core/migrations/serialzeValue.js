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
var serializeRow = function (r, cellPlugins) {
    return __assign(__assign({}, r), { cells: r.cells.map(function (c) { return serializeCell(c, cellPlugins); }) });
};
var serializeCell = function (c, cellPlugins) {
    var _a;
    var pluginDef = c.plugin;
    var pluginFound = pluginDef
        ? cellPlugins.find(function (p) { return p.id === pluginDef.id; })
        : null;
    var transformData = function (dataIn) {
        return (pluginFound === null || pluginFound === void 0 ? void 0 : pluginFound.serialize) ? pluginFound.serialize(dataIn) : dataIn;
    };
    var dataI18n = c.dataI18n
        ? Object.keys(c.dataI18n).reduce(function (acc, lang) {
            var _a;
            var _b;
            return (__assign(__assign({}, acc), (_a = {}, _a[lang] = transformData((_b = c.dataI18n) === null || _b === void 0 ? void 0 : _b[lang]), _a)));
        }, {})
        : null;
    return __assign(__assign({}, c), { rows: (_a = c.rows) === null || _a === void 0 ? void 0 : _a.map(function (r) { return serializeRow(r, cellPlugins); }), dataI18n: dataI18n !== null && dataI18n !== void 0 ? dataI18n : {} });
};
export var serialzeValue = function (_a, plugins) {
    var rows = _a.rows, rest = __rest(_a, ["rows"]);
    return __assign(__assign({}, rest), { rows: rows.map(function (c) { return serializeRow(c, plugins); }) });
};
//# sourceMappingURL=serialzeValue.js.map