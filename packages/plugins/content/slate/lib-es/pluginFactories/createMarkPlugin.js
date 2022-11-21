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
import createComponentPlugin from './createComponentPlugin';
export default (function (markDef) {
    return createComponentPlugin({
        type: markDef.type,
        object: 'mark',
        hotKey: markDef.hotKey,
        icon: markDef.icon,
        label: markDef.label,
        addToolbarButton: false,
        addHoverButton: true,
        deserialize: {
            tagName: markDef.tagName,
        },
        Component: function (_a) {
            var children = _a.children, attributes = _a.attributes;
            var Tag = markDef.tagName;
            return React.createElement(Tag, __assign({}, attributes), children);
        },
    });
});
//# sourceMappingURL=createMarkPlugin.js.map