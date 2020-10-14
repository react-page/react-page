import { PluginBase } from '@react-page/core';
import * as React from 'react';
import Html5Video from './Component';
import { defaultSettings } from './default/settings';
import { Html5VideoProps } from './types/component';
import { Html5VideoSettings } from './types/settings';
import { Html5VideoState } from './types/state';

const rejectPromise: (e: Event) => Promise<void> = (e: Event) =>
  Promise.reject();

const createPlugin: (
  settings: Html5VideoSettings
) => PluginBase<Html5VideoState> = (settings) => {
  const mergedSettings = { ...defaultSettings, ...settings };
  const WrappedComponent: React.SFC<Html5VideoProps> = (props) => (
    <Html5Video {...props} {...mergedSettings} />
  );
  return {
    Component: WrappedComponent,
    name: 'ory/sites/plugin/content/html5-video',
    version: '0.0.1',
    text: mergedSettings.translations.pluginName,
    description: mergedSettings.translations.pluginDescription,
    IconComponent: mergedSettings.IconComponent,
    handleFocusNextHotKey: rejectPromise,
    handleFocusPreviousHotKey: rejectPromise,
    createInitialState: () => ({
      url: '',
    }),
  };
};

export default createPlugin;
