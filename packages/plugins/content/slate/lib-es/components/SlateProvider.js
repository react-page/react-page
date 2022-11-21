import { deepEquals } from '@react-page/editor';
import React, { useCallback, useEffect, useMemo } from 'react';
import { createEditor, Transforms } from 'slate';
import { ReactEditor, Slate, withReact } from 'slate-react';
import withInline from '../slateEnhancer/withInline';
import withPaste from '../slateEnhancer/withPaste';
import DialogVisibleProvider from './DialogVisibleProvider';
var SlateProvider = function (props) {
    var data = props.data, plugins = props.plugins, children = props.children, defaultPluginType = props.defaultPluginType;
    var editor = useMemo(function () {
        return withPaste(plugins, defaultPluginType)(withReact(withInline(plugins)(createEditor())));
    }, []);
    useEffect(function () {
        // unfortunatly, slate broke the controlled input pattern. So we have to hack our way around it, see https://github.com/ianstormtaylor/slate/issues/4992
        editor.children = data === null || data === void 0 ? void 0 : data.slate;
        if (data.selection) {
            try {
                ReactEditor.focus(editor);
            }
            catch (e) {
                // ignore, can happen
            }
            // update seleciton, if changed from outside (e.g. through undo)
            Transforms.select(editor, data.selection);
        }
        else {
            // deselect, otherwise slate might throw an eerror if cursor is now on a non existing dom node
            Transforms.deselect(editor);
        }
    }, [data === null || data === void 0 ? void 0 : data.slate, data === null || data === void 0 ? void 0 : data.selection]);
    var onChange = useCallback(function (v) {
        if (!deepEquals(editor.children, data === null || data === void 0 ? void 0 : data.slate) ||
            !deepEquals(editor.selection, data === null || data === void 0 ? void 0 : data.selection))
            props.onChange({
                slate: editor.children,
                selection: editor.selection,
            }, {
                // mark as not undoable when state is same
                // that happens if only selection was changed
                notUndoable: deepEquals(editor.children, data === null || data === void 0 ? void 0 : data.slate),
            });
    }, [data === null || data === void 0 ? void 0 : data.slate]);
    var initialValue = data === null || data === void 0 ? void 0 : data.slate;
    return (React.createElement(DialogVisibleProvider, null,
        React.createElement(Slate, { editor: editor, value: initialValue /*
        this is confusingly only for the initial value since slate 0.70something, see https://github.com/ianstormtaylor/slate/issues/4992
      */, onChange: onChange }, children)));
};
export default SlateProvider;
//# sourceMappingURL=SlateProvider.js.map