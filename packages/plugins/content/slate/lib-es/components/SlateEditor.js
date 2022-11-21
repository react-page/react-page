import { lazyLoad, useAllFocusedNodeIds, useUiTranslator, } from '@react-page/editor';
import React from 'react';
import { Editable, useFocused, useSelected } from 'slate-react';
import { useDialogIsVisible } from './DialogVisibleProvider';
import { useOnKeyDown } from './hotkeyHooks';
import { useRenderElement, useRenderLeave } from './renderHooks';
var HoverButtons = lazyLoad(function () { return import('./HoverButtons'); });
var SlateEditable = React.memo(function (props) {
    var plugins = props.plugins, defaultPluginType = props.defaultPluginType, readOnly = props.readOnly, placeholder = props.placeholder;
    var injections = {
        useSelected: useSelected,
        useFocused: useFocused,
        readOnly: readOnly,
    };
    var renderElement = useRenderElement({ plugins: plugins, defaultPluginType: defaultPluginType, injections: injections }, []);
    var renderLeaf = useRenderLeave({ plugins: plugins, injections: injections }, []);
    var onKeyDown = useOnKeyDown({ plugins: plugins }, []);
    // this is required so that dialogs & controls don't mess with slate's selection
    var dialogVisible = useDialogIsVisible();
    var multipleNodesSelected = useAllFocusedNodeIds().length > 1;
    return (React.createElement(Editable, { placeholder: readOnly ? undefined : placeholder, readOnly: dialogVisible || readOnly || multipleNodesSelected, renderElement: renderElement, renderLeaf: renderLeaf, onKeyDown: readOnly ? undefined : onKeyDown }));
});
var SlateEditor = function (props) {
    var _a, _b;
    var plugins = props.plugins, focused = props.focused, readOnly = props.readOnly;
    var t = useUiTranslator().t;
    return (React.createElement(React.Fragment, null,
        !readOnly && focused && (React.createElement(HoverButtons, { plugins: props.plugins, translations: props.translations })),
        React.createElement(SlateEditable, { placeholder: (_b = t((_a = props.translations) === null || _a === void 0 ? void 0 : _a.placeholder)) !== null && _b !== void 0 ? _b : '', readOnly: readOnly, plugins: plugins, defaultPluginType: props.defaultPluginType })));
};
export default React.memo(SlateEditor);
//# sourceMappingURL=SlateEditor.js.map