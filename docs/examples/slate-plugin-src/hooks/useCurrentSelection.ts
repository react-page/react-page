import { useSlate } from 'slate-react';

export default () => {
  const editor = useSlate();
  return editor.selection;
};
