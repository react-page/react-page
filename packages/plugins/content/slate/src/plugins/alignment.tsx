import * as React from 'react';

import createDataPlugin from '../pluginFactories/createDataPlugin';
import { lazyLoad } from '@react-page/core';

const AlignLeftIcon = lazyLoad(() =>
  import('@material-ui/icons/FormatAlignLeft')
);
const AlignCenterIcon = lazyLoad(() =>
  import('@material-ui/icons/FormatAlignCenter')
);
const AlignRightIcon = lazyLoad(() =>
  import('@material-ui/icons/FormatAlignRight')
);
const AlignJustifyIcon = lazyLoad(() =>
  import('@material-ui/icons/FormatAlignJustify')
);

const left = createDataPlugin<{ align: 'left' }>({
  icon: <AlignLeftIcon />,
  object: 'block',
  addToolbarButton: true,
  addHoverButton: false,
  dataMatches: data => data.get('align') === 'left',
  getInitialData: () => ({ align: 'left' }),
});

const center = createDataPlugin<{ align: 'center' }>({
  icon: <AlignCenterIcon />,
  object: 'block',
  addToolbarButton: true,
  addHoverButton: false,
  dataMatches: data => data.get('align') === 'center',
  getInitialData: () => ({ align: 'center' }),
});

const right = createDataPlugin<{ align: 'right' }>({
  icon: <AlignRightIcon />,
  object: 'block',
  addToolbarButton: true,
  addHoverButton: false,
  dataMatches: data => data.get('align') === 'right',
  getInitialData: () => ({ align: 'right' }),
});

const justify = createDataPlugin<{ align: 'justify' }>({
  icon: <AlignJustifyIcon />,
  object: 'block',
  addToolbarButton: true,
  addHoverButton: false,
  dataMatches: data => data.get('align') === 'justify',
  getInitialData: () => ({ align: 'justify' }),
});

export default {
  left,
  center,
  right,
  justify,
};
