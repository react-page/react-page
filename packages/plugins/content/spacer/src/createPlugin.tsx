import {
  ContentPluginConfig,
  ContentPluginProps,
  lazyLoad,
} from '@react-page/core';
import * as React from 'react';
import Spacer from './Component/index';
import { defaultSettings } from './default/settings';
import { SpacerProps } from './types/component';
import { SpacerSettings } from './types/settings';
import { SpacerState } from './types/state';

const AspectRatio = lazyLoad(() => import('@material-ui/icons/AspectRatio'));
const createPlugin: (
  settings: SpacerSettings
) => ContentPluginConfig<SpacerState> = (settings) => {
  const mergedSettings = { ...defaultSettings, ...settings };
  const WrappedComponent: React.SFC<SpacerProps> = (props) => (
    <Spacer {...props} {...mergedSettings} />
  );
  return {
    Component: WrappedComponent,
    name: 'ory/editor/core/content/spacer',
    version: '0.0.1',
    IconComponent: <AspectRatio />,
    text: mergedSettings.translations.pluginName,
    description: mergedSettings.translations.pluginDescription,

    handleRemoveHotKey: (_: Event, __: ContentPluginProps): Promise<void> =>
      Promise.reject(),
    handleFocusPreviousHotKey: (
      _: Event,
      __: ContentPluginProps
    ): Promise<void> => Promise.reject(),
    handleFocusNextHotKey: (_: Event, __: ContentPluginProps): Promise<void> =>
      Promise.reject(),

    // We need this because otherwise we lose hotkey focus on elements like spoilers.
    // This could probably be solved in an easier way by listening to window.document?
    //
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    handleFocus: (props: any, source: any, ref: HTMLElement) => {
      if (!ref) {
        return;
      }
      setTimeout(() => ref.focus());
    },
    createInitialState: () => ({
      height: 24,
    }),
  };
};

export default createPlugin;
