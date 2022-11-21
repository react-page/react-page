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
import { useTheme } from '@mui/material';
import { Divider, Drawer, Portal } from '@mui/material';
import React, { Fragment } from 'react';
import { useIsSmallScreen } from '../../core/components/hooks';
var darkBlack = 'rgba(0, 0, 0, 0.87)';
var bright = 'rgba(255,255,255, 0.98)';
var brightBorder = 'rgba(0, 0, 0, 0.12)';
export var BottomToolbarDrawer = function (_a) {
    var className = _a.className, anchor = _a.anchor, open = _a.open, _b = _a.scale, scale = _b === void 0 ? 1 : _b, children = _a.children, _c = _a.style, style = _c === void 0 ? {} : _c;
    var divider = (React.createElement(Divider, { style: {
            marginLeft: -24,
            marginRight: -24,
            marginTop: 12,
            marginBottom: 12,
        } }));
    var theChildren = React.Children.toArray(children).filter(Boolean);
    var isSmall = useIsSmallScreen();
    var theme = useTheme();
    var dark = theme.palette.mode === 'dark';
    return (React.createElement(Portal, null,
        React.createElement(Drawer, { SlideProps: {
                mountOnEnter: true,
                unmountOnExit: true,
            }, variant: "persistent", className: className, open: open, anchor: anchor, PaperProps: {
                style: {
                    zIndex: 10,
                    backgroundColor: 'transparent',
                    border: 'none',
                    overflow: 'visible',
                    pointerEvents: 'none',
                },
            } },
            React.createElement("div", { style: __assign(__assign(__assign({ pointerEvents: 'all', border: "".concat(dark ? darkBlack : brightBorder, " 1px solid"), borderRadius: '4px 4px 0 0', backgroundColor: dark ? darkBlack : bright, padding: '12px 24px' }, (isSmall
                    ? {
                        marginLeft: 20,
                        marginRight: 80,
                    }
                    : {
                        marginLeft: 'auto',
                        marginRight: 'auto',
                        minWidth: '50vw',
                        maxWidth: 'min(1280px, calc(100vw - 250px))',
                    })), { boxShadow: '0px 1px 8px -1px rgba(0,0,0,0.4)', position: 'relative', transformOrigin: 'bottom', transform: "scale(".concat(scale, ")"), transition: 'scale 0.3s' }), style) }, theChildren.map(function (child, index) { return (React.createElement(Fragment, { key: index },
                child,
                index < theChildren.length - 1 ? divider : null)); })))));
};
//# sourceMappingURL=Drawer.js.map