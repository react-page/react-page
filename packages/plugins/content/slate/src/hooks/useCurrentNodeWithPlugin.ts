import type { NodeEntry } from 'slate';
import { Editor } from 'slate';
import type { ReactEditor } from 'slate-react';
import { useSlate } from 'slate-react';
import type { SlatePluginDefinition } from '../types/slatePluginDefinitions';

export const getCurrentNodeWithPlugin = <T>(
  editor: ReactEditor,
  plugin: SlatePluginDefinition<T>
): NodeEntry => {
  if (plugin.pluginType === 'custom') {
    return null;
  }

  const match =
    plugin.pluginType === 'component'
      ? plugin.object === 'mark'
        ? (elem) => Boolean(elem[plugin.type])
        : (elem) => elem.type === plugin.type
      : plugin.pluginType === 'data'
      ? // search for data
        ({ data }) => {
          const matches = plugin.dataMatches(data as T);

          return matches;
        }
      : null;

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
export default <T>(plugin: SlatePluginDefinition<T>) => {
  const editor = useSlate();
  return getCurrentNodeWithPlugin(editor, plugin);
};
