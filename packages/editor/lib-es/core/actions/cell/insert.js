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
import { cloneWithNewIds } from '../../../core/utils/cloneWithNewIds';
import { isRow } from '../../types';
import { createId } from '../../utils/createId';
import { getChildCellPlugins } from '../../utils/getAvailablePlugins';
import { getCellData } from '../../utils/getCellData';
import { removeUndefinedProps } from '../../utils/removeUndefinedProps';
import { editMode } from '../display';
import { generateIds } from '../helpers';
import { focusCell } from './core';
export var CELL_INSERT_ABOVE = 'CELL_INSERT_ABOVE';
export var CELL_INSERT_BELOW = 'CELL_INSERT_BELOW';
export var CELL_INSERT_LEFT_OF = 'CELL_INSERT_LEFT_OF';
export var CELL_INSERT_RIGHT_OF = 'CELL_INSERT_RIGHT_OF';
export var CELL_INSERT_INLINE_LEFT = 'CELL_INSERT_INLINE_LEFT';
export var CELL_INSERT_INLINE_RIGHT = 'CELL_INSERT_INLINE_RIGHT';
export var CELL_INSERT_AT_END = 'CELL_INSERT_AT_END';
export var CELL_INSERT_AS_NEW_ROW = 'CELL_INSERT_AS_NEW_ROW';
export var createRow = function (partialRow, options) {
    var _a, _b;
    if (Array.isArray(partialRow)) {
        return {
            id: createId(),
            cells: partialRow.map(function (c) { return createCell(c, options); }),
        };
    }
    return removeUndefinedProps(__assign(__assign({ id: createId() }, partialRow), { cells: (_b = (_a = partialRow.cells) === null || _a === void 0 ? void 0 : _a.map(function (c) { return createCell(c, options); })) !== null && _b !== void 0 ? _b : [] }));
};
export var createCell = function (partialCell, options) {
    var _a;
    var _b, _c, _d, _e, _f, _g, _h, _j, _k, _l;
    var cellPlugins = options.cellPlugins, lang = options.lang;
    var pluginId = partialCell.plugin &&
        (typeof partialCell.plugin == 'string'
            ? partialCell.plugin
            : partialCell.plugin.id);
    var plugin = pluginId ? cellPlugins.find(function (p) { return p.id === pluginId; }) : null;
    var partialRows = ((_b = partialCell.rows) === null || _b === void 0 ? void 0 : _b.length)
        ? partialCell.rows
        : (_d = (_c = plugin === null || plugin === void 0 ? void 0 : plugin.createInitialChildren) === null || _c === void 0 ? void 0 : _c.call(plugin)) !== null && _d !== void 0 ? _d : [];
    var dataI18n = __assign((_a = {}, _a[lang] = (_j = (_g = (_e = partialCell === null || partialCell === void 0 ? void 0 : partialCell.data) !== null && _e !== void 0 ? _e : (_f = plugin === null || plugin === void 0 ? void 0 : plugin.createInitialData) === null || _f === void 0 ? void 0 : _f.call(plugin, partialCell)) !== null && _g !== void 0 ? _g : (_h = plugin === null || plugin === void 0 ? void 0 : plugin.createInitialState) === null || _h === void 0 ? void 0 : _h.call(plugin, partialCell)) !== null && _j !== void 0 ? _j : null, _a), ((_k = partialCell.dataI18n) !== null && _k !== void 0 ? _k : {}));
    return removeUndefinedProps({
        id: (_l = partialCell.id) !== null && _l !== void 0 ? _l : createId(),
        isDraft: partialCell.isDraft,
        isDraftI18n: partialCell.isDraftI18n,
        inline: partialCell.inline,
        size: partialCell.size || 12,
        hasInlineNeighbour: partialCell.hasInlineNeighbour,
        plugin: plugin
            ? {
                id: plugin.id,
                version: plugin.version,
            }
            : undefined,
        rows: partialRows === null || partialRows === void 0 ? void 0 : partialRows.map(function (r) {
            return createRow(r, {
                lang: lang,
                cellPlugins: getChildCellPlugins(cellPlugins, {
                    pluginId: pluginId,
                    data: getCellData({
                        dataI18n: dataI18n,
                    }, lang),
                }),
            });
        }),
        dataI18n: dataI18n,
    });
};
var insert = function (type) {
    return function (options) {
        return function (partialCell, target, insertOptions, ids) {
            if (ids === void 0) { ids = generateIds(); }
            var cell = createCell(partialCell, options);
            var isNew = !partialCell.id;
            return insertFullCell(type)(cell, target, __assign(__assign({}, insertOptions), { focusAfter: (insertOptions === null || insertOptions === void 0 ? void 0 : insertOptions.focusAfter) || isNew }), ids);
        };
    };
};
var insertFullCell = function (type) {
    return function (cell, _a, insertOptions, ids) {
        var _b, _c;
        var hoverId = _a.id, inline = _a.inline, hasInlineNeighbour = _a.hasInlineNeighbour, _d = _a.ancestorIds, ancestorIds = _d === void 0 ? [] : _d;
        if (ids === void 0) { ids = generateIds(); }
        var level = (_b = insertOptions === null || insertOptions === void 0 ? void 0 : insertOptions.level) !== null && _b !== void 0 ? _b : 0;
        var l = level;
        switch (type) {
            case CELL_INSERT_ABOVE:
            case CELL_INSERT_BELOW: {
                if ((inline || hasInlineNeighbour) && level < 1) {
                    l = 1;
                }
                break;
            }
            case CELL_INSERT_LEFT_OF:
            case CELL_INSERT_RIGHT_OF: {
                if ((inline || hasInlineNeighbour) && level < 1) {
                    l = 1;
                }
                break;
            }
            default:
        }
        var insertAction = {
            type: type,
            ts: new Date(),
            item: cell,
            hoverId: level === 0 ? hoverId : (_c = ancestorIds[Math.max(level - 1)]) !== null && _c !== void 0 ? _c : hoverId,
            level: l,
            // FIXME: item handling is a bit confusing,
            // we now give some of them a name like "cell" or "item",
            // but the purpose of the others is unclear
            ids: ids,
            notUndoable: insertOptions === null || insertOptions === void 0 ? void 0 : insertOptions.notUndoable,
        };
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        return function (dispatch) {
            dispatch(insertAction);
            if (insertOptions === null || insertOptions === void 0 ? void 0 : insertOptions.focusAfter) {
                dispatch(editMode());
                setTimeout(function () {
                    var _a, _b, _c, _d, _e;
                    dispatch(focusCell(
                    // first condition is for pasted cells. I know its a bit weird
                    (_e = (_d = (_c = (_b = (_a = cell.rows) === null || _a === void 0 ? void 0 : _a[0]) === null || _b === void 0 ? void 0 : _b.cells) === null || _c === void 0 ? void 0 : _c[0]) === null || _d === void 0 ? void 0 : _d.id) !== null && _e !== void 0 ? _e : insertAction.ids.item, true));
                }, 0);
            }
        };
    };
};
/**
 * Insert a cell below of the hovering cell.
 */
