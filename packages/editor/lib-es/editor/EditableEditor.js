import React from 'react';
import Editable from '../core/components/Editable';
import GlobalHotKeys from '../core/components/HotKey/GlobalHotKeys';
import { createEmptyState } from '../core/EditorStore';
import Provider from '../core/Provider';
import EditorUI from '../ui/EditorUI';
import StickyWrapper from './StickyWrapper';
var EditableEditor = function (_a) {
    var value = _a.value, lang = _a.lang, children = _a.children, options = _a.options, renderOptions = _a.renderOptions, callbacks = _a.callbacks;
    var theValue = value || createEmptyState();
    return (React.createElement(Provider, { lang: lang, callbacks: callbacks, value: theValue, renderOptions: renderOptions, options: options },
        children,
        React.createElement(StickyWrapper, null, function (stickyNess) { return (React.createElement(React.Fragment, null,
            React.createElement(GlobalHotKeys, { focusRef: stickyNess.focusRef }),
            React.createElement(Editable, null),
            React.createElement(EditorUI, { stickyNess: stickyNess }))); })));
};
export default EditableEditor;
//# sourceMappingURL=EditableEditor.js.map