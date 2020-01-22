import { ContentPluginConfig, lazyLoad } from '@react-page/core';
import * as React from 'react';
import Divider from './Component';
import { defaultSettings } from './default/settings';
import { DividerProps } from './types/component';
import { DividerSettings } from './types/settings';
import { DividerState } from './types/state';

const Remove = lazyLoad(() => import('@material-ui/icons/Remove'));

const createPlugin: (
  settings: DividerSettings
) => ContentPluginConfig<DividerState> = settings => {
  const mergedSettings = { ...defaultSettings, ...settings };
  const WrappedComponent: React.SFC<DividerProps> = props => (
    <Divider {...props} {...mergedSettings} />
  );
  return {
    Component: WrappedComponent,
    name: 'ory/editor/core/content/divider',
    version: '0.0.1',
    IconComponent: <Remove />,
    text: mergedSettings.translations.pluginName,
    description: mergedSettings.translations.pluginDescription,
  };
};

export default createPlugin;
