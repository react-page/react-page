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
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Migration } from '@react-page/editor';
// eslint-disable-next-line @typescript-eslint/no-explicit-any
var removeLeaves = function (nodes) {
    if (!nodes) {
        return [];
    }
    var cleanedNodes = nodes.reduce(function (acc, node) {
        if (node.leaves) {
            // we don't need the node itself, as we exepct it to be a text node
            return __spreadArray(__spreadArray([], __read(acc), false), __read(node.leaves.map(function (leave) { return (__assign(__assign({}, leave), { object: 'text' })); })), false);
        }
        else {
            var cleanedNode = node.nodes
                ? __assign(__assign({}, node), { nodes: removeLeaves(node.nodes) }) : node;
            return __spreadArray(__spreadArray([], __read(acc), false), [cleanedNode], false);
        }
    }, []);
    return cleanedNodes;
};
var migration = new Migration({
    toVersion: '0.0.3',
    fromVersionRange: '^0.0.2',
    migrate: function (state) {
        if (!state) {
            return {};
        }
        var newState = state.serialized && state.serialized.document
            ? __assign(__assign({}, state), { serialized: __assign(__assign({}, state.serialized), { document: __assign(__assign({}, state.serialized.document), { nodes: removeLeaves(state.serialized.document.nodes) }) }) }) : state;
        return newState;
    },
});
export default migration;
//# sourceMappingURL=v003.js.map