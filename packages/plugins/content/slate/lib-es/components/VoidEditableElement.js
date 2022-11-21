var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
import React, { useCallback, useState } from 'react';
import { Transforms } from 'slate';
import { ReactEditor, useSlateStatic } from 'slate-react';
import PluginControls from './PluginControls';
import { useSelected } from 'slate-react';
var VoidEditableElement = function (_a) {
    var plugin = _a.plugin, element = _a.element, component = _a.component;
    var _b = __read(useState(false), 2), showVoidDialog = _b[0], setShowVoidDialog = _b[1];
    var editor = useSlateStatic();
    var onVoidClick = useCallback(function (e) {
        e.stopPropagation();
        var path = ReactEditor.findPath(editor, element);
        setShowVoidDialog(true);
        Transforms.select(editor, path);
    }, [editor, element]);
    var closeVoidDialog = useCallback(function () { return setShowVoidDialog(false); }, []);
    var Element = plugin.object === 'inline' ? 'span' : 'div';
    var selected = useSelected();
    return (React.createElement(React.Fragment, null,
        showVoidDialog ? (React.createElement(PluginControls, { open: showVoidDialog, close: closeVoidDialog, plugin: plugin })) : null,
        React.createElement(Element, { onClick: onVoidClick, style: {
                cursor: 'pointer',
                outline: selected ? '1px dotted grey' : undefined,
            } },
            React.createElement(Element, { style: { pointerEvents: 'none' } }, component))));
};
export default VoidEditableElement;
//# sourceMappingURL=VoidEditableElement.js.map