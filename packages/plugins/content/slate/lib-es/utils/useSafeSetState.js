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
import * as React from 'react';
export function useSafeSetState(initialState) {
    var _a = __read(React.useState(initialState), 2), state = _a[0], setState = _a[1];
    var mountedRef = React.useRef(false);
    React.useEffect(function () {
        mountedRef.current = true;
        return function () {
            mountedRef.current = false;
        };
    }, []);
    var safeSetState = React.useCallback(function (args) {
        if (mountedRef.current) {
            return setState(args);
        }
    }, [mountedRef, setState]);
    return [state, safeSetState];
}
//# sourceMappingURL=useSafeSetState.js.map