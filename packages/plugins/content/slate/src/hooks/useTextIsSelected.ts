import { Editor } from 'slate';
import { useSlate } from 'slate-react';

const useTextIsSelected = () => {
  const editor = useSlate();
  try {
    return (
      Boolean(editor.selection) &&
      Editor.string(editor, editor.selection) !== ''
    );
  } catch (e) {
    // can in some cases throw currently
    return false;
  }
};

export default useTextIsSelected;
