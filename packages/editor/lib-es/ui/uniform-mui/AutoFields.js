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
import { createElement } from 'react';
import { useForm } from 'uniforms';
import AutoField from './AutoField';
export default function AutoFields(_a) {
    var _b = _a.autoField, autoField = _b === void 0 ? AutoField : _b, _c = _a.element, element = _c === void 0 ? 'div' : _c, fields = _a.fields, _d = _a.omitFields, omitFields = _d === void 0 ? [] : _d, showInlineError = _a.showInlineError, props = __rest(_a, ["autoField", "element", "fields", "omitFields", "showInlineError"]);
    var schema = useForm().schema;
    return createElement(element, props, (fields !== null && fields !== void 0 ? fields : schema.getSubfields())
        .filter(function (field) { return !omitFields.includes(field); })
        .map(function (field) {
        return createElement(autoField, Object.assign({ key: field, name: field }, showInlineError === undefined ? null : { showInlineError: showInlineError }));
    }));
}
//# sourceMappingURL=AutoFields.js.map