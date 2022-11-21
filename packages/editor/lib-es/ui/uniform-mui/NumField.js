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
import TextField from '@mui/material/TextField';
import React from 'react';
import { connectField, filterDOMProps } from 'uniforms';
function Num(_a) {
    var decimal = _a.decimal, disabled = _a.disabled, error = _a.error, errorMessage = _a.errorMessage, helperText = _a.helperText, inputProps = _a.inputProps, inputRef = _a.inputRef, label = _a.label, max = _a.max, min = _a.min, name = _a.name, onChange = _a.onChange, readOnly = _a.readOnly, placeholder = _a.placeholder, showInlineError = _a.showInlineError, _b = _a.step, step = _b === void 0 ? decimal ? 0.01 : 1 : _b, value = _a.value, props = __rest(_a, ["decimal", "disabled", "error", "errorMessage", "helperText", "inputProps", "inputRef", "label", "max", "min", "name", "onChange", "readOnly", "placeholder", "showInlineError", "step", "value"]);
    return (React.createElement(TextField, __assign({ disabled: disabled, error: !!error, fullWidth: true, helperText: (error && showInlineError && errorMessage) || helperText, inputProps: __assign({ min: min, max: max, readOnly: readOnly, step: step }, inputProps), label: label, margin: "dense", name: name, onChange: function (event) {
            var parse = decimal ? parseFloat : parseInt;
            var value = parse(event.target.value);
            onChange(isNaN(value) ? undefined : value);
        }, placeholder: placeholder, ref: inputRef, type: "number", value: value !== null && value !== void 0 ? value : '' }, filterDOMProps(props))));
}
export default connectField(Num, { kind: 'leaf' });
//# sourceMappingURL=NumField.js.map