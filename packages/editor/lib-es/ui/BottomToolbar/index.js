var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
import React from 'react';
import { BottomToolbarDrawer } from './Drawer';
import { BottomToolbarMainBar } from './NodeTools';
import { ScaleButton } from './ScaleButton';
export * from './types';
export * from './Drawer';
export * from './NodeTools';
export * from './Tools';
export var BottomToolbar = React.memo(function (_a) {
    var _b = _a.open, open = _b === void 0 ? false : _b, className = _a.className, _c = _a.anchor, anchor = _c === void 0 ? 'bottom' : _c, pluginControls = _a.pluginControls, nodeId = _a.nodeId, actionsLeft = _a.actionsLeft, style = _a.style, children = _a.children;
    var _d = __read(React.useState(1), 2), scale = _d[0], setScale = _d[1];
    return (React.createElement(BottomToolbarDrawer, { className: className, open: open, anchor: anchor, scale: scale, style: style },
        children,
        pluginControls,
        React.createElement(BottomToolbarMainBar, { nodeId: nodeId, actionsLeft: __spreadArray([
                React.createElement(ScaleButton, { key: "scalebutton", scale: scale, setScale: setScale })
            ], __read(React.Children.toArray(actionsLeft)), false) })));
});
//# sourceMappingURL=index.js.map