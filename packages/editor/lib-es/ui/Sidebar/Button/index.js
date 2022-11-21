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
import React from 'react';
import Fab from '@mui/material/Fab';
import { useIsSmallScreen } from '../../../core/components/hooks';
var DisplayModeToggle = function (_a) {
    var description = _a.description, icon = _a.icon, onClick = _a.onClick, active = _a.active, disabled = _a.disabled, _b = _a.activeColor, activeColor = _b === void 0 ? 'secondary' : _b, style = _a.style, rest = __rest(_a, ["description", "icon", "onClick", "active", "disabled", "activeColor", "style"]);
    var isSmall = useIsSmallScreen();
    return (React.createElement("div", { className: "react-page-controls-mode-toggle-button", style: style },
        React.createElement("div", { className: "react-page-controls-mode-toggle-button-inner" },
            React.createElement(Fab, __assign({ color: active ? activeColor : 'default', size: isSmall ? 'small' : 'large', onClick: onClick, disabled: disabled }, rest), icon)),
        React.createElement("div", { className: "react-page-controls-mode-toggle-button-description" }, description)));
};
export default DisplayModeToggle;
//# sourceMappingURL=index.js.map