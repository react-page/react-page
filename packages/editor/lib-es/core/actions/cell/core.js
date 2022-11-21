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
export var CELL_UPDATE_IS_DRAFT = 'CELL_UPDATE_IS_DRAFT';
export var CELL_UPDATE_DATA = 'CELL_UPDATE_DATA';
export var CELL_REMOVE = 'CELL_REMOVE';
export var CELL_RESIZE = 'CELL_RESIZE';
export var CELL_FOCUS = 'CELL_FOCUS';
export var CELL_BLUR = 'CELL_BLUR';
export var CELL_BLUR_ALL = 'CELL_BLUR_ALL';
export var updateCellIsDraft = function (id, isDraft, lang) {
    if (isDraft === void 0) { isDraft = false; }
    if (lang === void 0) { lang = null; }
    return ({
        type: CELL_UPDATE_IS_DRAFT,
        ts: new Date(),
        id: id,
        isDraft: isDraft,
        lang: lang,
    });
};
export var updateCellData = function (id) {
    return function (data, options) { return (__assign({ type: CELL_UPDATE_DATA, ts: new Date(), id: id, data: data }, options)); };
};
export var removeCells = function (ids) { return ({
    type: CELL_REMOVE,
    ts: new Date(),
    ids: ids,
}); };
export var resizeCell = function (id) {
    return function (size) {
        if (size === void 0) { size = 1; }
        return ({
            type: CELL_RESIZE,
            ts: new Date(),
            id: id,
            size: size,
        });
    };
};
/**
 * Dispatch to focus a cell.
 */
export var focusCell = function (id, scrollToCell, mode) {
    if (scrollToCell === void 0) { scrollToCell = false; }
    if (mode === void 0) { mode = 'replace'; }
    return ({
        type: CELL_FOCUS,
        ts: new Date(),
        id: id,
        scrollToCell: scrollToCell,
        mode: mode,
    });
};
/**
 * Dispatch to blur a cell.
 */
export var blurCell = function (id) { return ({
    type: CELL_BLUR,
    ts: new Date(),
    id: id,
}); };
/**
 * Dispatch to blur all cells. For example when clicking on document body.
 */
export var blurAllCells = function () { return ({
    type: CELL_BLUR_ALL,
    ts: new Date(),
}); };
export var coreActions = {
    blurAllCells: blurAllCells,
    blurCell: blurCell,
    focusCell: focusCell,
    resizeCell: resizeCell,
    removeCells: removeCells,
    updateCellData: updateCellData,
    updateCellIsDraft: updateCellIsDraft,
};
//# sourceMappingURL=core.js.map