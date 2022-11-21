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
import { mapNode } from './mapNode';
/**
 * get a node with children that only contains certain cells
 * this is usefull to duplicate or clone multiple cells
 * @param editor: the editor store
 * @param cellIds
 */
export var getCommonAncestorTree = function (editor, cellIds) {
    var nodesWithAncestors = cellIds.map(function (nodeId) {
        var _a;
        var _b = (_a = editor.getNodeWithAncestors(nodeId)) !== null && _a !== void 0 ? _a : {
            ancestors: [],
        }, node = _b.node, ancestors = _b.ancestors;
        return { node: node, ancestors: __spreadArray([], __read(ancestors), false).reverse() };
    });
    // find common ancestors
    var nearestCommonAncestor = null;
    var depth = 0;
    var search = true;
    while (search) {
        // check if every node has the same ancestor
        if (nodesWithAncestors.every(function (n) {
            var _a, _b;
            return n.ancestors[depth] &&
                ((_a = n.ancestors[depth]) === null || _a === void 0 ? void 0 : _a.id) === ((_b = nodesWithAncestors[0].ancestors[depth]) === null || _b === void 0 ? void 0 : _b.id);
        })) {
            nearestCommonAncestor = nodesWithAncestors[0].ancestors[depth];
            depth++;
        }
        else {
            search = false;
        }
    }
    // remove nodes that we don't want to duplicate unless they have children
    var cleaned = mapNode(nearestCommonAncestor, {
        skipMapCell: function (c) {
            return cellIds.includes(c.id);
        },
        // remove cells without rows
        mapCell: function (c) {
            var _a;
            if ((_a = c.rows) === null || _a === void 0 ? void 0 : _a.length) {
                return c;
            }
            else {
                return null;
            }
        },
        // remove empty cells from rows and remove row completly if its empty
        mapRowDown: function (r) {
            var _a;
            if (!r)
                return null;
            var row = __assign(__assign({}, r), { cells: (_a = r.cells.filter(Boolean)) !== null && _a !== void 0 ? _a : [] });
            if (row.cells.length === 0) {
                return null;
            }
            return row;
        },
        // remove empty rows of cells
        mapCellDown: function (c) {
            var _a, _b, _c;
            if (!c)
                return null;
            var cell = __assign(__assign({}, c), { rows: (_b = (_a = c === null || c === void 0 ? void 0 : c.rows) === null || _a === void 0 ? void 0 : _a.filter(Boolean)) !== null && _b !== void 0 ? _b : [] });
            if (((_c = cell.rows) === null || _c === void 0 ? void 0 : _c.length) > 0 || cellIds.includes(cell.id)) {
                return cell;
            }
            else {
                return null;
            }
        },
    });
    return cleaned;
};
//# sourceMappingURL=ancestorTree.js.map