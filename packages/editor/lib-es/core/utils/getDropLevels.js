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
import { isRow } from '../types/node';
var getMyPositionInParent = function (node, parent) {
    var _a;
    var siblings = (_a = (isRow(parent) ? parent.cells : parent.rows)) !== null && _a !== void 0 ? _a : [];
    var index = siblings.findIndex(function (c) { return c.id === node.id; });
    return [index, siblings.length];
};
var left = function (node, ancestors) {
    var _a = __read(ancestors), parent = _a[0], greatParents = _a.slice(1);
    if (!parent)
        return 0;
    if (isRow(node)) {
        return left(parent, greatParents) + 1;
    }
    else {
        var _b = __read(getMyPositionInParent(node, parent), 1), index = _b[0];
        if (index === 0) {
            return left(parent, greatParents) + 1;
        }
        else {
            return 0;
        }
    }
};
var right = function (node, ancestors) {
    var _a = __read(ancestors), parent = _a[0], greatParents = _a.slice(1);
    if (!parent)
        return 0;
    if (isRow(node)) {
        return right(parent, greatParents) + 1;
    }
    else {
        var _b = __read(getMyPositionInParent(node, parent), 2), index = _b[0], numberOfSiblings = _b[1];
        if (index === numberOfSiblings - 1) {
            return right(parent, greatParents) + 1;
        }
        else {
            return 0;
        }
    }
};
var above = function (node, ancestors) {
    var _a = __read(ancestors), parent = _a[0], greatParents = _a.slice(1);
    if (!parent)
        return 0;
    if (!isRow(node)) {
        return above(parent, greatParents) + 1;
    }
    else {
        var _b = __read(getMyPositionInParent(node, parent), 1), index = _b[0];
        if (index === 0) {
            return above(parent, greatParents) + 1;
        }
        else {
            return 0;
        }
    }
};
var below = function (node, ancestors) {
    var _a = __read(ancestors), parent = _a[0], greatParents = _a.slice(1);
    if (!parent)
        return 0;
    if (!isRow(node)) {
        return below(parent, greatParents) + 1;
    }
    else {
        var _b = __read(getMyPositionInParent(node, parent), 2), index = _b[0], numberOfSiblings = _b[1];
        if (index === numberOfSiblings - 1) {
            return below(parent, greatParents) + 1;
        }
        else {
            return 0;
        }
    }
};
export var getDropLevels = function (node, ancestors) { return ({
    left: left(node, ancestors),
    right: right(node, ancestors),
    above: above(node, ancestors),
    below: below(node, ancestors),
}); };
//# sourceMappingURL=getDropLevels.js.map