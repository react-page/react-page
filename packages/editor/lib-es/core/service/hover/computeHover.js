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
var _a;
import { isRow } from '../../types';
import deepEquals from '../../utils/deepEquals';
import logger from '../logger';
/**
 * NO (None): No drop zone.
 *
 * Corners are counted clockwise, beginning top left
 * C1 (Corner top left): Position decided by top left corner function
 * C2 (Corner top right): Position decided by top right corner function
 * C3 (Corner bottom right): Position decided by bottom right corner function
 * C4 (Corner bottom left): Position decided by bottom left corner function
 *
 * Above:
 * AH (Above here): above, same level
 * AA (Above of self or some ancestor): Above, compute active level using classification functions, e.g. log, sin, mx + t
 *
 * Below:
 * BH (Below here)
 * BA (Below of self or some ancestor)
 *
 * Left of:
 * LH (Left of here)
 * LA (Left of self or some ancestor)
 *
 * Right of:
 * RH (Right of here)
 * RA (Right of self or some ancestor)
 *
 * Inside / inline
 * IL (Inline left)
 * IR (Inline right)
 */
export var classes = {
    NO: 0,
    C1: 10,
    C2: 11,
    C3: 12,
    C4: 13,
    AH: 200,
    AA: 201,
    BH: 210,
    BA: 211,
    LH: 220,
    LA: 221,
    RH: 230,
    RA: 231,
    IL: 300,
    IR: 301,
};
var c = classes;
/**
 * A list of matrices that are used to define the callback function.
 *
 * @type {{10x10: *[], 10x10-no-inline: *[]}}
 */
var MATRIX_LIST = {
    '10x10': [
        [c.C1, c.AA, c.AA, c.AA, c.AA, c.AA, c.AA, c.AA, c.AA, c.C2],
        [c.LA, c.IL, c.IL, c.IL, c.AH, c.AH, c.IR, c.IR, c.IR, c.RA],
        [c.LA, c.IL, c.IL, c.IL, c.AH, c.AH, c.IR, c.IR, c.IR, c.RA],
        [c.LA, c.IL, c.IL, c.IL, c.AH, c.AH, c.IR, c.IR, c.IR, c.RA],
        [c.LA, c.LH, c.LH, c.LH, c.C1, c.C2, c.RH, c.RH, c.RH, c.RA],
        [c.LA, c.LH, c.LH, c.LH, c.C4, c.C3, c.RH, c.RH, c.RH, c.RA],
        [c.LA, c.LH, c.LH, c.C4, c.BH, c.BH, c.C3, c.IR, c.RH, c.RA],
        [c.LA, c.LH, c.C4, c.BH, c.BH, c.BH, c.BH, c.C3, c.RH, c.RA],
        [c.LA, c.C4, c.BH, c.BH, c.BH, c.BH, c.BH, c.BH, c.C3, c.RA],
        [c.C4, c.BA, c.BA, c.BA, c.BA, c.BA, c.BA, c.BA, c.BA, c.C3],
    ],
    '10x10-no-inline': [
        [c.C1, c.AA, c.AA, c.AA, c.AA, c.AA, c.AA, c.AA, c.AA, c.C2],
        [c.LA, c.C1, c.AH, c.AH, c.AH, c.AH, c.AH, c.AH, c.C2, c.RA],
        [c.LA, c.LH, c.C1, c.AH, c.AH, c.AH, c.AH, c.C2, c.RH, c.RA],
        [c.LA, c.LH, c.LH, c.C1, c.AH, c.AH, c.C2, c.RH, c.RH, c.RA],
        [c.LA, c.LH, c.LH, c.LH, c.C1, c.C2, c.RH, c.RH, c.RH, c.RA],
        [c.LA, c.LH, c.LH, c.LH, c.C4, c.C3, c.RH, c.RH, c.RH, c.RA],
        [c.LA, c.LH, c.LH, c.C4, c.BH, c.BH, c.C3, c.RH, c.RH, c.RA],
        [c.LA, c.LH, c.C4, c.BH, c.BH, c.BH, c.BH, c.C3, c.RH, c.RA],
        [c.LA, c.C4, c.BH, c.BH, c.BH, c.BH, c.BH, c.BH, c.C3, c.RA],
        [c.C4, c.BA, c.BA, c.BA, c.BA, c.BA, c.BA, c.BA, c.BA, c.C3],
    ],
};
/**
 * Computes the average width and height for cells in a room.
 *
 * @param room
 * @param matrix
 * @returns {{x: number, y: number}}
 */
