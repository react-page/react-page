import { useSlate } from 'slate-react';
import { SlatePluginDefinition } from '../types/slatePluginDefinitions';
import { getCurrentNodeWithPlugin } from './useCurrentNodeWithPlugin';

export default <T>(plugin: SlatePluginDefinition<T>): T => {
  const editor = useSlate();
  const currentNode = getCurrentNodeWithPlugin(editor, plugin);
  if (currentNode) {
    const { children, type, ...data } = currentNode;
    return data as T;
  } else if (plugin.getInitialData) {
    return plugin.getInitialData();
  } else {
    return {} as T;
  }
};
