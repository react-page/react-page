/* eslint-disable @typescript-eslint/ban-types */
import type { SlatePlugin } from '../types/SlatePlugin';
import type { SlateDataPluginDefinition } from '../types/slatePluginDefinitions';

function createDataPlugin<T extends Record<string, unknown>>(
  def: SlateDataPluginDefinition<T>
) {
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
