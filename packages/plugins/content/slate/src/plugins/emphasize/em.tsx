import React, { lazy } from 'react';

import createMarkPlugin from '../../pluginFactories/createMarkPlugin';

const ItalicIcon = lazy(() => import('@mui/icons-material/FormatItalic'));

export default createMarkPlugin({
  type: 'EMPHASIZE/EM',
  tagName: 'em',
  icon: <ItalicIcon />,
  label: 'Italic',
  hotKey: 'mod+i',
});
