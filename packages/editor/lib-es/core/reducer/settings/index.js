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
import { SET_LANG } from '../../actions/setting';
export var settings = function (state, action) {
    if (state === void 0) { state = {
        lang: null,
    }; }
    switch (action.type) {
        case SET_LANG:
            return __assign(__assign({}, state), { lang: action.lang });
        default:
            return state;
    }
};
//# sourceMappingURL=index.js.map