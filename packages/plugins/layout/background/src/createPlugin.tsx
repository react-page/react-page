import * as React from 'react';

import { BackgroundSettings } from './types/settings';
import { BackgroundState } from './types/state';
import { BackgroundProps } from './types/component';
import BackgroundComponent from './Component';
import { defaultSettings } from './default/settings';
import { LayoutPluginConfig, lazyLoad } from '@react-page/core';

const Icon = lazyLoad(() => import('@material-ui/icons/CropLandscape'));

const createPlugin = (settings: BackgroundSettings) => {
  const mergedSettings = { ...defaultSettings, ...settings };
  const plugin: LayoutPluginConfig<BackgroundState> = {
    Component: (props: BackgroundProps) => (
      <BackgroundComponent {...props} {...mergedSettings} />
    ),

    name: 'ory/editor/core/layout/background',
    version: '0.0.1',

    text: mergedSettings.translations.pluginName,
    description: mergedSettings.translations.pluginDescription,
    IconComponent: <Icon />,

    createInitialChildren:
      settings.getInitialChildren ||
      (() => [[{ content: { plugin: settings.defaultPlugin } }]]),

    handleFocusNextHotKey: () => Promise.reject(),
    handleFocusPreviousHotKey: () => Promise.reject(),
  };
  return plugin;
};

export default createPlugin;
