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
import { lazyLoad } from '@react-page/editor';
import React from 'react';
var SpacerResizable = lazyLoad(function () { return import('./SpacerResizable'); });
var SpacerHtmlRenderer = function (props) {
    var _a;
    return (React.createElement("div", { className: 'react-page-plugins-content-spacer' }, props.isEditMode ? (React.createElement(SpacerResizable, __assign({}, props))) : (React.createElement("div", { style: { height: "".concat((((_a = props.data) === null || _a === void 0 ? void 0 : _a.height) || 0).toString(), "px") } }))));
};
export default SpacerHtmlRenderer;
//# sourceMappingURL=SpacerHtmlRenderer.js.map