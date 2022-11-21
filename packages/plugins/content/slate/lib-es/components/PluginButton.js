var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
import { useUiTranslator } from '@react-page/editor';
import React, { useCallback, useState } from 'react';
import { Range } from 'slate';
import { useSlate } from 'slate-react';
import useAddPlugin from '../hooks/useAddPlugin';
import usePluginIsActive from '../hooks/usePluginIsActive';
import usePluginIsDisabled from '../hooks/usePluginIsDisabled';
import useRemovePlugin from '../hooks/useRemovePlugin';
import PluginControls from './PluginControls';
import ToolbarButton from './ToolbarButton';
function PluginButton(props) {
    var _a, _b, _c, _d;
    var plugin = props.plugin, dark = props.dark;
    var t = useUiTranslator().t;
    var hasControls = Boolean(plugin.controls);
    var _e = __read(useState(false), 2), showControls = _e[0], setShowControls = _e[1];
    var editor = useSlate();
    var isActive = usePluginIsActive(plugin);
    var isVoid = plugin.pluginType === 'component' &&
        (plugin.object === 'inline' || plugin.object === 'block') &&
        plugin.isVoid;
    var shouldInsertWithText = plugin.pluginType === 'component' &&
        (plugin.object === 'inline' || plugin.object === 'mark') &&
        (!editor.selection || Range.isCollapsed(editor.selection)) &&
        !isActive &&
        !isVoid;
    var add = useAddPlugin(plugin);
    var remove = useRemovePlugin(plugin);
    var close = useCallback(function () { return setShowControls(false); }, [setShowControls]);
    var onClick = React.useCallback(function (e) {
        e.preventDefault();
        if (hasControls || shouldInsertWithText) {
            setShowControls(!showControls);
        }
        else {
            if (isActive) {
                remove();
            }
            else {
                add();
            }
        }
    }, [isActive, hasControls, showControls, shouldInsertWithText]);
    var isDisabled = usePluginIsDisabled(plugin);
    return (React.createElement(React.Fragment, null,
        React.createElement(ToolbarButton, { onClick: onClick, disabled: isDisabled, isActive: isActive, dark: dark, icon: (_a = plugin.icon) !== null && _a !== void 0 ? _a : (plugin.pluginType === 'component'
                ? (_c = (_b = plugin.deserialize) === null || _b === void 0 ? void 0 : _b.tagName) !== null && _c !== void 0 ? _c : ''
                : ''), toolTip: (_d = t(plugin.label)) !== null && _d !== void 0 ? _d : '' }),
        (hasControls || shouldInsertWithText) && showControls ? (React.createElement(PluginControls, __assign({}, props, { open: showControls, close: close }))) : null));
}
export default React.memo(PluginButton);
//# sourceMappingURL=PluginButton.js.map