import React, { lazy } from 'react';

import createMarkPlugin from '../../pluginFactories/createMarkPlugin';

const BoldIcon = lazy(() => import('@mui/icons-material/FormatBold'));

export default createMarkPlugin({
  type: 'EMPHASIZE/STRONG',
  tagName: 'strong',
  icon: <BoldIcon />,
  label: 'Bold',
  hotKey: 'mod+b',
});
