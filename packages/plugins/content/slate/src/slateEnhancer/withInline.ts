import { Editor } from 'slate';
import { SlatePlugin } from '../types/SlatePlugin';

const withInline = (plugins: SlatePlugin[]) => (editor: Editor) => {
  const { isInline } = editor;
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
  return editor;
};

export default withInline;
