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
import { setAllSizesAndOptimize } from './helper/setAllSizesAndOptimize';
import { rows } from './tree';
export var value = function (state, action) {
    switch (action.type) {
        case 'UPDATE_VALUE': {
            return action.value;
        }
    }
    var newRows = (state === null || state === void 0 ? void 0 : state.rows)
        ? setAllSizesAndOptimize(rows(state.rows, action, 0))
        : [];
    return __assign(__assign({}, state), { rows: newRows });
};
//# sourceMappingURL=index.js.map