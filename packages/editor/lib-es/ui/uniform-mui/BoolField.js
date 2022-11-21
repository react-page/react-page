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
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import FormLabel from '@mui/material/FormLabel';
import Switch from '@mui/material/Switch';
import omit from 'lodash/omit';
import React from 'react';
import { connectField, filterDOMProps } from 'uniforms';
import wrapField from './wrapField';
function Bool(props) {
    var appearance = props.appearance, disabled = props.disabled, inputRef = props.inputRef, label = props.label, legend = props.legend, name = props.name, onChange = props.onChange, readOnly = props.readOnly, transform = props.transform, value = props.value;
    var SelectionControl = appearance === 'checkbox' || appearance === undefined ? Checkbox : Switch;
    return wrapField(__assign({ fullWidth: true }, props), legend && (React.createElement(FormLabel, { component: "legend", htmlFor: name }, legend)), React.createElement(FormGroup, null,
        React.createElement(FormControlLabel, { control: React.createElement(SelectionControl, __assign({ checked: !!value, name: name, onChange: function (event) {
                    return !disabled &&
                        !readOnly &&
                        onChange &&
                        onChange(event.target.checked);
                }, ref: inputRef, value: name }, omit(filterDOMProps(props), ['helperText', 'fullWidth']))), label: transform ? transform(label) : label })));
}
export default connectField(Bool, { kind: 'leaf' });
//# sourceMappingURL=BoolField.js.map