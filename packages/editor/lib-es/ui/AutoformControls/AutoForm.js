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
import React, { forwardRef } from 'react';
import { AutoForm } from 'uniforms';
import AutofieldContextProvider from './AutoFieldContext';
export default forwardRef(function (props, ref) { return (React.createElement(AutofieldContextProvider, null,
    React.createElement(AutoForm, __assign({}, props, { ref: ref })))); });
//# sourceMappingURL=AutoForm.js.map