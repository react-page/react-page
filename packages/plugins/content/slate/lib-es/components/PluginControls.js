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
import React, { useCallback, useEffect, useMemo, useRef, useState, } from 'react';
import { Range, Transforms } from 'slate';
import { useSlate } from 'slate-react';
import useAddPlugin from '../hooks/useAddPlugin';
import { getCurrentNodeDataWithPlugin } from '../hooks/useCurrentNodeDataWithPlugin';
import usePluginIsActive from '../hooks/usePluginIsActive';
import useRemovePlugin from '../hooks/useRemovePlugin';
import UniformsControls from '../pluginFactories/components/UniformsControls';
import { useSetDialogIsVisible } from './DialogVisibleProvider';
function PluginControls(props) {
    var _a, _b, _c, _d, _e, _f;
    var plugin = props.plugin;
    var storedPropsRef = useRef();
    var isVoid = plugin.pluginType === 'component' &&
        (plugin.object === 'inline' || plugin.object === 'block') &&
        plugin.isVoid;
    var shouldInsertWithText = !isVoid &&
        (!((_a = storedPropsRef === null || storedPropsRef === void 0 ? void 0 : storedPropsRef.current) === null || _a === void 0 ? void 0 : _a.selection) ||
            Range.isCollapsed((_b = storedPropsRef === null || storedPropsRef === void 0 ? void 0 : storedPropsRef.current) === null || _b === void 0 ? void 0 : _b.selection)) &&
        !((_c = storedPropsRef === null || storedPropsRef === void 0 ? void 0 : storedPropsRef.current) === null || _c === void 0 ? void 0 : _c.isActive);
    var addPlugin = useAddPlugin(plugin);
    var removePlugin = useRemovePlugin(plugin);
    var editor = useSlate();
    var setIsVisible = useSetDialogIsVisible();
    var _g = __read(useState(false), 2), _open = _g[0], _setOpen = _g[1];
    var isActive = usePluginIsActive(plugin);
    useEffect(function () {
        // this is to indicate that any dialog is visible
        setIsVisible === null || setIsVisible === void 0 ? void 0 : setIsVisible(props.open);
        _setOpen(props.open);
        if (props.open) {
            // we need to store the current state, when the dialog will open (but before it actually does)
            // this is also why we have a "delayed" _setOpen
            storedPropsRef.current = {
                selection: editor.selection,
                isActive: isActive,
                data: getCurrentNodeDataWithPlugin(editor, plugin),
            };
        }
        return function () {
            setIsVisible === null || setIsVisible === void 0 ? void 0 : setIsVisible(false);
        };
    }, [props.open, setIsVisible, _setOpen]);
    var controls = plugin.controls;
    var Controls = useMemo(function () {
        return controls
            ? controls.type === 'autoform'
                ? function (props) { return (React.createElement(UniformsControls, __assign({}, props, { schema: controls === null || controls === void 0 ? void 0 : controls.schema }))); }
                : controls.Component
            : UniformsControls;
    }, [controls]);
    var add = useCallback(function (p) {
        var _a, _b;
        if ((_a = storedPropsRef === null || storedPropsRef === void 0 ? void 0 : storedPropsRef.current) === null || _a === void 0 ? void 0 : _a.selection) {
            // restore selection before adding
            Transforms.select(editor, (_b = storedPropsRef === null || storedPropsRef === void 0 ? void 0 : storedPropsRef.current) === null || _b === void 0 ? void 0 : _b.selection);
        }
        addPlugin(p);
    }, [addPlugin]);
    var remove = useCallback(function () {
        // see https://github.com/ianstormtaylor/slate/issues/4240
        setTimeout(function () {
            var _a, _b;
            if ((_a = storedPropsRef === null || storedPropsRef === void 0 ? void 0 : storedPropsRef.current) === null || _a === void 0 ? void 0 : _a.selection) {
                // restore selection before removing
                Transforms.select(editor, (_b = storedPropsRef === null || storedPropsRef === void 0 ? void 0 : storedPropsRef.current) === null || _b === void 0 ? void 0 : _b.selection);
            }
            removePlugin();
        }, 100);
    }, [removePlugin]);
    return props.open ? (React.createElement(Controls, __assign({ pluginConfig: plugin, add: add, remove: remove, isActive: (_e = (_d = storedPropsRef === null || storedPropsRef === void 0 ? void 0 : storedPropsRef.current) === null || _d === void 0 ? void 0 : _d.isActive) !== null && _e !== void 0 ? _e : false, shouldInsertWithText: shouldInsertWithText, data: (_f = storedPropsRef === null || storedPropsRef === void 0 ? void 0 : storedPropsRef.current) === null || _f === void 0 ? void 0 : _f.data }, props))) : null;
}
export default React.memo(PluginControls);
//# sourceMappingURL=PluginControls.js.map