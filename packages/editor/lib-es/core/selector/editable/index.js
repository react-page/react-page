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
import { isRow } from '../../types/node';
/** */
var findNode = function (nodes, nodeId, ancestors) {
    var e_1, _a;
    if (ancestors === void 0) { ancestors = []; }
    try {
        for (var nodes_1 = __values(nodes), nodes_1_1 = nodes_1.next(); !nodes_1_1.done; nodes_1_1 = nodes_1.next()) {
            var node = nodes_1_1.value;
            if (node.id === nodeId) {
                return {
                    node: node,
                    ancestors: ancestors,
                };
            }
            // else search children
            if (isRow(node) && node.cells) {
                var found = findNode(node.cells, nodeId, __spreadArray([node], __read(ancestors), false));
                if (found) {
                    return found;
                }
            }
            else if (!isRow(node) && node.rows) {
                var found = findNode(node.rows, nodeId, __spreadArray([node], __read(ancestors), false));
                if (found) {
                    return found;
                }
            }
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (nodes_1_1 && !nodes_1_1.done && (_a = nodes_1.return)) _a.call(nodes_1);
        }
        finally { if (e_1) throw e_1.error; }
    }
    return null;
};
/*
let sum = 0;
let missum = 0;
const end = (start, hit) => {
  const now = performance.now();
  const diff = now - start;
  sum += diff;
  if (!hit) missum++;
  console.log('time', hit ? '!' : '?', missum, diff, sum);
};
*/
export var findNodeInState = function (state, nodeId) {
    var _a, _b;
    // const now = performance.now();
    // POOR mans node cache
    // it gets removed every reduce, so we don't have to clear it manually
    if (!state.reactPage.__nodeCache) {
        state.reactPage.__nodeCache = {};
    }
    if (state.reactPage.__nodeCache[nodeId]) {
        //end(now, true);
        return state.reactPage.__nodeCache[nodeId];
    }
    if (!((_a = state.reactPage.values) === null || _a === void 0 ? void 0 : _a.present)) {
        return null;
    }
    var result = findNode([
        __assign(__assign({}, (_b = state.reactPage.values) === null || _b === void 0 ? void 0 : _b.present), { isRoot: true }),
    ], nodeId);
    state.reactPage.__nodeCache[nodeId] = result;
    //end(now, false);
    return result;
};
export var currentValue = function (state) { var _a, _b; return (_b = (_a = state === null || state === void 0 ? void 0 : state.reactPage) === null || _a === void 0 ? void 0 : _a.values) === null || _b === void 0 ? void 0 : _b.present; };
export var selectNode = function (state, nodeId) {
    var found = findNodeInState(state, nodeId);
    return found;
};
//# sourceMappingURL=index.js.map