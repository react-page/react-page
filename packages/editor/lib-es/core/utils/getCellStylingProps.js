import classNames from 'classnames';
export var getCellInnerDivStyle = function (cell, plugin, data) {
    return cell && (plugin === null || plugin === void 0 ? void 0 : plugin.cellStyle)
        ? typeof (plugin === null || plugin === void 0 ? void 0 : plugin.cellStyle) === 'function'
            ? plugin === null || plugin === void 0 ? void 0 : plugin.cellStyle(data)
            : plugin === null || plugin === void 0 ? void 0 : plugin.cellStyle
        : undefined;
};
export var getCellInnerDivClassName = function (cell, plugin, data) {
    var _a, _b;
    var additionalClass = (plugin === null || plugin === void 0 ? void 0 : plugin.cellClassName)
        ? typeof (plugin === null || plugin === void 0 ? void 0 : plugin.cellClassName) === 'function'
            ? plugin === null || plugin === void 0 ? void 0 : plugin.cellClassName(data)
            : plugin === null || plugin === void 0 ? void 0 : plugin.cellClassName
        : undefined;
    return ('react-page-cell-inner' +
        (((_b = (_a = cell === null || cell === void 0 ? void 0 : cell.rows) === null || _a === void 0 ? void 0 : _a.length) !== null && _b !== void 0 ? _b : 0) > 0 ? '' : ' react-page-cell-inner-leaf') +
        (additionalClass ? ' ' + additionalClass : ''));
};
export var getCellInnerDivStylingProps = function (cell, plugin, data) {
    return {
        style: getCellInnerDivStyle(cell, plugin, data),
        className: getCellInnerDivClassName(cell, plugin, data),
    };
};
export var gridClass = function (size) {
    return "react-page-cell-sm-".concat(size || 12, " react-page-cell-xs-12");
};
export var getCellOuterDivClassName = function (_a) {
    var _b;
    var size = _a.size, hasInlineNeighbour = _a.hasInlineNeighbour, inline = _a.inline, hasChildren = _a.hasChildren;
    return classNames('react-page-cell', gridClass(size), (_b = {
            'react-page-cell-has-inline-neighbour': hasInlineNeighbour
        },
        _b["react-page-cell-inline-".concat(inline || '')] = inline,
        _b['react-page-cell-leaf'] = !hasChildren,
        _b));
};
//# sourceMappingURL=getCellStylingProps.js.map