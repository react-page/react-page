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
import createComponentPlugin from '../../pluginFactories/createComponentPlugin';
var Icon = lazyLoad(function () { return import('@mui/icons-material/Code'); });
var block = createComponentPlugin({
    type: 'CODE/CODE',
    object: 'block',
    icon: React.createElement(Icon, null),
    label: 'Code Block',
    addToolbarButton: true,
    addHoverButton: false,
    deserialize: {
        tagName: 'code',
    },
    Component: function (_a) {
        var children = _a.children, attributes = _a.attributes;
        return (React.createElement("code", __assign({}, attributes, { style: {
                display: 'block',
                overflow: 'scroll',
            } }), children));
    },
});
var mark = createComponentPlugin({
    type: 'CODE/CODE',
    object: 'mark',
    icon: React.createElement(Icon, null),
    label: 'Code',
    addHoverButton: true,
    addToolbarButton: false,
    deserialize: {
        tagName: 'code',
    },
    Component: function (_a) {
        var children = _a.children, attributes = _a.attributes;
        return (React.createElement("code", __assign({ style: { whiteSpace: 'pre-wrap' } }, attributes), children));
    },
});
export default {
    mark: mark,
    block: block,
};
//# sourceMappingURL=index.js.map