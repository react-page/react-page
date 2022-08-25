import React, { lazy } from 'react';

import createMarkPlugin from '../../pluginFactories/createMarkPlugin';

const UnderlinedIcon = lazy(
  () => import('@mui/icons-material/FormatUnderlined')
);

export default createMarkPlugin({
  type: 'EMPHASIZE/U',
  tagName: 'u',
  icon: <UnderlinedIcon />,
  label: 'Underline',
  hotKey: 'mod+u',
});