var getRoomScale = function (_a) {
    var room = _a.room, matrix = _a.matrix;
    var rows = matrix.length;
    var cells = matrix[0].length;
    var scalingX = room.width / cells;
    var scalingY = room.height / rows;
    return {
        x: scalingX,
        y: scalingY,
    };
};
/**
 * Returns the index of the hover cell.
 *
 * @param mouse
 * @param scale
 */
var getMouseHoverCell = function (_a) {
    var mouse = _a.mouse, scale = _a.scale;
    return ({
        cell: Math.floor(mouse.x / scale.x),
        row: Math.floor(mouse.y / scale.y),
    });
};
/**
 * Used for caching.
 */
var last = { '10x10': null, '10x10-no-inline': null };
export var computeHover = function (drag, hover, actions, _a) {
    var _b, _c;
    var room = _a.room, mouse = _a.mouse, cellPlugins = _a.cellPlugins;
    var allowInlineNeighbours = (_c = (_b = cellPlugins.find(function (p) { return p.id === hover.pluginId; })) === null || _b === void 0 ? void 0 : _b.allowInlineNeighbours) !== null && _c !== void 0 ? _c : false;
    var matrixName = allowInlineNeighbours ? '10x10' : '10x10-no-inline';
    var matrix = MATRIX_LIST[matrixName];
    var scale = getRoomScale({ room: room, matrix: matrix });
    var hoverCell = getMouseHoverCell({ mouse: mouse, scale: scale });
    var rows = matrix.length;
    var cells = matrix[0].length;
    if (hoverCell.row >= rows) {
        hoverCell.row = rows - 1;
    }
    else if (hoverCell.row < 0) {
        hoverCell.row = 0;
    }
    if (hoverCell.cell >= cells) {
        hoverCell.cell = cells - 1;
    }
    else if (hoverCell.cell < 0) {
        hoverCell.cell = 0;
    }
    var cell = matrix[hoverCell.row][hoverCell.cell];
    if (!CALLBACK_LIST[cell]) {
        logger.error('Matrix callback not found.', {
            room: room,
            mouse: mouse,
            matrix: matrix,
            scale: scale,
            hoverCell: hoverCell,
            rows: rows,
            cells: cells,
        });
        return;
    }
    var all = {
        item: drag.id,
        hover: hover.id,
        actions: actions,
        ctx: {
            room: room,
            mouse: mouse,
            position: hoverCell,
            size: { rows: rows, cells: cells },
            scale: scale,
        },
    };
    if (deepEquals(all, last[matrixName])) {
        return;
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    last[matrixName] = all;
    return CALLBACK_LIST[cell](drag, hover, actions, {
        room: room,
        mouse: mouse,
        position: hoverCell,
        size: { rows: rows, cells: cells },
        cellPlugins: cellPlugins,
        scale: scale,
    });
};
/**
 * Return the mouse position relative to the cell.
 */
var relativeMousePosition = function (_a) {
    var mouse = _a.mouse, position = _a.position, scale = _a.scale;
    return ({
        x: Math.round(mouse.x - position.cell * scale.x),
        y: Math.round(mouse.y - position.row * scale.y),
    });
};
/**
 * Computes the drop level based on the mouse position and the cell width.
 */
export var computeLevel = function (_a) {
    var size = _a.size, _b = _a.level, level = _b === void 0 ? 0 : _b, position = _a.position;
    if (size <= (level + 1) * 2) {
        return Math.round(position / (size / level));
    }
    var spare = size - (level + 1) * 2;
    var steps = [0];
    var current = spare;
    for (var i = 0; i <= level; i++) {
        steps.push(steps[i] + current / 2);
        current /= 2;
        if (position >= steps[i] + i * 2 && position < steps[i + 1] + (i + 1) * 2) {
            return i;
        }
    }
    return level;
};
/**
 * Computes the horizontal drop level based on the mouse position.
 *
 * @param mouse
 * @param position
 * @param hover
 * @param scale
 * @param level
 * @param inv returns the inverse drop level. Usually true for left and above drop level computation.
 * @returns number
 */
var computeHorizontal = function (_a, inv) {
    var mouse = _a.mouse, position = _a.position, hover = _a.hover, scale = _a.scale, _b = _a.level, level = _b === void 0 ? 0 : _b;
    if (inv === void 0) { inv = false; }
    var x = relativeMousePosition({ mouse: mouse, position: position, scale: scale }).x;
    var at = computeLevel({ size: scale.x, position: x, level: level });
    if (isRow(hover)) {
        // Is row, always opt for lowest level
        return level;
    }
    // If the hovered element is an inline element, level 0 would be directly besides it which doesn't work.
    // Set it to 1 instead.
    if (hover.inline && at === 0) {
        at = 1;
    }
    return inv ? level - at : at;
};
/**
 * Computes the vertical drop level based on the mouse position.
 *
 * @returns number
 */
var computeVertical = function (_a, inv) {
    var _b = _a.level, level = _b === void 0 ? 0 : _b, mouse = _a.mouse, hover = _a.hover, position = _a.position, scale = _a.scale;
    if (inv === void 0) { inv = false; }
    var y = relativeMousePosition({ mouse: mouse, position: position, scale: scale }).y;
    var at = computeLevel({ size: scale.y, position: y, level: level });
    if (isRow(hover)) {
        // Is row, always opt for lowest level
        return level;
    }
    // If the hovered element is an inline element, level 0 would be directly besides it which doesn't work.
    // Set it to 1 instead.
    if (hover.inline && at === 0) {
        at = 1;
    }
    return inv ? level - at : at;
};
var getDropLevel = function (hover) {
    return !isRow(hover) && hover.inline ? 1 : 0;
};
/**
 * A list of callbacks.
 */
export var CALLBACK_LIST = (_a = {},
    _a[c.NO] = function (item, hover, _a) {
        var clear = _a.clear;
        return clear();
    },
    /* corners */
    _a[c.C1] = function (item, hover, _a, ctx) {
        var leftOf = _a.leftOf, above = _a.above;
        var mouse = relativeMousePosition(ctx);
        var level = getDropLevel(hover);
        if (mouse.x < mouse.y) {
            return leftOf(item, hover, { level: level });
        }
        above(item, hover, { level: level });
    },
    _a[c.C2] = function (item, hover, _a, ctx) {
        var rightOf = _a.rightOf, above = _a.above;
        var mouse = relativeMousePosition(ctx);
        var level = getDropLevel(hover);
        if (mouse.x > mouse.y) {
            return rightOf(item, hover, { level: level });
        }
        above(item, hover, { level: level });
    },
    _a[c.C3] = function (item, hover, _a, ctx) {
        var rightOf = _a.rightOf, below = _a.below;
        var mouse = relativeMousePosition(ctx);
        var level = getDropLevel(hover);
        if (mouse.x > mouse.y) {
            return rightOf(item, hover, { level: level });
        }
        below(item, hover, { level: level });
    },
    _a[c.C4] = function (item, hover, _a, ctx) {
        var leftOf = _a.leftOf, below = _a.below;
        var mouse = relativeMousePosition(ctx);
        var level = getDropLevel(hover);
        if (mouse.x < mouse.y) {
            return leftOf(item, hover, { level: level });
        }
        below(item, hover, { level: level });
    },
    /* heres */
    _a[c.AH] = function (item, hover, _a) {
        var above = _a.above;
        var level = getDropLevel(hover);
        above(item, hover, { level: level });
    },
    _a[c.BH] = function (item, hover, _a) {
        var below = _a.below;
        var level = getDropLevel(hover);
        below(item, hover, { level: level });
    },
    _a[c.LH] = function (item, hover, _a) {
        var leftOf = _a.leftOf;
        var level = getDropLevel(hover);
        leftOf(item, hover, { level: level });
    },
    _a[c.RH] = function (item, hover, _a) {
        var rightOf = _a.rightOf;
        var level = getDropLevel(hover);
        rightOf(item, hover, { level: level });
    },
    /* ancestors */
    _a[c.AA] = function (item, hover, _a, ctx) {
        var _b;
        var above = _a.above;
        return above(item, hover, {
            level: computeVertical(__assign(__assign({}, ctx), { hover: hover, level: (_b = hover.levels) === null || _b === void 0 ? void 0 : _b.above }), true),
        });
    },
    _a[c.BA] = function (item, hover, _a, ctx) {
        var _b;
        var below = _a.below;
        return below(item, hover, {
            level: computeVertical(__assign(__assign({}, ctx), { hover: hover, level: (_b = hover.levels) === null || _b === void 0 ? void 0 : _b.below })),
        });
    },
    _a[c.LA] = function (item, hover, _a, ctx) {
        var _b;
        var leftOf = _a.leftOf;
        return leftOf(item, hover, {
            level: computeHorizontal(__assign(__assign({}, ctx), { hover: hover, level: (_b = hover.levels) === null || _b === void 0 ? void 0 : _b.left }), true),
        });
    },
    _a[c.RA] = function (item, hover, _a, ctx) {
        var _b;
        var rightOf = _a.rightOf;
        return rightOf(item, hover, {
            level: computeHorizontal(__assign(__assign({}, ctx), { hover: hover, level: (_b = hover.levels) === null || _b === void 0 ? void 0 : _b.right })),
        });
    },
    /* inline */
    _a[c.IL] = function (item, hover, _a, _b) {
        var _c;
        var inlineLeft = _a.inlineLeft, leftOf = _a.leftOf;
        var cellPlugins = _b.cellPlugins;
        if (isRow(item) || isRow(hover)) {
            return;
        }
        var inline = hover.inline, hasInlineNeighbour = hover.hasInlineNeighbour;
        var plugin = cellPlugins.find(function (p) {
            var _a;
            return p.id ===
                (typeof item.plugin === 'string' ? item.plugin : (_a = item.plugin) === null || _a === void 0 ? void 0 : _a.id);
        });
        var isInlineable = (_c = plugin === null || plugin === void 0 ? void 0 : plugin.isInlineable) !== null && _c !== void 0 ? _c : false;
        if (inline || !isInlineable) {
            return leftOf(item, hover, { level: 2 });
        }
        if (hasInlineNeighbour && hasInlineNeighbour !== item.id) {
            return leftOf(item, hover, { level: 2 });
        }
        if (hasInlineNeighbour &&
            hasInlineNeighbour === item.id &&
            item.inline === 'left') {
            return leftOf(item, hover, { level: 2 });
        }
        inlineLeft(item, hover);
    },
    _a[c.IR] = function (item, hover, _a, _b) {
        var _c;
        var inlineRight = _a.inlineRight, rightOf = _a.rightOf;
        var cellPlugins = _b.cellPlugins;
        if (isRow(item) || isRow(hover)) {
            return;
        }
        var inline = hover.inline, hasInlineNeighbour = hover.hasInlineNeighbour;
        var plugin = cellPlugins.find(function (p) {
            var _a;
            return p.id ===
                (typeof item.plugin === 'string' ? item.plugin : (_a = item.plugin) === null || _a === void 0 ? void 0 : _a.id);
        });
        var isInlineable = (_c = plugin === null || plugin === void 0 ? void 0 : plugin.isInlineable) !== null && _c !== void 0 ? _c : false;
        if (inline || !isInlineable) {
            return rightOf(item, hover, { level: 2 });
        }
        if (hasInlineNeighbour && hasInlineNeighbour !== item.id) {
            return rightOf(item, hover, { level: 2 });
        }
        if (hasInlineNeighbour &&
            hasInlineNeighbour === item.id &&
            item.inline === 'right') {
            return rightOf(item, hover, { level: 2 });
        }
        inlineRight(item, hover);
    },
    _a);
//# sourceMappingURL=computeHover.js.map