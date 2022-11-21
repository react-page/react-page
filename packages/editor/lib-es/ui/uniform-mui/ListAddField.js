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
import FormControl from '@mui/material/FormControl';
import cloneDeep from 'lodash/cloneDeep';
import React from 'react';
import { connectField, filterDOMProps, joinName, useField } from 'uniforms';
function ListAdd(_a) {
    var disabled = _a.disabled, _b = _a.fullWidth, fullWidth = _b === void 0 ? true : _b, _c = _a.icon, icon = _c === void 0 ? '+' : _c, initialCount = _a.initialCount, _d = _a.margin, margin = _d === void 0 ? 'dense' : _d, name = _a.name, readOnly = _a.readOnly, value = _a.value, variant = _a.variant, props = __rest(_a, ["disabled", "fullWidth", "icon", "initialCount", "margin", "name", "readOnly", "value", "variant"]);
    var nameParts = joinName(null, name);
    var parentName = joinName(nameParts.slice(0, -1));
    var parent = useField(parentName, { initialCount: initialCount }, { absoluteName: true })[0];
    var limitNotReached = !disabled && !(parent.maxCount <= parent.value.length);
    return (React.createElement(FormControl, { fullWidth: fullWidth, margin: margin, variant: variant },
        React.createElement(Button, __assign({ size: "large", variant: "outlined" }, filterDOMProps(props), { disabled: !limitNotReached, onClick: function () {
                if (!readOnly) {
                    parent.onChange(parent.value.concat([cloneDeep(value)]));
                }
            } }), icon)));
}
export default connectField(ListAdd, {
    initialValue: false,
    kind: 'leaf',
});
//# sourceMappingURL=ListAddField.js.map