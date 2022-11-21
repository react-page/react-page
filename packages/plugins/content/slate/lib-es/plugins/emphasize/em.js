import React from 'react';
import { lazyLoad } from '@react-page/editor';
import createMarkPlugin from '../../pluginFactories/createMarkPlugin';
var ItalicIcon = lazyLoad(function () { return import('@mui/icons-material/FormatItalic'); });
export default createMarkPlugin({
    type: 'EMPHASIZE/EM',
    tagName: 'em',
    icon: React.createElement(ItalicIcon, null),
    label: 'Italic',
    hotKey: 'mod+i',
});
//# sourceMappingURL=em.js.map