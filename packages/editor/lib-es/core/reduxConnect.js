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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import React from 'react';
import { createDispatchHook, createSelectorHook, createStoreHook, Provider, } from 'react-redux';
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export var ReduxContext = React.createContext(null);
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export var ReduxProvider = function (_a) {
    var store = _a.store, props = __rest(_a, ["store"]);
    return (React.createElement(Provider, __assign({ store: store, context: ReduxContext }, props)));
};
export var useStore = createStoreHook(ReduxContext);
export var useDispatch = createDispatchHook(ReduxContext
// eslint-disable-next-line @typescript-eslint/no-explicit-any
);
export var useSelector = createSelectorHook(ReduxContext);
//# sourceMappingURL=reduxConnect.js.map