import { lazyLoad } from '@react-page/editor';
import React from 'react';
import createDataPlugin from '../pluginFactories/createDataPlugin';
var AlignLeftIcon = lazyLoad(function () { return import('@mui/icons-material/FormatAlignLeft'); });
var AlignCenterIcon = lazyLoad(function () { return import('@mui/icons-material/FormatAlignCenter'); });
var AlignRightIcon = lazyLoad(function () { return import('@mui/icons-material/FormatAlignRight'); });
var AlignJustifyIcon = lazyLoad(function () { return import('@mui/icons-material/FormatAlignJustify'); });
var left = createDataPlugin({
    icon: React.createElement(AlignLeftIcon, null),
    label: 'Align Left',
    object: 'block',
    addToolbarButton: true,
    addHoverButton: false,
    dataMatches: function (data) { return (data === null || data === void 0 ? void 0 : data.align) === 'left'; },
    getInitialData: function () { return ({ align: 'left' }); },
});
var center = createDataPlugin({
    icon: React.createElement(AlignCenterIcon, null),
    label: 'Align Center',
    object: 'block',
    addToolbarButton: true,
    addHoverButton: false,
    dataMatches: function (data) { return (data === null || data === void 0 ? void 0 : data.align) === 'center'; },
    getInitialData: function () { return ({ align: 'center' }); },
});
var right = createDataPlugin({
    icon: React.createElement(AlignRightIcon, null),
    label: 'Align Right',
    object: 'block',
    addToolbarButton: true,
    addHoverButton: false,
    dataMatches: function (data) { return (data === null || data === void 0 ? void 0 : data.align) === 'right'; },
    getInitialData: function () { return ({ align: 'right' }); },
});
var justify = createDataPlugin({
    icon: React.createElement(AlignJustifyIcon, null),
    label: 'Align Justify',
    object: 'block',
    addToolbarButton: true,
    addHoverButton: false,
    dataMatches: function (data) { return (data === null || data === void 0 ? void 0 : data.align) === 'justify'; },
    getInitialData: function () { return ({ align: 'justify' }); },
});
export default {
    left: left,
    center: center,
    right: right,
    justify: justify,
};
//# sourceMappingURL=alignment.js.map