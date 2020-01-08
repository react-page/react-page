import { useCallback } from 'react';
import { Editor, Transforms } from 'slate';
import { useSlate } from 'slate-react';
import { SlatePluginDefinition } from 'src/types/slatePluginDefinitions';

export const removePlugin = <T>(
  editor: Editor,
  plugin: SlatePluginDefinition<T>
) => {
  console.log('remove plgin', plugin);
  if (plugin.customRemove) {
    plugin.customRemove(editor);
  } else if (plugin.pluginType === 'component') {
    if (plugin.object === 'mark') {
      editor.removeMark(plugin.type);
    } else if (plugin.object === 'inline') {
      Transforms.setNodes(editor, { type: null });
    } else if (plugin.object === 'block') {
      if (plugin.replaceOnRemove) {
        Transforms.setNodes(editor, { type: plugin.replaceOnRemove });
      } else {
        Transforms.setNodes(editor, { type: null });
      }
    }
  } else {
    // not implemented yet for data type
  }
};
export default <T>(plugin: SlatePluginDefinition<T>) => {
  const editor = useSlate();
  return useCallback(() => removePlugin(editor, plugin), []);
};
