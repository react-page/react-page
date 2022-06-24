import type { CellPlugin } from '@react-page/editor';
import { lazyLoad } from '@react-page/editor';
import React from 'react';
import { defaultSettings } from './default/settings';
import DividerHtmlRenderer from './Renderer/DividerHtmlRenderer';

import type { DividerSettings } from './types/settings';

const Remove = lazyLoad(() => import('@mui/icons-material/Remove'));

const createPlugin: (settings: DividerSettings) => CellPlugin = (settings) => {
  const mergedSettings = { ...defaultSettings, ...settings };
  return {
    Renderer: settings.Renderer || DividerHtmlRenderer,
    id: 'ory/editor/core/content/divider',
    version: 1,
    icon: <Remove />,
    title: mergedSettings.translations?.pluginName,
    description: mergedSettings.translations?.pluginDescription,
  };
};

export default createPlugin;
