export var getPluginCellSpacing = function (plugin, data) {
    return (plugin === null || plugin === void 0 ? void 0 : plugin.cellSpacing)
        ? typeof (plugin === null || plugin === void 0 ? void 0 : plugin.cellSpacing) === 'function'
            ? plugin === null || plugin === void 0 ? void 0 : plugin.cellSpacing(data)
            : plugin === null || plugin === void 0 ? void 0 : plugin.cellSpacing
        : null;
};
export var normalizeCellSpacing = function (cellSpacing) {
    if (cellSpacing === void 0) { cellSpacing = 0; }
    if (!cellSpacing) {
        return { x: 0, y: 0 };
    }
    if (['number', 'string'].indexOf(typeof cellSpacing) !== -1) {
        return { x: +cellSpacing || 0, y: +cellSpacing || 0 };
    }
    else {
        return {
            x: +cellSpacing.x || 0,
            y: +cellSpacing.y || 0,
        };
    }
};
//# sourceMappingURL=getCellSpacing.js.map