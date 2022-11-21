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
/* istanbul ignore next */
var DateConstructor = (typeof global === 'object' ? global : window).Date;
var dateFormat = function (value) { return value && value.toISOString().slice(0, -8); };
var dateParse = function (timestamp, onChange) {
    var date = new DateConstructor(timestamp);
    if (date.getFullYear() < 10000) {
        onChange(date);
    }
    else if (isNaN(timestamp)) {
        onChange(undefined);
    }
};
function Date(_a) {
    var _b;
    var disabled = _a.disabled, error = _a.error, errorMessage = _a.errorMessage, helperText = _a.helperText, InputLabelProps = _a.InputLabelProps, inputRef = _a.inputRef, label = _a.label, labelProps = _a.labelProps, name = _a.name, onChange = _a.onChange, placeholder = _a.placeholder, readOnly = _a.readOnly, showInlineError = _a.showInlineError, value = _a.value, props = __rest(_a, ["disabled", "error", "errorMessage", "helperText", "InputLabelProps", "inputRef", "label", "labelProps", "name", "onChange", "placeholder", "readOnly", "showInlineError", "value"]);
    return (React.createElement(TextField, __assign({ disabled: disabled, error: !!error, fullWidth: true, helperText: (error && showInlineError && errorMessage) || helperText, label: label, InputLabelProps: __assign(__assign({ shrink: true }, labelProps), InputLabelProps), inputProps: __assign({ readOnly: readOnly }, props.inputProps), margin: "dense", name: name, onChange: function (event) {
            // FIXME: `valueAsNumber` is not available in `EventTarget`.
            return disabled || dateParse(event.target.valueAsNumber, onChange);
        }, placeholder: placeholder, ref: inputRef, type: "datetime-local", value: (_b = dateFormat(value)) !== null && _b !== void 0 ? _b : '' }, filterDOMProps(props))));
}
export default connectField(Date, { kind: 'leaf' });
//# sourceMappingURL=DateField.js.map