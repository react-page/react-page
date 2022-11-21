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
import { Fab } from '@mui/material';
import React from 'react';
import IconUp from '@mui/icons-material/ArrowDropUp';
import IconDown from '@mui/icons-material/ArrowDropDown';
import IconRight from '@mui/icons-material/ArrowRight';
import IconLeft from '@mui/icons-material/ArrowLeft';
import { useMoveNodeDown, useMoveNodeUp, useMoveNodeLeft, useMoveNodeRight, } from '../../core/components/hooks';
var Base = function (_a) {
    // don't show at all
    var onClick = _a.onClick, icon = _a.icon, style = _a.style;
    return (React.createElement(Fab, { disabled: !onClick, style: __assign({ margin: 10, pointerEvents: 'all' }, style), size: "small", onClick: onClick !== null && onClick !== void 0 ? onClick : undefined, color: "default" }, icon));
};
export var MoveUp = function (_a) {
    var nodeId = _a.nodeId, style = _a.style;
    var moveUp = useMoveNodeUp(nodeId);
    return React.createElement(Base, { onClick: moveUp, icon: React.createElement(IconUp, null), style: style });
};
export var MoveDown = function (_a) {
    var nodeId = _a.nodeId, style = _a.style;
    var moveDown = useMoveNodeDown(nodeId);
    return React.createElement(Base, { onClick: moveDown, icon: React.createElement(IconDown, null), style: style });
};
export var MoveLeft = function (_a) {
    var nodeId = _a.nodeId, style = _a.style;
    var moveLeft = useMoveNodeLeft(nodeId);
    return React.createElement(Base, { onClick: moveLeft, icon: React.createElement(IconLeft, null), style: style });
};
export var MoveRight = function (_a) {
    var nodeId = _a.nodeId, style = _a.style;
    var moveRight = useMoveNodeRight(nodeId);
    return React.createElement(Base, { onClick: moveRight, icon: React.createElement(IconRight, null), style: style });
};
//# sourceMappingURL=index.js.map