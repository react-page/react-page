/* eslint-disable @typescript-eslint/ban-types */
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
import { CELL_INSERT_ABOVE, CELL_INSERT_BELOW, CELL_INSERT_INLINE_LEFT, CELL_INSERT_INLINE_RIGHT, CELL_INSERT_LEFT_OF, CELL_INSERT_RIGHT_OF, CELL_REMOVE, CELL_RESIZE, CELL_UPDATE_DATA, CELL_UPDATE_IS_DRAFT, CELL_INSERT_AT_END, CELL_INSERT_AS_NEW_ROW, } from '../../actions/cell';
import { createId } from '../../utils/createId';
import { removeUndefinedProps } from '../../utils/removeUndefinedProps';
import { flatten, optimizeCell, optimizeCells, optimizeRow, optimizeRows, } from './helper/optimize';
import { resizeCells } from './helper/sizing';
var cell = function (s, a, depth) {
    return optimizeCell((function (state, action) {
        var _a, _b;
        var _c, _d, _e;
        var reduce = function () {
            var _a;
            return removeUndefinedProps(__assign(__assign({}, state), { rows: rows((_a = state.rows) !== null && _a !== void 0 ? _a : [], action, depth + 1) }));
        };
        switch (action.type) {
            case CELL_UPDATE_IS_DRAFT:
                if (action.id === state.id) {
                    var reduced = reduce();
                    if (action.lang) {
                        return __assign(__assign({}, reduced), { isDraftI18n: __assign(__assign({}, ((_c = reduced.isDraftI18n) !== null && _c !== void 0 ? _c : {})), (_a = {}, _a[action.lang] = action.isDraft, _a)) });
                    }
                    else {
                        return __assign(__assign({}, reduced), { isDraft: action.isDraft });
                    }
                }
                return reduce();
            case CELL_UPDATE_DATA:
                if (action.id === state.id) {
                    // If this cell is being updated, set the data
                    var reduced = reduce();
                    // copy because we mutate afterwards with delete
                    var newI18nData = __assign({}, ((_d = reduced.dataI18n) !== null && _d !== void 0 ? _d : {}));
                    var emptyValue = action.data === null;
                    if (action.lang && emptyValue) {
                        newI18nData === null || newI18nData === void 0 ? true : delete newI18nData[action.lang];
                    }
                    return __assign(__assign({}, reduced), { dataI18n: __assign(__assign({}, (newI18nData !== null && newI18nData !== void 0 ? newI18nData : {})), (!emptyValue
                            ? (_b = {}, _b[action.lang] = action.data, _b) : {})) });
                }
                return reduce();
            case CELL_INSERT_ABOVE:
                if (action.hoverId === state.id) {
                    return {
                        id: action.ids.cell,
                        rows: rows([
                            {
                                id: action.ids.others[0],
                                cells: [
                                    __assign(__assign({}, action.item), { id: action.ids.item, inline: null }),
                                ],
                            },
                            {
                                id: action.ids.others[1],
                                cells: [__assign(__assign({}, reduce()), { id: action.ids.others[2] })],
                            },
                        ], __assign(__assign({}, action), { hoverId: null }), depth + 1),
                    };
                }
                return reduce();
            case CELL_INSERT_BELOW:
                if (action.hoverId === state.id) {
                    return {
                        id: action.ids.cell,
                        rows: rows([
                            {
                                id: action.ids.others[0],
                                cells: [__assign(__assign({}, reduce()), { id: action.ids.others[1] })],
                            },
                            {
                                id: action.ids.others[2],
                                cells: [
                                    __assign(__assign({}, action.item), { id: action.ids.item, inline: null }),
                                ],
                            },
                        ], __assign(__assign({}, action), { hoverId: null }), depth + 1),
                    };
                }
                return reduce();
            case CELL_INSERT_AS_NEW_ROW: {
                if (action.hoverId === state.id) {
                    return __assign(__assign({}, state), { rows: __spreadArray(__spreadArray([], __read(((_e = state.rows) !== null && _e !== void 0 ? _e : [])), false), [
                            {
                                id: action.ids.others[1],
                                cells: [
                                    __assign(__assign({}, action.item), { id: action.ids.item, inline: null }),
                                ],
                            },
                        ], false) });
                }
                return reduce();
            }
            default:
                return reduce();
        }
    })(s, a));
};
var createEmptyCell = function () { return ({
    id: createId(),
    rows: [
        {
            id: createId(),
            cells: [],
        },
    ],
}); };
export var cells = function (state, action, depth) {
    if (state === void 0) { state = []; }
    if (depth === void 0) { depth = 0; }
    var newCells = depth === 0 && state.length === 0 ? [createEmptyCell()] : state;
    switch (action.type) {
        case CELL_RESIZE:
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            newCells = resizeCells(newCells, action);
            break;
        case CELL_INSERT_AT_END:
        case CELL_INSERT_AS_NEW_ROW:
        case CELL_INSERT_BELOW:
        case CELL_INSERT_ABOVE:
            newCells = newCells.filter(function (c) { return c.id !== action.item.id; }); // this removes the cell if it already exists
            break;
        case CELL_INSERT_LEFT_OF:
            newCells = newCells
                .filter(function (c) { return c.id !== action.item.id; }) // this removes the cell if it already exists
                .map(function (c) {
                return action.hoverId === c.id
                    ? [
                        __assign(__assign({}, action.item), { id: action.ids.item, inline: null }),
                        __assign(__assign({}, c), { id: action.ids.others[0] }),
                    ]
                    : [c];
            })
                .reduce(flatten, []);
            break;
        case CELL_INSERT_RIGHT_OF:
            newCells = newCells
                .filter(function (c) { return c.id !== action.item.id; }) // this removes the cell if it already exists
                .map(function (c) {
                return action.hoverId === c.id
                    ? [
                        __assign(__assign({}, c), { id: action.ids.others[0] }),
                        __assign(__assign({}, action.item), { id: action.ids.item, inline: null }),
                    ]
                    : [c];
            })
                .reduce(flatten, []);
            break;
        case CELL_INSERT_INLINE_RIGHT:
        case CELL_INSERT_INLINE_LEFT:
            newCells = newCells
                .filter(function (c) { return c.id !== action.item.id; }) // this removes the cell if it already exists
                .map(function (c) {
                if (action.hoverId === c.id) {
                    return [
                        {
                            id: action.ids.cell,
                            rows: [
                                {
                                    id: action.ids.others[0],
                                    cells: [
                                        __assign(__assign({}, action.item), { inline: action.type === CELL_INSERT_INLINE_RIGHT
                                                ? 'right'
                                                : 'left', id: action.ids.item, size: 0 }),
                                        __assign(__assign({}, c), { id: action.ids.others[1], inline: null, hasInlineNeighbour: action.ids.item, size: 0 }),
                                    ],
                                },
                            ],
                        },
                    ];
                }
                return [c];
            })
                .reduce(flatten, []);
            break;
        case CELL_REMOVE:
            newCells = newCells.filter(function (_a) {
                var id = _a.id;
                return !action.ids.includes(id);
            });
            break;
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    var reducedCells = newCells.map(function (c) { return cell(c, action, depth); });
    return optimizeCells(reducedCells);
};
var row = function (s, a, depth) {
    return optimizeRow((function (state, action) {
        var reduce = function () { return (__assign(__assign({}, state), { cells: cells(state.cells, action, depth + 1) })); };
        switch (action.type) {
            case CELL_INSERT_LEFT_OF:
                if (action.hoverId !== state.id) {
                    return reduce();
                }
                return __assign(__assign({}, state), { cells: cells(__spreadArray([
                        __assign(__assign({}, action.item), { id: action.ids.item, inline: null })
                    ], __read(state.cells), false), __assign(__assign({}, action), { hoverId: null }), depth + 1) });
            case CELL_INSERT_RIGHT_OF:
                if (action.hoverId !== state.id) {
                    return reduce();
                }
                return __assign(__assign({}, state), { cells: cells(__spreadArray(__spreadArray([], __read(state.cells), false), [
                        __assign(__assign({}, action.item), { id: action.ids.item, inline: null }),
                    ], false), __assign(__assign({}, action), { hoverId: null }), depth + 1) });
            /*case CELL_DRAG_HOVER:
              if (action.hoverId === state.id) {
                return { ...reduce(), hoverPosition: action.position };
              }
              return reduce();
              */
            default:
                return reduce();
        }
    })(s, a));
};
export var rows = function (s, a, depth) {
    if (s === void 0) { s = []; }
    if (depth === void 0) { depth = 0; }
    return optimizeRows(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (function (state, action) {
        var reduce = function () { return state.map(function (r) { return row(r, action, depth); }); };
        switch (action.type) {
            case CELL_INSERT_ABOVE:
                return state
                    .map(function (r) {
                    return action.hoverId === r.id
                        ? [
                            {
                                cells: [
                                    __assign(__assign({}, action.item), { id: action.ids.item, inline: null }),
                                ],
                                id: action.ids.others[0],
                            },
                            __assign(__assign({}, r), { id: action.ids.others[1] }),
                        ]
                        : [r];
                })
                    .reduce(flatten, [])
                    .map(function (r) { return row(r, action, depth); });
            case CELL_INSERT_BELOW:
                return state
                    .map(function (r) {
                    return action.hoverId === r.id
                        ? [
                            __assign(__assign({}, r), { id: action.ids.others[0] }),
                            {
                                cells: [
                                    __assign(__assign({}, action.item), { id: action.ids.item, inline: null }),
                                ],
                                id: action.ids.others[1],
                            },
                        ]
                        : [r];
                })
                    .reduce(flatten, [])
                    .map(function (r) { return row(r, action, depth); });
            case CELL_INSERT_AT_END: {
                var newRows = depth !== 0
                    ? state
                    : __spreadArray(__spreadArray([], __read(state), false), [
                        {
                            cells: [
                                __assign(__assign({}, action.item), { id: action.ids.item, inline: null }),
                            ],
                            id: action.ids.others[1],
                        },
                    ], false);
                return newRows.map(function (r) { return row(r, action, depth); });
            }
            default:
                return reduce();
        }
    })(s, a));
};
//# sourceMappingURL=tree.js.map