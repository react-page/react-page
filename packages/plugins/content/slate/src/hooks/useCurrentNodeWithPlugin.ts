import { Editor, Element } from 'slate';
import { ReactEditor, useSlate } from 'slate-react';
import { SlatePluginDefinition } from '../types/slatePluginDefinitions';

export const getCurrentNodeWithPlugin = <T>(
  editor: ReactEditor,
  plugin: SlatePluginDefinition<T>
): Element => {
  if (plugin.pluginType === 'custom') {
    return null;
  }

  const match =
    plugin.pluginType === 'component'
      ? plugin.object === 'mark'
        ? elem => elem[plugin.type]
        : elem => elem.type === plugin.type
      : plugin.pluginType === 'data'
      ? // search for data
        ({ data }) => {
          // tslint:disable-next-line:no-any
          const matches = plugin.dataMatches(data as any);

          return matches;
        }
      : null;

  try {
    const [matchingNode] = Editor.nodes(editor, {
      match: match,
      mode: 'lowest', // FIXME: whats the best value?
    });

    return matchingNode?.[0] as Element;
  } catch (e) {
    // seems to crash sometimes on redu
    return null;
  }
};
export default <T>(plugin: SlatePluginDefinition<T>) => {
  const editor = useSlate();
  return getCurrentNodeWithPlugin(editor, plugin);
};
