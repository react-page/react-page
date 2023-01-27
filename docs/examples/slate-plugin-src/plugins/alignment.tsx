import { lazyLoad } from '@react-page/editor';
import React from 'react';
import createDataPlugin from '../pluginFactories/createDataPlugin';

const AlignLeftIcon = lazyLoad(
  () => import('@mui/icons-material/FormatAlignLeft')
);
const AlignCenterIcon = lazyLoad(
  () => import('@mui/icons-material/FormatAlignCenter')
);
const AlignRightIcon = lazyLoad(
  () => import('@mui/icons-material/FormatAlignRight')
);
const AlignJustifyIcon = lazyLoad(
  () => import('@mui/icons-material/FormatAlignJustify')
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
