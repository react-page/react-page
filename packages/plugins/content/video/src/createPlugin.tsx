import { CellPlugin } from '@react-page/core';
import * as React from 'react';
import Spacer from './Component/index';
import { defaultSettings } from './default/settings';
import { VideoProps } from './types/component';
import { VideoSettings } from './types/settings';
import { VideoState } from './types/state';

const createPlugin: (settings: VideoSettings) => CellPlugin<VideoState> = (
  settings
) => {
  const mergedSettings = { ...defaultSettings, ...settings };
  const WrappedComponent: React.FC<VideoProps> = (props) => (
    <Spacer {...props} {...mergedSettings} />
  );
  return {
    Component: WrappedComponent,
    id: 'ory/editor/core/content/video',
    version: 1,
    IconComponent: mergedSettings.IconComponent,
    title: mergedSettings.translations.pluginName,
    description: mergedSettings.translations.pluginDescription,
    isInlineable: true,
  };
};

export default createPlugin;
