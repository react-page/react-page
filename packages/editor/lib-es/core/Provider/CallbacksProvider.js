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
import React, { useRef } from 'react';
import deepEquals from '../utils/deepEquals';
import { CallbacksContext } from '../components/hooks';
var CallbacksProvider = function (_a) {
    var children = _a.children, callbacks = __rest(_a, ["children"]);
    var lastCallbacks = useRef();
    var isEqual = lastCallbacks.current
        ? deepEquals(lastCallbacks.current, callbacks)
        : false;
    if (!isEqual) {
        lastCallbacks.current = callbacks;
    }
    return lastCallbacks.current ? (React.createElement(CallbacksContext.Provider, { value: lastCallbacks.current }, children)) : null;
};
export default CallbacksProvider;
//# sourceMappingURL=CallbacksProvider.js.map