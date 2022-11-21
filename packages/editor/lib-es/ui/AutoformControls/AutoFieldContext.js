import React from 'react';
import { AutoField } from '../uniform-mui';
var AutofieldContextProvider = function (_a) {
    var children = _a.children;
    return (React.createElement(AutoField.componentDetectorContext.Provider, { value: function (props, uniforms) {
            var _a, _b;
            var show = (_b = (_a = props.showIf) === null || _a === void 0 ? void 0 : _a.call(props, uniforms.model)) !== null && _b !== void 0 ? _b : true;
            if (!show)
                return function () { return null; };
            // see https://github.com/react-page/react-page/issues/1187
            // we remap props.component to props._customComponent to avoid the underlying issue in uniforms
            if (props._customComponent) {
                return props._customComponent;
            }
            return AutoField.defaultComponentDetector(props, uniforms);
        } }, children));
};
export default AutofieldContextProvider;
//# sourceMappingURL=AutoFieldContext.js.map