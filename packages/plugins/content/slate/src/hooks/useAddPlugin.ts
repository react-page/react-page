import { useCallback } from 'react';
import { Transforms } from 'slate';
import { ReactEditor, useSlate } from 'slate-react';
import { SlatePluginDefinition } from '../types/slatePluginDefinitions';
import { getCurrentNodeWithPlugin } from './useCurrentNodeWithPlugin';
import { removePlugin } from './useRemovePlugin';

export const addPlugin = <T>(
  editor: ReactEditor,
  plugin: SlatePluginDefinition<T>,
  props?: { data?: T; text?: string }
) => {
  const { data: passedData, text } = props || {};
  const node = getCurrentNodeWithPlugin(editor, plugin);
  if (text) {
    editor.insertText(text);
    Transforms.select(editor, {
      anchor: editor.selection.anchor,
      focus: {
        ...editor.selection.focus,
        offset: editor.selection.focus.offset - text.length,
      },
    });
  }

  const data =
    passedData || (plugin.getInitialData ? plugin.getInitialData() : null);
  const isActive = Boolean(node);

  if (isActive) {
    // remove first and readd
    removePlugin(editor, plugin);
  }
  // add new
  if (plugin.customAdd) {
    plugin.customAdd(editor);
  } else if (plugin.pluginType === 'component') {
    if (plugin.object === 'mark') {
      editor.addMark(plugin.type, data || true);
    } else {
      if (plugin.object === 'block' && plugin.replaceWithDefaultOnRemove) {
        Transforms.setNodes(editor, { type: plugin.type, data });
      } else {
        Transforms.wrapNodes(
          editor,
          {
            type: plugin.type,

            children: [],
            data,
          },
          { split: true }
        );
        // workaround for inline problems in slate
        if (plugin.object === 'inline' && plugin.addExtraSpace) {
          Transforms.insertText(editor, ' ', {
            at: editor.selection.focus,
          });
        }
      }
    }
  } else if (plugin.pluginType === 'data') {
    Transforms.setNodes(editor, { data });
  }
};

export default <T>(plugin: SlatePluginDefinition<T>) => {
  const editor = useSlate();
  return useCallback(
    (props?: { data?: T; text?: string }) => addPlugin(editor, plugin, props),
    []
  );
};
