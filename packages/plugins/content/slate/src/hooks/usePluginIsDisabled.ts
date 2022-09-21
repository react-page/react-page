import type { DataTType } from '@react-page/editor';
import { useEffect, useState } from 'react';
import { useSlate } from 'slate-react';
import type { SlatePluginDefinition } from '../types/slatePluginDefinitions';

export default <T extends DataTType>(
  plugin: SlatePluginDefinition<T>
): boolean => {
  const editor = useSlate();
  const [disabled, setDisabled] = useState(false);

  useEffect(() => {
    if (plugin.isDisabled) {
      try {
        plugin.isDisabled(editor).then((d) => {
          setDisabled(d);
        });
      } catch (e) {
        // slate sometimes throws when dom node cant be found in undo
      }
    }
  }, [editor.selection, plugin]);
  if (!editor) {
    return true;
  }
  return disabled;
};
