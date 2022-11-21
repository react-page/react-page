import React from 'react';
import { lazyLoad } from '@react-page/editor';
import createMarkPlugin from '../../pluginFactories/createMarkPlugin';
var UnderlinedIcon = lazyLoad(function () { return import('@mui/icons-material/FormatUnderlined'); });
export default createMarkPlugin({
    type: 'EMPHASIZE/U',
    tagName: 'u',
    icon: React.createElement(UnderlinedIcon, null),
    label: 'Underline',
    hotKey: 'mod+u',
});
//# sourceMappingURL=underline.js.map