import SlatePlugin from '../types/SlatePlugin';
import { SlateDataPluginDefinition } from '../types/slatePluginDefinitions';
import createBasePlugin from './createBasePlugin';

function createDataPluginWithDefinition<T extends {}>(
  pluginDefinition: SlateDataPluginDefinition<T>
): SlatePlugin {
  return {
    ...createBasePlugin<T>({ ...pluginDefinition, pluginType: 'data' }),
  };
}

function createDataPlugin<T = {}>(def: SlateDataPluginDefinition<T>) {
  const customizablePlugin = function<CT>(
    customize: (
      t: SlateDataPluginDefinition<T>
    ) => SlateDataPluginDefinition<T & CT> = d =>
      (d as unknown) as SlateDataPluginDefinition<T & CT>
  ) {
    return createDataPlugin(customize(def));
  };
  customizablePlugin.toPlugin = () => createDataPluginWithDefinition(def);
  return customizablePlugin;
}

export default createDataPlugin;
