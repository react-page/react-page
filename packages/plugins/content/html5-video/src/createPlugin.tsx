import { CellPlugin } from '@react-page/core';
import * as React from 'react';
import Html5Video from './Component';
import { defaultSettings } from './default/settings';
import { Html5VideoProps } from './types/component';
import { Html5VideoSettings } from './types/settings';
import { Html5VideoState } from './types/state';

const createPlugin: (
  settings: Html5VideoSettings
) => CellPlugin<Html5VideoState> = (settings) => {
  const mergedSettings = { ...defaultSettings, ...settings };
  const WrappedComponent: React.SFC<Html5VideoProps> = (props) => (
    <Html5Video {...props} {...mergedSettings} />
  );
  return {
    Component: WrappedComponent,
    id: 'ory/sites/plugin/content/html5-video',
    version: 1,
    title: mergedSettings.translations.pluginName,
    description: mergedSettings.translations.pluginDescription,
    IconComponent: mergedSettings.IconComponent,
    isInlineable: mergedSettings.isInlineable,
    createInitialData: () => ({
      url: '',
    }),
  };
};

export default createPlugin;
