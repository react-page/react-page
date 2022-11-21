import createHeadingsPlugin from '../../pluginFactories/createHeadingsPlugin';
import { lazyLoad } from '@react-page/editor';
import React from 'react';
var H1Icon = lazyLoad(function () { return import('@mui/icons-material/LooksOne'); });
var H2Icon = lazyLoad(function () { return import('@mui/icons-material/LooksTwo'); });
var H3Icon = lazyLoad(function () { return import('@mui/icons-material/Looks3'); });
var H4Icon = lazyLoad(function () { return import('@mui/icons-material/Looks4'); });
var H5Icon = lazyLoad(function () { return import('@mui/icons-material/Looks5'); });
var H6Icon = lazyLoad(function () { return import('@mui/icons-material/Looks6'); });
export default {
    h1: createHeadingsPlugin({
        type: 'HEADINGS/HEADING-ONE',
        level: 1,
        icon: React.createElement(H1Icon, null),
    }),
    h2: createHeadingsPlugin({
        type: 'HEADINGS/HEADING-TWO',
        level: 2,
        icon: React.createElement(H2Icon, null),
    }),
    h3: createHeadingsPlugin({
        type: 'HEADINGS/HEADING-THREE',
        level: 3,
        icon: React.createElement(H3Icon, null),
    }),
    h4: createHeadingsPlugin({
        type: 'HEADINGS/HEADING-FOUR',
        level: 4,
        icon: React.createElement(H4Icon, null),
    }),
    h5: createHeadingsPlugin({
        type: 'HEADINGS/HEADING-FIVE',
        level: 5,
        icon: React.createElement(H5Icon, null),
    }),
    h6: createHeadingsPlugin({
        type: 'HEADINGS/HEADING-SIX',
        level: 6,
        icon: React.createElement(H6Icon, null),
    }),
};
//# sourceMappingURL=index.js.map