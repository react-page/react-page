import { findNodeInState } from './editable';
export var focus = function (state) {
    return state && state.reactPage && state.reactPage.focus;
};
export var allFocusedNodeIds = function (state) {
    var _a, _b, _c;
    return ((_c = (_b = (_a = focus(state)) === null || _a === void 0 ? void 0 : _a.nodeIds) === null || _b === void 0 ? void 0 : _b.filter(function (n) { var _a; return (_a = findNodeInState(state, n)) === null || _a === void 0 ? void 0 : _a.node; })) !== null && _c !== void 0 ? _c : []);
};
export var singleFocusedNode = function (state) {
    var nodeIds = allFocusedNodeIds(state);
    if ((nodeIds === null || nodeIds === void 0 ? void 0 : nodeIds.length) === 1)
        return nodeIds[0];
    return null;
};
//# sourceMappingURL=focus.js.map