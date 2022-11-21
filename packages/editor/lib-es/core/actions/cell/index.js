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
import { dragActions } from './drag';
import { insertActions } from './insert';
import { coreActions } from './core';
export var cellActions = __assign(__assign(__assign({}, dragActions), insertActions), coreActions);
export * from './insert';
export * from './core';
export * from './drag';
//# sourceMappingURL=index.js.map