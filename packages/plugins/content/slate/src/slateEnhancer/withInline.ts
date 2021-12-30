import type { Editor } from 'slate';
import type { SlatePlugin } from '../types/SlatePlugin';

const withInline = (plugins: SlatePlugin[]) => (editor: Editor) => {
  const { isInline, isVoid } = editor;
  editor.isInline = (element) => {
    return plugins.some(
      (plugin) =>
        plugin.pluginType === 'component' &&
        plugin.object === 'inline' &&
        plugin.type === element.type
    )
      ? true
      : isInline(element);
  };

  editor.isVoid = (element) => {
    return plugins.some(
      (plugin) =>
        plugin.pluginType === 'component' &&
        (plugin.object === 'block' || plugin.object === 'inline') &&
        plugin.type === element.type &&
        plugin.isVoid
    )
      ? true
      : isVoid(element);
  };
  return editor;
};

export default withInline;
