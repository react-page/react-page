import * as React from 'react';
import Remove from '@material-ui/icons/Remove';
import { ContentPluginConfig } from 'ory-editor-core/lib/service/plugin/classes';
import Divider from './Component';
import { DividerSettings } from './types/settings';
import { DividerProps } from './types/component';
import { DividerState } from './types/state';

const createPlugin: (settings: DividerSettings) => ContentPluginConfig<DividerState> = (
  settings = {
    Controls: () => <>Controls for this plugin were not provided</>,
    Renderer: () => <>Renderer for this plugin was not provided</>,
  }
) => {
  const WrappedComponent: React.SFC<DividerProps> = props => <Divider {...props} {...settings} />;
  return {
    Component: WrappedComponent,
    StaticComponent: settings.Renderer,
    name: 'ory/editor/core/content/divider',
    version: '0.0.1',
    IconComponent: <Remove />,
    text: 'Divider',
    description: 'A horizontal divider.',
  };
};

export default createPlugin;
