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
import Button from '@mui/material/Button';
import React from 'react';
import { filterDOMProps, useForm } from 'uniforms';
function SubmitField(_a) {
    var children = _a.children, disabled = _a.disabled, inputRef = _a.inputRef, _b = _a.label, label = _b === void 0 ? 'Submit' : _b, value = _a.value, props = __rest(_a, ["children", "disabled", "inputRef", "label", "value"]);
    var _c = useForm(), error = _c.error, state = _c.state;
    return (React.createElement(Button, __assign({ disabled: disabled === undefined ? !!(error || state.disabled) : disabled, ref: inputRef, type: "submit", value: value, variant: "contained" }, filterDOMProps(props)), children || label));
}
export default SubmitField;
//# sourceMappingURL=SubmitField.js.map