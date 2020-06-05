/* eslint-disable @typescript-eslint/ban-types */
import { SlatePlugin } from '../types/SlatePlugin';
import { SlateDataPluginDefinition } from '../types/slatePluginDefinitions';

function createDataPlugin<T = {}>(def: SlateDataPluginDefinition<T>) {
  const customizablePlugin = function <CT>(
    customize: (
      t: SlateDataPluginDefinition<T>
    ) => SlateDataPluginDefinition<T & CT> = (d) =>
      (d as unknown) as SlateDataPluginDefinition<T & CT>
  ) {
    return createDataPlugin(customize(def));
  };
  customizablePlugin.toPlugin = (): SlatePlugin => ({
    pluginType: 'data',
    ...def,
  });
  return customizablePlugin;
}

export default createDataPlugin;
