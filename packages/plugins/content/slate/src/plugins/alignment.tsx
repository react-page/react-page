import { lazyLoad } from '@react-page/editor';
import * as React from 'react';
import createDataPlugin from '../pluginFactories/createDataPlugin';

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
  label: 'Align Left',
  object: 'block',
  addToolbarButton: true,
  addHoverButton: false,
  dataMatches: (data) => data?.align === 'left',
  getInitialData: () => ({ align: 'left' }),
});

const center = createDataPlugin<{ align: 'center' }>({
  icon: <AlignCenterIcon />,
  label: 'Align Center',
  object: 'block',
  addToolbarButton: true,
  addHoverButton: false,
  dataMatches: (data) => data?.align === 'center',
  getInitialData: () => ({ align: 'center' }),
});

const right = createDataPlugin<{ align: 'right' }>({
  icon: <AlignRightIcon />,
  label: 'Align Right',
  object: 'block',
  addToolbarButton: true,
  addHoverButton: false,
  dataMatches: (data) => data?.align === 'right',
  getInitialData: () => ({ align: 'right' }),
});

const justify = createDataPlugin<{ align: 'justify' }>({
  icon: <AlignJustifyIcon />,
  label: 'Align Justify',
  object: 'block',
  addToolbarButton: true,
  addHoverButton: false,
  dataMatches: (data) => data?.align === 'justify',
  getInitialData: () => ({ align: 'justify' }),
});

export default {
  left,
  center,
  right,
  justify,
};
