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
function Text(_a) {
    var disabled = _a.disabled, error = _a.error, errorMessage = _a.errorMessage, helperText = _a.helperText, inputRef = _a.inputRef, label = _a.label, name = _a.name, onChange = _a.onChange, placeholder = _a.placeholder, readOnly = _a.readOnly, showInlineError = _a.showInlineError, _b = _a.type, type = _b === void 0 ? 'text' : _b, _c = _a.value, value = _c === void 0 ? '' : _c, props = __rest(_a, ["disabled", "error", "errorMessage", "helperText", "inputRef", "label", "name", "onChange", "placeholder", "readOnly", "showInlineError", "type", "value"]);
    return (React.createElement(TextField, __assign({ disabled: disabled, error: !!error, fullWidth: true, helperText: (error && showInlineError && errorMessage) || helperText, inputProps: { readOnly: readOnly }, label: label, margin: "dense", name: name, onChange: function (event) { return disabled || onChange(event.target.value); }, placeholder: placeholder, ref: inputRef, type: type, value: value }, filterDOMProps(props))));
}
export default connectField(Text, { kind: 'leaf' });
//# sourceMappingURL=TextField.js.map