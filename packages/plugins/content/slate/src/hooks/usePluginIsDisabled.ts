import { useState } from 'react';
import { useSlate } from 'slate-react';
import type { SlatePluginDefinition } from '../types/slatePluginDefinitions';

export default <T>(plugin: SlatePluginDefinition<T>): boolean => {
  try {
    const editor = useSlate();
    const [disabled, setDisabled] = useState(true);
    if (!editor) {
      return true;
    }
    if (plugin.isDisabled) {
      plugin.isDisabled(editor).then((d) => setDisabled(d));
      return disabled;
    } else {
      return false;
    }
  } catch (e) {
    // slate sometimes throws when dom node cant be found in undo
    return false;
  }
};
