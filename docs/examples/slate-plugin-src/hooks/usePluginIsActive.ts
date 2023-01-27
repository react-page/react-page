import type { DataTType } from '@react-page/editor';
import type { SlatePluginDefinition } from '../types/slatePluginDefinitions';
import useCurrentNodeWithPlugin from './useCurrentNodeWithPlugin';

export default <T extends DataTType>(plugin: SlatePluginDefinition<T>) => {
  const nodeEntry = useCurrentNodeWithPlugin<T>(plugin);
  return Boolean(nodeEntry);
};
