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
import { useEffect, useRef } from 'react';
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function useWhyDidYouUpdate(name, props) {
    // Get a mutable ref object where we can store props ...
    // ... for comparison next time this hook runs.
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    var previousProps = useRef();
    useEffect(function () {
        if (previousProps.current) {
            // Get all keys from previous and current props
            var allKeys = Object.keys(__assign(__assign({}, previousProps.current), props));
            // Use this object to keep track of changed props
            var changesObj_1 = {};
            // Iterate through keys
            allKeys.forEach(function (key) {
                // If previous is different from current
                if (previousProps.current[key] !== props[key]) {
                    // Add to changesObj
                    changesObj_1[key] = {
                        from: previousProps.current[key],
                        to: props[key],
                    };
                }
            });
            // If changesObj not empty then output to console
            if (Object.keys(changesObj_1).length) {
                // tslint:disable-next-line:no-console
                console.log('[why-did-you-update]', name, changesObj_1);
            }
        }
        // Finally update previousProps with current props for next hook call
        previousProps.current = props;
    });
}
export default useWhyDidYouUpdate;
//# sourceMappingURL=useWhyDidYouUpdate.js.map