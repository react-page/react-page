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
import MenuItem from '@mui/material/MenuItem';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import Switch from '@mui/material/Switch';
import TextField from '@mui/material/TextField';
import omit from 'lodash/omit';
import xor from 'lodash/xor';
import React from 'react';
import { connectField, filterDOMProps } from 'uniforms';
import wrapField from './wrapField';
var base64 = typeof btoa === 'undefined'
    ? /* istanbul ignore next */ function (x) { return Buffer.from(x).toString('base64'); }
    : btoa;
var escape = function (x) { return base64(encodeURIComponent(x)).replace(/=+$/, ''); };
// eslint-disable-next-line complexity
function Select(props) {
    var _a, _b;
    var value = (_a = props.value) !== null && _a !== void 0 ? _a : '';
    if (props.checkboxes) {
        var allowedValues_1 = props.allowedValues, disabled_1 = props.disabled, fieldType_1 = props.fieldType, id_1 = props.id, inputRef_1 = props.inputRef, label_1 = props.label, legend = props.legend, name_1 = props.name, onChange_1 = props.onChange, readOnly_1 = props.readOnly, transform_1 = props.transform;
        var appearance = (_b = props.appearance) !== null && _b !== void 0 ? _b : 'checkbox';
        var SelectionControl_1 = appearance === 'checkbox' ? Checkbox : Switch;
        var filteredProps_1 = omit(filterDOMProps(props), [
            'checkboxes',
            'disableItem',
            'id',
            'inputRef',
        ]);
        var children = fieldType_1 !== Array ? (React.createElement(RadioGroup, { id: id_1, name: name_1, onChange: function (event) {
                return disabled_1 || readOnly_1 || onChange_1(event.target.value);
            }, ref: inputRef_1, value: value !== null && value !== void 0 ? value : '' }, allowedValues_1.map(function (item) {
            var _a;
            return (React.createElement(FormControlLabel, { control: React.createElement(Radio, __assign({ id: "".concat(id_1, "-").concat(escape(item)) }, filteredProps_1)), disabled: ((_a = props.disableItem) === null || _a === void 0 ? void 0 : _a.call(props, item)) || disabled_1, key: item, label: transform_1 ? transform_1(item) : item, value: item }));
        }))) : (React.createElement(FormGroup, { id: id_1 }, allowedValues_1.map(function (item) {
            var _a;
            return (React.createElement(FormControlLabel, { control: React.createElement(SelectionControl_1, __assign({ checked: value.includes(item), id: "".concat(id_1, "-").concat(escape(item)), name: name_1, onChange: function () {
                        return disabled_1 || readOnly_1 || onChange_1(xor([item], value));
                    }, ref: inputRef_1, value: name_1 }, filteredProps_1)), disabled: ((_a = props.disableItem) === null || _a === void 0 ? void 0 : _a.call(props, item)) || disabled_1, key: item, label: transform_1 ? transform_1(item) : item }));
        })));
        return wrapField(__assign(__assign({}, props), { component: 'fieldset' }), (legend || label_1) && (React.createElement(FormLabel, { component: "legend" }, legend || label_1)), children);
    }
    var allowedValues = props.allowedValues, disabled = props.disabled, error = props.error, errorMessage = props.errorMessage, fieldType = props.fieldType, _c = props.fullWidth, fullWidth = _c === void 0 ? true : _c, helperText = props.helperText, id = props.id, InputLabelProps = props.InputLabelProps, inputProps = props.inputProps, label = props.label, labelProps = props.labelProps, _d = props.margin, margin = _d === void 0 ? 'dense' : _d, name = props.name, native = props.native, onChange = props.onChange, placeholder = props.placeholder, readOnly = props.readOnly, required = props.required, showInlineError = props.showInlineError, transform = props.transform, variant = props.variant, textFieldProps = props.textFieldProps;
    var Item = native ? 'option' : MenuItem;
    var hasPlaceholder = !!placeholder;
    var hasValue = value !== '' && value !== undefined;
    var filteredProps = omit(filterDOMProps(props), [
        'checkboxes',
        'disableItem',
        'fullWidth',
        'helperText',
        'margin',
        'textFieldProps',
        'variant',
    ]);
    return (React.createElement(TextField, __assign({ disabled: disabled, error: !!error, fullWidth: fullWidth, helperText: (error && showInlineError && errorMessage) || helperText, InputLabelProps: __assign(__assign({ shrink: !!label && (hasPlaceholder || hasValue) }, labelProps), InputLabelProps), label: label, margin: margin, onChange: function (event) {
            return disabled ||
                readOnly ||
                onChange(event.target.value !== '' ? event.target.value : undefined);
        }, required: required, select: true, SelectProps: __assign({ displayEmpty: hasPlaceholder, inputProps: __assign({ name: name, id: id }, inputProps), multiple: fieldType === Array || undefined, native: native }, filteredProps), value: native && !value ? '' : value, variant: variant }, textFieldProps),
        (hasPlaceholder || !required || !hasValue) && (React.createElement(Item, { value: "", disabled: !!required }, placeholder || label)),
        allowedValues.map(function (value) {
            var _a;
            return (React.createElement(Item, { disabled: (_a = props.disableItem) === null || _a === void 0 ? void 0 : _a.call(props, value), key: value, value: value }, transform ? transform(value) : value));
        })));
}
export default connectField(Select, { kind: 'leaf' });
//# sourceMappingURL=SelectField.js.map