import type { SlatePluginDefinition } from '../types/slatePluginDefinitions';
import useCurrentNodeWithPlugin from './useCurrentNodeWithPlugin';

export default <T>(plugin: SlatePluginDefinition<T>) => {
  const nodeEntry = useCurrentNodeWithPlugin<T>(plugin);
  return Boolean(nodeEntry);
};
