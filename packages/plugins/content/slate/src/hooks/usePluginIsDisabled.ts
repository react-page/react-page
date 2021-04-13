import { useSlate } from 'slate-react';
import type { SlatePluginDefinition } from '../types/slatePluginDefinitions';

export default <T>(plugin: SlatePluginDefinition<T>): boolean => {
  try {
    const editor = useSlate();
    if (!editor) {
      return true;
    }
    return plugin.isDisabled ? plugin.isDisabled(editor) : false;
  } catch (e) {
    // slate sometimes throws when dom node cant be found in undo
    return false;
  }
};
