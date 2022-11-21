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
import { Paper } from '@mui/material';
import Editor from '@react-page/editor';
import React from 'react';
import { Labeled, useInput } from 'react-admin';
var RaReactPageInput = function (_a) {
    var _b = _a.label, label = _b === void 0 ? 'Content' : _b, source = _a.source, style = _a.style, editorProps = __rest(_a, ["label", "source", "style"]);
    var _c = useInput({ source: source }).input, value = _c.value, onChange = _c.onChange;
    return (React.createElement(Labeled, { label: label, source: source, fullWidth: true },
        React.createElement(React.Fragment, null,
            React.createElement(Paper, { elevation: 5, style: __assign({ overflow: 'visible', padding: 16, marginRight: 64 }, style) },
                React.createElement(Editor, __assign({ value: value, onChange: onChange }, editorProps))))));
};
export default RaReactPageInput;
//# sourceMappingURL=RaReactPageInput.js.map