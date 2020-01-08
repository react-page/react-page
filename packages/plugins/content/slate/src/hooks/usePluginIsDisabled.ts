import { useSlate } from 'slate-react';
import { SlatePluginDefinition } from 'src/types/slatePluginDefinitions';

export default <T>(plugin: SlatePluginDefinition<T>): boolean => {
  const editor = useSlate();
  if (!editor) {
    return true;
  }
  return plugin.isDisabled ? plugin.isDisabled(editor) : false;
};
