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

type CustomizeFunction<T extends {}> = (
  def: SlateDataPluginDefinition<T>
) => SlateDataPluginDefinition<T>;

function createDataPlugin<T extends {}>(
  definition: SlateDataPluginDefinition<T>
) {
  return (customize?: CustomizeFunction<T>): SlatePlugin => {
    return createDataPluginWithDefinition<T>(
      customize ? customize(definition) : definition
    );
  };
}

export default createDataPlugin;
