import {
  SlateComponentPluginDefinition,
  SlatePluginDefinition
} from '../types/slatePluginDefinitions';

function createComponentPlugin<T = {}>(def: SlateComponentPluginDefinition<T>) {
  const customizablePlugin = function<CT>(
    customize: (
      t: SlateComponentPluginDefinition<T>
    ) => SlateComponentPluginDefinition<T & CT> = d =>
      (d as unknown) as SlateComponentPluginDefinition<T & CT>
  ) {
    return createComponentPlugin(customize(def));
  };
  customizablePlugin.toPlugin = (): SlatePluginDefinition<T> => ({
    ...def,
    pluginType: 'component',
  });
  return customizablePlugin;
}

export default createComponentPlugin;
