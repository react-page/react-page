import { ContentPluginConfig, PluginProps } from '@react-page/core';
import * as React from 'react';
import Spacer from './Component/index';
import { defaultSettings } from './default/settings';
import { VideoProps } from './types/component';
import { VideoSettings } from './types/settings';
import { VideoState } from './types/state';

const createPlugin: (
  settings: VideoSettings
) => ContentPluginConfig<VideoState> = (settings) => {
  const mergedSettings = { ...defaultSettings, ...settings };
  const WrappedComponent: React.SFC<VideoProps> = (props) => (
    <Spacer {...props} {...mergedSettings} />
  );
  return {
    Component: WrappedComponent,
    name: 'ory/editor/core/content/video',
    version: '0.0.1',
    IconComponent: mergedSettings.IconComponent,
    text: mergedSettings.translations.pluginName,
    description: mergedSettings.translations.pluginDescription,
    isInlineable: true,

    handleRemoveHotKey: (): Promise<void> => Promise.reject(),
    handleFocusPreviousHotKey: (): Promise<void> => Promise.reject(),
    handleFocusNextHotKey: (): Promise<void> => Promise.reject(),
  };
};

export default createPlugin;