export var insertCellBelow = insert(CELL_INSERT_BELOW);
/**
 * Insert a cell above of the hovering cell.
 */
export var insertCellAbove = insert(CELL_INSERT_ABOVE);
/**
 * Insert a cell right of the hovering cell.
 */
export var insertCellRightOf = insert(CELL_INSERT_RIGHT_OF);
/**
 * Insert a cell left of the hovering cell.
 */
export var insertCellLeftOf = insert(CELL_INSERT_LEFT_OF);
/**
 * Insert a cell inside the hovering cell, on the left.
 */
export var insertCellLeftInline = insert(CELL_INSERT_INLINE_LEFT);
/**
 * Insert a cell inside the hovering cell, on the right.
 */
export var insertCellRightInline = insert(CELL_INSERT_INLINE_RIGHT);
export var insertCellAtTheEnd = insert(CELL_INSERT_AT_END);
export var insertCellNewAsNewRow = insert(CELL_INSERT_AS_NEW_ROW);
export var duplicateNode = function (node, options) {
    var cell = isRow(node)
        ? {
            id: createId(),
            rows: [node],
        }
        : node;
    return duplicateCell(cell, options);
};
export var duplicateCell = function (item, options) {
    var _a, _b;
    var cellWithNewIds = cloneWithNewIds(item);
    var action = insertFullCell(CELL_INSERT_BELOW)(cellWithNewIds, {
        ancestorIds: [],
        id: (_a = options === null || options === void 0 ? void 0 : options.insertAfterNodeId) !== null && _a !== void 0 ? _a : item.id,
        hasInlineNeighbour: item.hasInlineNeighbour,
        inline: item.inline,
        levels: null,
        pluginId: (_b = item.plugin) === null || _b === void 0 ? void 0 : _b.id,
    }, {
        level: 0,
        focusAfter: true,
    });
    return action;
};
export var insertActions = {
    insertCellRightInline: insertCellRightInline,
    insertCellLeftInline: insertCellLeftInline,
    insertCellLeftOf: insertCellLeftOf,
    insertCellRightOf: insertCellRightOf,
    insertCellAbove: insertCellAbove,
    insertCellBelow: insertCellBelow,
    duplicateCell: duplicateCell,
    insertCellAtTheEnd: insertCellAtTheEnd,
    insert: insert,
};
//# sourceMappingURL=insert.js.map