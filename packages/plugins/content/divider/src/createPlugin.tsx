import { CellPlugin, lazyLoad } from '@react-page/editor';
import * as React from 'react';
import { defaultSettings } from './default/settings';
import DividerHtmlRenderer from './Renderer/DividerHtmlRenderer';

import { DividerSettings } from './types/settings';

const Remove = lazyLoad(() => import('@material-ui/icons/Remove'));

const createPlugin: (settings: DividerSettings) => CellPlugin<void> = (
  settings
) => {
  const mergedSettings = { ...defaultSettings, ...settings };
  return {
    Renderer: settings.Renderer || DividerHtmlRenderer,
    id: 'ory/editor/core/content/divider',
    version: 1,
    IconComponent: <Remove />,
    title: mergedSettings.translations.pluginName,
    description: mergedSettings.translations.pluginDescription,
  };
};

export default createPlugin;
