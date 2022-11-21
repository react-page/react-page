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
var LinkIcon = lazyLoad(function () { return import('@mui/icons-material/Link'); });
var link = createComponentPlugin({
    type: 'LINK/LINK',
    object: 'inline',
    icon: React.createElement(LinkIcon, null),
    label: 'Link',
    addHoverButton: true,
    addToolbarButton: true,
    controls: {
        type: 'autoform',
        schema: {
            type: 'object',
            required: ['href'],
            properties: {
                href: {
                    type: 'string',
                },
                openInNewWindow: {
                    type: 'boolean',
                },
            },
        },
    },
    deserialize: {
        tagName: 'a',
        getData: function (el) { return ({
            href: el.getAttribute('href') || '',
            openInNewWindow: el.getAttribute('target') === '_blank',
        }); },
    },
    Component: function (_a) {
        var children = _a.children, openInNewWindow = _a.openInNewWindow, href = _a.href, attributes = _a.attributes;
        return (React.createElement("a", __assign({}, attributes, { target: openInNewWindow ? '_blank' : undefined, href: href }), children));
    },
});
export default link;
//# sourceMappingURL=link.js.map