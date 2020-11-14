import isHotkey from 'is-hotkey';
import React, { DependencyList } from 'react';
import { useSlate } from 'slate-react';
import { addPlugin } from '../hooks/useAddPlugin';
import { getCurrentNodeWithPlugin } from '../hooks/useCurrentNodeWithPlugin';
import { removePlugin } from '../hooks/useRemovePlugin';
import { SlatePlugin } from '../types/SlatePlugin';

export const useOnKeyDown = (
  {
    plugins,
  }: {
    plugins: SlatePlugin[];
  },
  deps: DependencyList
) => {
  const editor = useSlate();

  return React.useCallback((event) => {
    plugins
      .filter((plugin) => plugin.hotKey)
      .forEach((plugin) => {
        if (isHotkey(plugin.hotKey, event)) {
          event.preventDefault();
          const node = getCurrentNodeWithPlugin(editor, plugin);
          if (node) {
            removePlugin(editor, plugin);
          } else {
            addPlugin(editor, plugin);
          }
        }
      });

    // we need to prevent slate from handling undo and redo
    if (isHotkey(['mod+z', 'mod+y'], event)) {
      event.preventDefault();
      return true;
    }

    if (isHotkey('shift+enter', event)) {
      event.preventDefault();
      editor.insertText('\n');
      return true;
    }
  }, deps);
};
