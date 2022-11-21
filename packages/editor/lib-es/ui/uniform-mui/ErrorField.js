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
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import React from 'react';
import { connectField, filterDOMProps } from 'uniforms';
function Error(_a) {
    var children = _a.children, error = _a.error, errorMessage = _a.errorMessage, fullWidth = _a.fullWidth, margin = _a.margin, variant = _a.variant, props = __rest(_a, ["children", "error", "errorMessage", "fullWidth", "margin", "variant"]);
    return !error ? null : (React.createElement(FormControl, { error: !!error, fullWidth: !!fullWidth, margin: margin === 'dense' ? margin : undefined, variant: variant },
        React.createElement(FormHelperText, __assign({}, filterDOMProps(props)), children || errorMessage)));
}
export default connectField(Error, {
    initialValue: false,
    kind: 'leaf',
});
//# sourceMappingURL=ErrorField.js.map