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
var PluginMissing = function (_a) {
    var children = _a.children, props = __rest(_a, ["children"]);
    return (React.createElement("div", null,
        React.createElement("div", { style: {
                backgroundColor: 'red',
                padding: '8px',
                border: '1px solid black',
                margin: '2px',
                overflowX: 'scroll',
            } },
            "The requested plugin `",
            props.pluginId,
            "` could not be found.",
            React.createElement("button", { onClick: props.remove }, "Delete Plugin"),
            React.createElement("pre", null, JSON.stringify(props, null, 2))),
        children));
};
export default PluginMissing;
//# sourceMappingURL=PluginMissing.js.map