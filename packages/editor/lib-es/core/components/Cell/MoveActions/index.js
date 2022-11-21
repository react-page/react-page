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
import React from 'react';
import { MoveDown, MoveLeft, MoveRight, MoveUp, } from '../../../../ui/moveButtons';
var baseStyle = {
    position: 'absolute',
    margin: 0,
};
var MARGIN = 10;
var MoveActions = function (_a) {
    var nodeId = _a.nodeId;
    return (React.createElement("div", { className: "react-page-cell-move-actions", style: __assign({ left: 0, right: 0, bottom: 0, top: 0, zIndex: 100, pointerEvents: 'none' }, baseStyle) },
        React.createElement(MoveUp, { nodeId: nodeId, style: __assign(__assign({}, baseStyle), { top: MARGIN, left: '50%', transform: 'translateX(-50%)' }) }),
        React.createElement(MoveLeft, { nodeId: nodeId, style: __assign(__assign({}, baseStyle), { left: MARGIN, top: '50%', transform: 'translateY(-50%)' }) }),
        React.createElement(MoveRight, { nodeId: nodeId, style: __assign(__assign({}, baseStyle), { right: MARGIN, top: '50%', transform: 'translateY(-50%)' }) }),
        React.createElement(MoveDown, { nodeId: nodeId, style: __assign(__assign({}, baseStyle), { bottom: MARGIN, left: '50%', transform: 'translateX(-50%)' }) })));
};
export default MoveActions;
//# sourceMappingURL=index.js.map