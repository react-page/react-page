import { ReactEditor } from 'slate-react';
import { Editor } from 'slate';

const getCurrentData = (editor: ReactEditor) => {
  const [existingNodeWithData] = Editor.nodes(editor, {
    mode: 'all',
    match: (node) => {
      return Boolean(node.data);
    },
  });
  const existingData = existingNodeWithData
    ? (existingNodeWithData[0]?.data as { [key: string]: unknown })
    : {};

  return existingData;
};

export default getCurrentData;
