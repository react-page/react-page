/* eslint-disable @typescript-eslint/ban-types */
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
import Ajv from 'ajv';
import { JSONSchemaBridge } from 'uniforms-bridge-json-schema';
var ajv = new Ajv({ allErrors: true, useDefaults: true });
ajv.addKeyword('uniforms');
function createValidator(schema) {
    var validator = ajv.compile(schema);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return function (model) {
        var _a;
        validator(model);
        if (validator.errors && validator.errors.length) {
            return ((_a = validator.errors) === null || _a === void 0 ? void 0 : _a.length) ? { details: validator.errors } : null;
        }
    };
}
function makeUniformsSchema(jsonSchema) {
    var fullSchema = __assign({ type: 'object' }, jsonSchema);
    var bridge = new JSONSchemaBridge(fullSchema, createValidator(fullSchema));
    // see https://github.com/react-page/react-page/issues/1187
    // we remap props.component to props._customComponent to avoid the underlying issue in uniforms
    //
    var getPropsOrg = bridge.getProps;
    bridge.getProps = function (name) {
        var _a = getPropsOrg.call(this, name), component = _a.component, props = __rest(_a, ["component"]);
        if (component) {
            return __assign({ _customComponent: component }, props);
        }
        return props;
    };
    return bridge;
}
export default makeUniformsSchema;
//# sourceMappingURL=makeUniformsSchema.js.map