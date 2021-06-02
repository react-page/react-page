/* eslint-disable @typescript-eslint/ban-types */
import type { SlatePlugin } from '../types/SlatePlugin';
import type { SlateComponentPluginDefinition } from '../types/slatePluginDefinitions';

function createComponentPlugin<T extends Record<string, unknown>>(
  def: SlateComponentPluginDefinition<T>
) {
  const customizablePlugin = function <CT extends Record<string, unknown> = T>(
    customize: (
      t: SlateComponentPluginDefinition<T>
    ) => SlateComponentPluginDefinition<CT> = (d) =>
      (d as unknown) as SlateComponentPluginDefinition<CT>
  ) {
    return createComponentPlugin(customize(def));
  };
  customizablePlugin.toPlugin = (): SlatePlugin => ({
    ...def,
    pluginType: 'component',
  });
  return customizablePlugin;
}

export default createComponentPlugin;
