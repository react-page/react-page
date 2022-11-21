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
import { ReferenceInput, SelectInput } from 'react-admin';
import { connectField } from 'uniforms';
import React from 'react';
/**
 * RaSelectReferenceInputField can be used in an autoform to
 */
var RaSelectReferenceInputField = connectField(function (_a) {
    var _b = _a.allowEmpty, allowEmpty = _b === void 0 ? true : _b, _c = _a.value, value = _c === void 0 ? null : _c, onChange = _a.onChange, optionText = _a.optionText, optionValue = _a.optionValue, label = _a.label, props = __rest(_a, ["allowEmpty", "value", "onChange", "optionText", "optionValue", "label"]);
    return (React.createElement(ReferenceInput, { label: label, reference: props.reference, perPage: props.perPage, allowEmpty: allowEmpty, meta: {}, input: {
            value: value,
            onChange: function (e) {
                onChange(e.target.value);
            },
        }, source: null },
        React.createElement(SelectInput, { optionText: optionText || 'id', emptyValue: null, optionValue: optionValue || 'id', options: { value: value } })));
});
export default RaSelectReferenceInputField;
//# sourceMappingURL=RaSelectReferenceInputField.js.map