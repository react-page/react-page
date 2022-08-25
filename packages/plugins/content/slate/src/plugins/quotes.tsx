import React, { lazy } from 'react';

import createSimpleHtmlBlockPlugin from '../pluginFactories/createSimpleHtmlBlockPlugin';

const BlockquoteIcon = lazy(
  () => import('@mui/icons-material/FormatQuote')
);

export default {
  blockQuote: createSimpleHtmlBlockPlugin({
    type: 'BLOCKQUOTE/BLOCKQUOTE',
    icon: <BlockquoteIcon />,
    label: 'Quote',
    tagName: 'blockquote',
  }),
};
