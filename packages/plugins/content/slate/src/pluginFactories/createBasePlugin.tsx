import React from 'react';
import PluginButton from './components/PluginButton';
import SlatePlugin from '../types/SlatePlugin';
import simpleToggleHotKeyHandler from './utils/simpleToggleHotKeyHandler';
import {
  SlatePluginDefinition,
  PluginButtonProps
} from '../types/slatePluginDefinitions';

function createBasePlugin<T extends {}>(
  pluginDefintion: SlatePluginDefinition<T>
): SlatePlugin {
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
