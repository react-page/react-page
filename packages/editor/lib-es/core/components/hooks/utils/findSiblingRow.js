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
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
import { isRow } from '../../../types';
/**
 *
 * @param nodeId a cell or row
 * @param ancestors the ancestors of the node
 *
 * @returns the previous row if any or null
 */
export var findSiblingRow = function (nodeId, ancestors, direction) {
    var step = direction === 'previous' ? -1 : 1;
    var _a = __read(ancestors), parent = _a[0], olderAncestors = _a.slice(1);
    if (!parent)
        return null;
    var greatParent = olderAncestors[0];
    if (isRow(parent)) {
        if (greatParent && !isRow(greatParent) && greatParent.rows) {
            var parentIndex = greatParent.rows.findIndex(function (r) { return r.id === parent.id; });
            var siblingRow = greatParent.rows[parentIndex + step];
            if (siblingRow) {
                return findInnerRow(siblingRow, direction);
            }
        }
    }
    else {
        if (!parent.rows) {
            return null;
        }
        // so parent is a cell, so i am a row, previous row is therefor
        var myIndex = parent.rows.findIndex(function (r) { return r.id === nodeId; });
        var siblingRow = parent.rows[myIndex + step];
        if (siblingRow) {
            return findInnerRow(siblingRow, direction);
        }
    }
    // nothing found, go one level deeper
    return findSiblingRow(parent.id, olderAncestors, direction);
};
var findInnerRow = function (node, direction) {
    var e_1, _a, e_2, _b;
    var found = null;
    if (isRow(node)) {
        var cells = direction === 'previous' ? __spreadArray([], __read(node.cells), false).reverse() : node.cells;
        try {
            for (var cells_1 = __values(cells), cells_1_1 = cells_1.next(); !cells_1_1.done; cells_1_1 = cells_1.next()) {
                var cell = cells_1_1.value;
                found = findInnerRow(cell, direction);
                if (found) {
                    break;
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (cells_1_1 && !cells_1_1.done && (_a = cells_1.return)) _a.call(cells_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
        if (!found) {
            found = node;
        }
    }
    else {
        if (node.rows) {
            var rows = direction === 'previous' ? __spreadArray([], __read(node.rows), false).reverse() : node.rows;
            try {
                for (var rows_1 = __values(rows), rows_1_1 = rows_1.next(); !rows_1_1.done; rows_1_1 = rows_1.next()) {
                    var row = rows_1_1.value;
                    found = findInnerRow(row, direction);
                    if (found) {
                        break;
                    }
                }
            }
            catch (e_2_1) { e_2 = { error: e_2_1 }; }
            finally {
                try {
                    if (rows_1_1 && !rows_1_1.done && (_b = rows_1.return)) _b.call(rows_1);
                }
                finally { if (e_2) throw e_2.error; }
            }
        }
    }
    return found;
};
//# sourceMappingURL=findSiblingRow.js.map