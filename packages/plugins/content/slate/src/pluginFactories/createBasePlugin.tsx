import React from 'react';

import SlatePlugin from '../types/SlatePlugin';
import simpleToggleHotKeyHandler from './utils/simpleToggleHotKeyHandler';
import {
  SlatePluginDefinition,
  PluginButtonProps
} from '../types/slatePluginDefinitions';
import { lazyLoad } from '@react-page/core';

function createBasePlugin<T extends {}>(
  pluginDefintion: SlatePluginDefinition<T>
): SlatePlugin {
  const PluginButton = lazyLoad(
    () =>
      (import('./components/PluginButton') as unknown) as Promise<
        React.ComponentType<
          PluginButtonProps & { config: SlatePluginDefinition<T> }
        >
      >
  );
  const Button = (props: PluginButtonProps) => (
    <PluginButton {...props} config={pluginDefintion} />
  );

  return {
    onKeyDown:
      pluginDefintion.onKeyDown || pluginDefintion.hotKey
        ? simpleToggleHotKeyHandler<T>(pluginDefintion)
        : (e, editor, next) => next(),

    hoverButtons: pluginDefintion.addHoverButton ? [Button] : [],
    toolbarButtons: pluginDefintion.addToolbarButton ? [Button] : [],
  };
}

export default createBasePlugin;
