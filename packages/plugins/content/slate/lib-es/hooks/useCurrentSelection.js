import { useSlate } from 'slate-react';
export default (function () {
    var editor = useSlate();
    return editor.selection;
});
//# sourceMappingURL=useCurrentSelection.js.map