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
import IconButton from '@mui/material/IconButton';
import React from 'react';
import { connectField, filterDOMProps, joinName, useField } from 'uniforms';
function ListDel(_a) {
    var disabled = _a.disabled, _b = _a.icon, icon = _b === void 0 ? '-' : _b, name = _a.name, readOnly = _a.readOnly, props = __rest(_a, ["disabled", "icon", "name", "readOnly"]);
    var nameParts = joinName(null, name);
    var nameIndex = +nameParts[nameParts.length - 1];
    var parentName = joinName(nameParts.slice(0, -1));
    var parent = useField(parentName, {}, { absoluteName: true })[0];
    var limitNotReached = !disabled && !(parent.minCount >= parent.value.length);
    return (React.createElement(IconButton, __assign({}, filterDOMProps(props), { disabled: !limitNotReached, onClick: function () {
            if (!readOnly) {
                var value = parent.value.slice();
                value.splice(nameIndex, 1);
                parent.onChange(value);
            }
        }, size: "large" }), icon));
}
export default connectField(ListDel, {
    initialValue: false,
    kind: 'leaf',
});
//# sourceMappingURL=ListDelField.js.map