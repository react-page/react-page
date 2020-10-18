import { CellPlugin, lazyLoad } from '@react-page/core';
import * as React from 'react';
import Spacer from './Component/index';
import { defaultSettings } from './default/settings';
import { SpacerProps } from './types/component';
import { SpacerSettings } from './types/settings';
import { SpacerState } from './types/state';

const AspectRatio = lazyLoad(() => import('@material-ui/icons/AspectRatio'));
const createPlugin: (settings: SpacerSettings) => CellPlugin<SpacerState> = (
  settings
) => {
  const mergedSettings = { ...defaultSettings, ...settings };
  const WrappedComponent: React.SFC<SpacerProps> = (props) => (
    <Spacer {...props} {...mergedSettings} />
  );
  return {
    Component: WrappedComponent,
    id: 'ory/editor/core/content/spacer',
    version: '0.0.1',
    IconComponent: <AspectRatio />,
    title: mergedSettings.translations.pluginName,
    description: mergedSettings.translations.pluginDescription,

    handleRemoveHotKey: (): Promise<void> => Promise.reject(),
    handleFocusPreviousHotKey: (): Promise<void> => Promise.reject(),
    handleFocusNextHotKey: (): Promise<void> => Promise.reject(),

    createInitialData: () => ({
      height: 24,
    }),
  };
};

export default createPlugin;
