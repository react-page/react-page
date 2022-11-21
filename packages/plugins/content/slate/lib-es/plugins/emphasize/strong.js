import React from 'react';
import { lazyLoad } from '@react-page/editor';
import createMarkPlugin from '../../pluginFactories/createMarkPlugin';
var BoldIcon = lazyLoad(function () { return import('@mui/icons-material/FormatBold'); });
export default createMarkPlugin({
    type: 'EMPHASIZE/STRONG',
    tagName: 'strong',
    icon: React.createElement(BoldIcon, null),
    label: 'Bold',
    hotKey: 'mod+b',
});
//# sourceMappingURL=strong.js.map