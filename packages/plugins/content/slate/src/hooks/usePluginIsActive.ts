import { SlatePluginDefinition } from 'src/types/slatePluginDefinitions';
import useCurrentNodeWithPlugin from './useCurrentNodeWithPlugin';

export default <T>(plugin: SlatePluginDefinition<T>) => {
  return Boolean(useCurrentNodeWithPlugin<T>(plugin));
};
