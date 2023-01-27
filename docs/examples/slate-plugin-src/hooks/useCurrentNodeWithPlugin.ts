import type { DataTType } from '@react-page/editor';
import type { NodeEntry } from 'slate';
import { Editor } from 'slate';

import { useSlate } from 'slate-react';
import type { SlatePluginDefinition } from '../types/slatePluginDefinitions';

export const getCurrentNodeWithPlugin = <T extends DataTType>(
  editor: Editor,
  plugin: SlatePluginDefinition<T>
): NodeEntry | null => {
  if (plugin.pluginType === 'custom') {
    return null;
  }

  const match =
    plugin.pluginType === 'component'
      ? plugin.object === 'mark'
        ? (elem: any) => Boolean(elem[plugin.type])
        : (elem: any) => elem.type === plugin.type
      : plugin.pluginType === 'data'
      ? // search for data
        ({ data }: any) => {
          const matches = plugin.dataMatches(data as T);

          return matches;
        }
      : null;
  if (!match) {
    return null;
  }
  try {
    const [matchingNode] = Editor.nodes(editor, {
      match: match,
      mode: 'lowest', // FIXME: whats the best value?
    });

    return matchingNode;
  } catch (e) {
    // seems to crash sometimes on redu
    return null;
  }
};
export default <T extends DataTType>(plugin: SlatePluginDefinition<T>) => {
  const editor = useSlate();
  return getCurrentNodeWithPlugin(editor, plugin);
};
