import React from 'react';
import { lazyLoad } from '@react-page/editor';
import createSimpleHtmlBlockPlugin from '../pluginFactories/createSimpleHtmlBlockPlugin';
var BlockquoteIcon = lazyLoad(function () { return import('@mui/icons-material/FormatQuote'); });
export default {
    blockQuote: createSimpleHtmlBlockPlugin({
        type: 'BLOCKQUOTE/BLOCKQUOTE',
        icon: React.createElement(BlockquoteIcon, null),
        label: 'Quote',
        tagName: 'blockquote',
    }),
};
//# sourceMappingURL=quotes.js.map