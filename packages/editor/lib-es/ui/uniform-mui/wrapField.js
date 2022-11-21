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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import React, { createElement } from 'react';
export default function wrapField(_a) {
    var component = _a.component, disabled = _a.disabled, error = _a.error, errorMessage = _a.errorMessage, fullWidth = _a.fullWidth, helperText = _a.helperText, margin = _a.margin, readOnly = _a.readOnly, required = _a.required, showInlineError = _a.showInlineError, variant = _a.variant;
    var children = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        children[_i - 1] = arguments[_i];
    }
    var formHelperText = showInlineError && error ? errorMessage : helperText;
    var props = {
        component: component,
        disabled: !!disabled,
        error: !!error,
        fullWidth: !!fullWidth,
        margin: margin,
        readOnly: readOnly,
        required: required,
        variant: variant,
    };
    return createElement.apply(void 0, __spreadArray(__spreadArray([FormControl,
        props], __read(children), false), [!!formHelperText && React.createElement(FormHelperText, null, formHelperText)], false));
}
//# sourceMappingURL=wrapField.js.map