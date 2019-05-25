import * as React from 'react';
import Remove from '@material-ui/icons/Remove';
import { ContentPluginConfig } from '@react-page/core/lib/service/plugin/classes';
import Divider from './Component';
import { DividerSettings } from './types/settings';
import { DividerProps } from './types/component';
import { DividerState } from './types/state';
import { defaultSettings } from './default/settings';

const createPlugin: (settings: DividerSettings) => ContentPluginConfig<DividerState> = (
  settings
) => {
  const mergedSettings = { ...defaultSettings, ...settings };
  const WrappedComponent: React.SFC<DividerProps> = props => <Divider {...props} {...mergedSettings} />;
  return {
    Component: WrappedComponent,
    StaticComponent: settings.Renderer,
    name: 'ory/editor/core/content/divider',
    version: '0.0.1',
    IconComponent: <Remove />,
    text: mergedSettings.translations.pluginName,
    description: mergedSettings.translations.pluginDescription,
  };
};

export default createPlugin;
