import { Editor } from 'slate';
import { useSlate } from 'slate-react';
var useTextIsSelected = function () {
    var editor = useSlate();
    try {
        return Boolean(editor.selection && Editor.string(editor, editor.selection) !== '');
    }
    catch (e) {
        // can in some cases throw currently
        return false;
    }
};
export default useTextIsSelected;
//# sourceMappingURL=useTextIsSelected.js.map