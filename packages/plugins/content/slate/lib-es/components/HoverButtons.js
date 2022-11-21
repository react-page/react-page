import React, { useEffect, useRef } from 'react';
import { Portal } from 'react-portal';
import { useSlate } from 'slate-react';
import useTextIsSelected from '../hooks/useTextIsSelected';
import PluginButton from './PluginButton';
var HoverButtons = function (_a) {
    var plugins = _a.plugins, translations = _a.translations;
    var showHoverToolbar = useTextIsSelected();
    var toolbarRef = useRef(null);
    var editor = useSlate();
    useEffect(function () {
        var toolbar = toolbarRef.current;
        if (!showHoverToolbar || !toolbar) {
            return;
        }
        var s = window.getSelection();
        try {
            var oRange = s === null || s === void 0 ? void 0 : s.getRangeAt(0); // get the text range
            var oRect = oRange === null || oRange === void 0 ? void 0 : oRange.getBoundingClientRect();
            if (oRect) {
                var left = oRect.left, top_1 = oRect.top, width = oRect.width;
                toolbar.style.opacity = '1';
                toolbar.style.top = "".concat(top_1 + window.scrollY - toolbar.offsetHeight, "px");
                toolbar.style.left = "".concat(left + window.scrollX - toolbar.offsetWidth / 2 + width / 2, "px");
            }
        }
        catch (e) {
            // ignore
        }
    }, [editor, showHoverToolbar]);
    return (React.createElement(Portal, null,
        React.createElement("div", { className: 'react-page-plugins-content-slate-inline-toolbar ' +
                (showHoverToolbar
                    ? ''
                    : 'react-page-plugins-content-slate-inline-toolbar--hidden'), style: { padding: 0 }, ref: toolbarRef }, plugins &&
            plugins.map(function (plugin, i) {
                return plugin.addHoverButton ? (React.createElement(PluginButton, { dark: true, translations: translations, key: i, plugin: plugin })) : null;
            }))));
};
export default HoverButtons;
//# sourceMappingURL=HoverButtons.js.map