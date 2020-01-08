import { SlatePluginDefinition } from 'src/types/slatePluginDefinitions';
import useCurrentNodeWithPlugin from './useCurrentNodeWithPlugin';

export default <T>(plugin: SlatePluginDefinition<T>) => {
  const node = useCurrentNodeWithPlugin<T>(plugin);
  return Boolean(node);
};
