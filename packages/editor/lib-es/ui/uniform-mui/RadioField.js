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
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import RadioMaterial from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import omit from 'lodash/omit';
import React from 'react';
import { connectField, filterDOMProps } from 'uniforms';
import wrapField from './wrapField';
function Radio(_a) {
    var allowedValues = _a.allowedValues, disabled = _a.disabled, _b = _a.fullWidth, fullWidth = _b === void 0 ? true : _b, id = _a.id, inputRef = _a.inputRef, label = _a.label, _c = _a.margin, margin = _c === void 0 ? 'dense' : _c, name = _a.name, onChange = _a.onChange, readOnly = _a.readOnly, row = _a.row, transform = _a.transform, value = _a.value, props = __rest(_a, ["allowedValues", "disabled", "fullWidth", "id", "inputRef", "label", "margin", "name", "onChange", "readOnly", "row", "transform", "value"]);
    return wrapField(__assign(__assign({}, props), { component: 'fieldset', disabled: disabled, fullWidth: fullWidth, margin: margin }), label && (React.createElement(FormLabel, { component: "legend", htmlFor: name }, label)), React.createElement(RadioGroup, { id: id, name: name, onChange: function (event) {
            return disabled || readOnly || onChange(event.target.value);
        }, ref: inputRef, row: row, value: value !== null && value !== void 0 ? value : '' }, allowedValues === null || allowedValues === void 0 ? void 0 : allowedValues.map(function (item) { return (React.createElement(FormControlLabel, { control: React.createElement(RadioMaterial, __assign({}, omit(filterDOMProps(props), ['checkboxes', 'helperText']))), key: item, label: transform ? transform(item) : item, value: "".concat(item) })); })));
}
export default connectField(Radio, { kind: 'leaf' });
//# sourceMappingURL=RadioField.js.map