export var getCellData = function (cell, lang) {
    var _a, _b, _c;
    var dataI18n = cell === null || cell === void 0 ? void 0 : cell.dataI18n;
    return ((_c = (_a = dataI18n === null || dataI18n === void 0 ? void 0 : dataI18n[lang]) !== null && _a !== void 0 ? _a : 
    // find first non-empty
    dataI18n === null || dataI18n === void 0 ? void 0 : dataI18n[(_b = Object.keys(dataI18n).find(function (l) { return dataI18n[l]; })) !== null && _b !== void 0 ? _b : 'default']) !== null && _c !== void 0 ? _c : {});
};
//# sourceMappingURL=getCellData.js.map