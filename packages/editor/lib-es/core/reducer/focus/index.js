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
import { CELL_FOCUS, CELL_BLUR, CELL_BLUR_ALL } from '../../actions/cell';
var stateWithout = function (state, idsToRemove) {
    var _a, _b;
    var nodeIds = (_b = (_a = state === null || state === void 0 ? void 0 : state.nodeIds) === null || _a === void 0 ? void 0 : _a.filter(function (n) { return !idsToRemove.includes(n); })) !== null && _b !== void 0 ? _b : [];
    if (nodeIds.length === 0) {
        return null;
    }
    return __assign(__assign({}, state), { nodeIds: nodeIds });
};
export var focus = function (state, action) {
    var _a, _b, _c, _d;
    if (state === void 0) { state = null; }
    switch (action.type) {
        case 'CELL_REMOVE': {
            return stateWithout(state, action.ids);
        }
        case CELL_FOCUS: {
            var nodeIds = action.mode === 'add'
                ? ((_a = state === null || state === void 0 ? void 0 : state.nodeIds) === null || _a === void 0 ? void 0 : _a.includes(action.id))
                    ? (_c = (_b = stateWithout(state, [action.id])) === null || _b === void 0 ? void 0 : _b.nodeIds) !== null && _c !== void 0 ? _c : []
                    : __spreadArray(__spreadArray([], __read(((_d = state === null || state === void 0 ? void 0 : state.nodeIds) !== null && _d !== void 0 ? _d : [])), false), [action.id], false)
                : [action.id];
            return {
                nodeIds: nodeIds,
                scrollToCell: action.scrollToCell ? new Date().getTime() : null,
            };
        }
        case CELL_BLUR_ALL:
            return null;
        case CELL_BLUR: {
            return stateWithout(state, [action.id]);
        }
        default:
            return state;
    }
};
//# sourceMappingURL=index.js.map