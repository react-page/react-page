import { Transforms } from 'slate';
import { ReactEditor } from 'slate-react';
import HtmlToSlate from '../HtmlToSlate';
import { SlatePlugin } from '../types/SlatePlugin';

const withPaste = (plugins: SlatePlugin[]) => (editor: ReactEditor) => {
  const { insertData } = editor;
  const htmlToSlate = HtmlToSlate({ plugins });
  editor.insertData = data => {
    const html = data.getData('text/html');

    if (html) {
      const { slate } = htmlToSlate(html);

      Transforms.insertFragment(editor, slate);
      return;
    }

    insertData(data);
  };
  return editor;
};

export default withPaste;
