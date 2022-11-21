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
import { useEffect } from 'react';
import { useSelector } from '../../reduxConnect';
import { allFocusedNodeIds, focus, singleFocusedNode, } from '../../selector/focus';
/**
 * @returns the current focused nodeId if just one or null
 */
export var useFocusedNodeId = function () {
    return useSelector(singleFocusedNode);
};
export var useAllFocusedNodeIds = function () {
    return useSelector(allFocusedNodeIds);
};
/**
 *
 * @param id the id of the node (row/cell)
 * @returns true if the given node id is focused
 */
export var useIsFocused = function (id) {
    return useSelector(function (state) { return allFocusedNodeIds(state).includes(id); });
};
/**
 *
 * @param id the id of the node (row/cell)
 * @returns true if ONLY the given node id is focused
 */
export var useIsExclusivlyFocused = function (id) {
    return useSelector(function (state) { return singleFocusedNode(state) === id; });
};
/**
 *
 * @param id the id of the node
 * @param effect callback that is run when the given node is focused and the focus action demanded scrollToCell
 * @param deps effect deps array
 */
export var useScrollToViewEffect = function (id, effect, deps) {
    var scrollToCell = useSelector(function (state) {
        var f = focus(state);
        var nodeId = singleFocusedNode(state);
        if (!f || nodeId !== id) {
            return null;
        }
        return f.scrollToCell;
    });
    useEffect(function () {
        if (scrollToCell) {
            return effect();
        }
    }, __spreadArray([scrollToCell], __read(deps), false));
};
//# sourceMappingURL=focus.js.map