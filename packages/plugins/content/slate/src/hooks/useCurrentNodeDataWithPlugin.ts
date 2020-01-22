import { ReactEditor, useSlate } from 'slate-react';
import { SlatePluginDefinition } from '../types/slatePluginDefinitions';
import { getCurrentNodeWithPlugin } from './useCurrentNodeWithPlugin';

export const getCurrentNodeDataWithPlugin = <T>(
  editor: ReactEditor,
  plugin: SlatePluginDefinition<T>
): T => {
  const currentNode = getCurrentNodeWithPlugin(editor, plugin);

  if (currentNode) {
    if (plugin.pluginType === 'component' && plugin.object === 'mark') {
      return currentNode[plugin.type] as T;
    }
    const { data } = currentNode;
    return data as T;
  } else if (plugin.getInitialData) {
    return plugin.getInitialData();
  } else {
    return {} as T;
  }
};

export default <T>(plugin: SlatePluginDefinition<T>): T => {
  const editor = useSlate();
  return getCurrentNodeDataWithPlugin(editor, plugin);
};
