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
import { CELL_BLUR_ALL } from '../../actions/cell';
import { DEFAULT_DISPLAY_MODE, DISPLAY_SET_ZOOM, SET_DISPLAY_MODE, SET_DISPLAY_REFERENCE_NODE_ID, } from '../../actions/display';
export var display = function (state, action) {
    if (state === void 0) { state = {
        mode: DEFAULT_DISPLAY_MODE,
        zoom: 1,
    }; }
    switch (action.type) {
        case DISPLAY_SET_ZOOM: {
            return __assign(__assign({}, state), { zoom: action.zoom });
        }
        case SET_DISPLAY_REFERENCE_NODE_ID:
            return __assign(__assign({}, state), { referenceNodeId: action.referenceNodeId });
        case CELL_BLUR_ALL: {
            return __assign(__assign({}, state), { mode: state.mode, referenceNodeId: null });
        }
        case SET_DISPLAY_MODE:
            return __assign(__assign({}, state), { mode: action.mode, referenceNodeId: action.referenceNodeId || state.referenceNodeId });
        default:
            return state;
    }
};
//# sourceMappingURL=index.js.map