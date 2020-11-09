import * as React from 'react';

import { BackgroundSettings } from './types/settings';
import { BackgroundState } from './types/state';

import { defaultSettings } from './default/settings';
import { CellPlugin, lazyLoad } from '@react-page/editor';

const Icon = lazyLoad(() => import('@material-ui/icons/CropLandscape'));

const createPlugin = (settings: BackgroundSettings) => {
  const mergedSettings = { ...defaultSettings, ...settings };
  const Controls = mergedSettings.Controls;
  const Renderer = mergedSettings.Renderer;
  const plugin: CellPlugin<BackgroundState> = {
    controls: {
      type: 'custom',
      Component: (props) => <Controls {...props} {...mergedSettings} />,
    },
    Renderer: (props) => <Renderer {...props} {...mergedSettings} />,

    id: 'ory/editor/core/layout/background',
    version: 1,

    title: mergedSettings.translations.pluginName,
    description: mergedSettings.translations.pluginDescription,
    IconComponent: <Icon />,

    createInitialChildren: settings.getInitialChildren,
  };
  return plugin;
};

export default createPlugin;
