import React from 'react';

import { lazyLoad } from '@react-page/editor';
import createMarkPlugin from '../../pluginFactories/createMarkPlugin';

const ItalicIcon = lazyLoad(() => import('@material-ui/icons/FormatItalic'));

export default createMarkPlugin({
  type: 'EMPHASIZE/EM',
  tagName: 'em',
  icon: <ItalicIcon />,
  label: 'Italic',
  hotKey: 'mod+i',
});
