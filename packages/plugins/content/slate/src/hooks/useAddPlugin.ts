import { useCallback } from 'react';
import { Transforms } from 'slate';
import { ReactEditor, useSlate } from 'slate-react';
import { SlatePluginDefinition } from 'src/types/slatePluginDefinitions';
import { getCurrentNodeWithPlugin } from './useCurrentNodeWithPlugin';

export const addPlugin = <T>(
  editor: ReactEditor,
  plugin: SlatePluginDefinition<T>,
  props?: { data?: T; text?: string }
) => {
  const { data: passedData, text } = props || {};
  const node = getCurrentNodeWithPlugin(editor, plugin);
  if (text) {
    editor.insertText(text); // .moveFocusBackward(text.length);
  }

  const data =
    passedData || (plugin.getInitialData ? plugin.getInitialData() : null);
  const isActive = Boolean(node);

  if (isActive) {
    if (plugin.pluginType === 'component' && plugin.object === 'mark') {
      // readd mark
      editor.removeMark(plugin.type);
      editor.addMark(plugin.type, data);
    } else {
      // just udpate the data
      Transforms.setNodes(editor, data);
    }
  } else {
    // add new
    if (plugin.customAdd) {
      plugin.customAdd(editor);
    } else if (plugin.pluginType === 'component') {
      if (plugin.object === 'mark') {
        editor.addMark(plugin.type, data || true);
      } else {
        if (plugin.object === 'block' && plugin.replaceWithDefaultOnRemove) {
          Transforms.setNodes(editor, { type: plugin.type, ...data });
        } else {
          Transforms.wrapNodes(
            editor,
            {
              type: plugin.type,

              children: [],
              ...data,
            },
            { split: true }
          );
        }
      }
    } else if (plugin.pluginType === 'data') {
      Transforms.setNodes(editor, data);
    }
  }
};

export default <T>(plugin: SlatePluginDefinition<T>) => {
  const editor = useSlate();
  return useCallback(
    (props?: { data?: T; text?: string }) => addPlugin(editor, plugin, props),
    []
  );
};
