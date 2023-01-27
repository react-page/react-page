import { Editor } from 'slate';

const getCurrentData = (editor: Editor): Record<string, unknown> => {
  const [existingNodeWithData] = Editor.nodes(editor, {
    mode: 'all',
    match: (node) => {
      return Boolean(node.data);
    },
  });
  const existingData = existingNodeWithData
    ? (existingNodeWithData[0]?.data as Record<string, unknown>)
    : {};

  return existingData;
};

export default getCurrentData;
