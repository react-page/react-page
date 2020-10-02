import { ContentPluginConfig, ContentPluginProps } from '@react-page/core';
import * as React from 'react';
import Component from './Component/index';
import { defaultSettings } from './default/settings';
import { ImageSettings } from './types/settings';
import { ImageState } from './types/state';

const createPlugin = (
  settings?: ImageSettings
): ContentPluginConfig<ImageState> => {
  const mergedSettings = { ...defaultSettings, ...settings };
  return {
    Component: (props: ContentPluginProps<ImageState>) => (
      <Component {...props} {...mergedSettings} />
    ),

    name: 'ory/editor/core/content/image',
    version: '0.0.1',
    IconComponent: mergedSettings.IconComponent,
    text: mergedSettings.translations.pluginName,
    isInlineable: true,
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

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    handleFocus: (props: any, source: any, ref: HTMLElement) => {
      if (!ref) {
        return;
      }
      setTimeout(() => ref.focus());
    },
  };
};
export default createPlugin;
