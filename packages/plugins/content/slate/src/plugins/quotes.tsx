import React from 'react';
import { lazyLoad } from '@react-page/core';
import createSimpleHtmlBlockPlugin from '../pluginFactories/createSimpleHtmlBlockPlugin';

const BlockquoteIcon = lazyLoad(() => import('@material-ui/icons/FormatQuote'));

export default {
  blockQuote: createSimpleHtmlBlockPlugin({
    type: 'BLOCKQUOTE/BLOCKQUOTE',
    icon: <BlockquoteIcon />,
    tagName: 'blockquote',
  }),
};
