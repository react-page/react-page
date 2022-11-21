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
import { ConditionalWrapper } from './ConditionalWrapper';
import { useTheme } from '@mui/material';
var IconButton = lazyLoad(function () { return import('@mui/material/IconButton'); });
var Tooltip = lazyLoad(function () { return import('@mui/material/Tooltip'); });
var ToolbarButton = function (_a) {
    var dark = _a.dark, icon = _a.icon, isActive = _a.isActive, onClick = _a.onClick, _b = _a.disabled, disabled = _b === void 0 ? false : _b, _c = _a.toolTip, toolTip = _c === void 0 ? '' : _c;
    var theme = useTheme();
    return (React.createElement(ConditionalWrapper, { condition: !disabled, wrapper: function (children) { return (React.createElement(Tooltip, { title: toolTip },
            React.createElement(React.Fragment, null, children))); } },
        React.createElement(IconButton, { onMouseDown: onClick, style: __assign({ transition: '0.3s' }, (isActive
                ? {
                    transform: 'scale(1.15)',
                    color: theme.palette.primary.main,
                }
                : disabled
                    ? { color: theme.palette.action.disabled }
                    : {
                        color: dark
                            ? theme.palette.common.white
                            : theme.palette.common.black,
                    })), disabled: disabled }, icon)));
};
export default React.memo(ToolbarButton);
//# sourceMappingURL=ToolbarButton.js.map