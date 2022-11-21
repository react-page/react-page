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
import FormLabel from '@mui/material/FormLabel';
import React from 'react';
import { connectField } from 'uniforms';
import AutoField from './AutoField';
import wrapField from './wrapField';
function Nest(_a) {
    var children = _a.children, fields = _a.fields, _b = _a.fullWidth, fullWidth = _b === void 0 ? true : _b, itemProps = _a.itemProps, label = _a.label, _c = _a.margin, margin = _c === void 0 ? 'dense' : _c, props = __rest(_a, ["children", "fields", "fullWidth", "itemProps", "label", "margin"]);
    return wrapField(__assign(__assign({ fullWidth: fullWidth, margin: margin }, props), { component: undefined }), label && React.createElement(FormLabel, { component: "legend" }, label), children ||
        fields.map(function (field) { return (React.createElement(AutoField, __assign({ key: field, name: field }, itemProps))); }));
}
export default connectField(Nest);
//# sourceMappingURL=NestField.js.map