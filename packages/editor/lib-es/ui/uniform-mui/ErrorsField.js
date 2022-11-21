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
import { filterDOMProps, useForm } from 'uniforms';
function ErrorsField(_a) {
    var children = _a.children, _b = _a.fullWidth, fullWidth = _b === void 0 ? true : _b, margin = _a.margin, variant = _a.variant, props = __rest(_a, ["children", "fullWidth", "margin", "variant"]);
    var _c = useForm(), error = _c.error, schema = _c.schema;
    return !error && !children ? null : (React.createElement(FormControl, { error: !!error, fullWidth: !!fullWidth, margin: margin, variant: variant },
        !!children && (React.createElement(FormHelperText, __assign({}, filterDOMProps(props)), children)),
        schema.getErrorMessages(error).map(function (message, index) { return (React.createElement(FormHelperText, __assign({ key: index }, filterDOMProps(props)), message)); })));
}
export default ErrorsField;
//# sourceMappingURL=ErrorsField.js.map