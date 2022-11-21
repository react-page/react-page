import createStore from './store';
import { setLang } from './actions/setting';
import { findNodeInState } from './selector/editable';
import { createContext } from 'react';
import { createId } from './utils/createId';
import { CURRENT_EDITABLE_VERSION } from './migrations/EDITABLE_MIGRATIONS';
export var EditorContext = createContext(null);
var EditorStore = /** @class */ (function () {
    function EditorStore(_a) {
        var _b = _a.middleware, middleware = _b === void 0 ? [] : _b, store = _a.store, initialState = _a.initialState;
        var _this = this;
        this.getNodeWithAncestors = function (nodeId) {
            return findNodeInState(_this.store.getState(), nodeId);
        };
        this.getNode = function (nodeId) {
            var _a;
            return (_a = findNodeInState(_this.store.getState(), nodeId)) === null || _a === void 0 ? void 0 : _a.node;
        };
        this.store = store || createStore(initialState, middleware);
        this.middleware = middleware;
    }
    EditorStore.prototype.setLang = function (lang) {
        this.store.dispatch(setLang(lang));
    };
    return EditorStore;
}());
export var createEmptyState = function () {
    return ({ id: createId(), rows: [], version: CURRENT_EDITABLE_VERSION });
};
export default EditorStore;
//# sourceMappingURL=EditorStore.js.map