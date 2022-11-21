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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import propisValid from '@emotion/is-prop-valid';
import { lazyLoad } from '@react-page/editor';
import isObject from 'lodash.isobject';
import React, { useCallback } from 'react';
import { getTextContents } from '../utils/getTextContent';
import { useComponentMarkPlugins, useComponentNodePlugins, } from './pluginHooks';
// lazy load as it uses slate library. We don't want to bundle that in readonly mode
var VoidEditableElement = lazyLoad(function () { return import('./VoidEditableElement'); });
var pickNativeProps = function (data) {
    if (!data || !isObject(data)) {
        return {};
    }
    return Object.keys(data).reduce(function (acc, key) {
        var _a;
        if (propisValid(key)) {
            return __assign(__assign({}, acc), (_a = {}, _a[key] = data[key], _a));
        }
        return acc;
    }, {});
};
var STATIC_INJECTIONS = {
    useFocused: function () { return false; },
    useSelected: function () { return false; },
    readOnly: true,
};
export var useRenderElement = function (_a, deps) {
    var plugins = _a.plugins, defaultPluginType = _a.defaultPluginType, _b = _a.injections, injections = _b === void 0 ? STATIC_INJECTIONS : _b;
    var componentPlugins = useComponentNodePlugins({ plugins: plugins }, deps);
    return useCallback(function (_a) {
        var _b;
        var element = _a.element, children = _a.children, attributes = _a.attributes;
        var type = element.type, _c = element.data, data = _c === void 0 ? {} : _c, childNodes = element.children;
        var matchingPlugin = (_b = componentPlugins.find(function (plugin) { return plugin.type === type; })) !== null && _b !== void 0 ? _b : componentPlugins.find(function (plugin) { return plugin.type === defaultPluginType; });
        if (matchingPlugin) {
            var Component = matchingPlugin.Component, getStyle = matchingPlugin.getStyle;
            var style = getStyle ? getStyle(data || {}) : undefined;
            var baseProps = {
                children: children,
                style: style,
            };
            if (typeof Component === 'string' || Component instanceof String) {
                var nativePropsInData = pickNativeProps(data);
                // simple component like "p"
                return (React.createElement(Component, __assign({}, attributes, baseProps, nativePropsInData)));
            }
            Component.displayName = 'SlatePlugin(' + matchingPlugin.type + ')';
            // usefull in certain cases
            var additionalProps = __assign({ childNodes: childNodes, getTextContents: function () {
                    return getTextContents(childNodes, {
                        slatePlugins: plugins,
                    });
                } }, injections);
            var component = (React.createElement(Component, __assign({}, baseProps, data, { 
                // attributes have to be spread in manually because of ref problem
                attributes: attributes }, additionalProps)));
            var isVoid = (matchingPlugin.object === 'inline' ||
                matchingPlugin.object === 'block') &&
                matchingPlugin.isVoid;
            // if block is void, we still need to render children due to some quirks of slate
            if (isVoid && !injections.readOnly) {
                var Element_1 = matchingPlugin.object === 'inline' ? 'span' : 'div';
                return (React.createElement(Element_1, __assign({}, attributes, { contentEditable: false }),
                    children,
                    React.createElement(VoidEditableElement, { component: component, element: element, plugin: matchingPlugin })));
            }
            return component;
        }
        return React.createElement("p", null,
            "unknown component ",
            type);
    }, deps);
};
export var useRenderLeave = function (_a, deps) {
    var plugins = _a.plugins, _b = _a.injections, injections = _b === void 0 ? STATIC_INJECTIONS : _b, _c = _a.readOnly, readOnly = _c === void 0 ? false : _c;
    var markPlugins = useComponentMarkPlugins({ plugins: plugins }, deps);
    return useCallback(function (_a) {
        var _b = _a.leaf, text = _b.text, leaveTypes = __rest(_b, ["text"]), attributes = _a.attributes, children = _a.children;
        // we reduce number of dom elements by avoiding having another span. Its required in edit mode though for slate to work
        var Wrapper = readOnly ? React.Fragment : 'span';
        return (React.createElement(Wrapper, __assign({}, attributes), Object.keys(leaveTypes).reduce(function (el, type) {
            var matchingPlugin = markPlugins.find(function (plugin) { return plugin.type === type; });
            if (matchingPlugin) {
                var Component = matchingPlugin.Component, getStyle = matchingPlugin.getStyle;
                var dataRaw = leaveTypes[type]; // usually boolean
                var data = isObject(dataRaw) ? dataRaw : {};
                var style = getStyle ? getStyle(data) : undefined;
                if (typeof Component === 'string' ||
                    Component instanceof String) {
                    var nativePropsInData = pickNativeProps(data);
                    return (React.createElement(Component, __assign({}, nativePropsInData, { style: style }), el));
                }
                return (React.createElement(Component, __assign({ childNodes: [{ text: text }], getTextContents: function () { return [text]; }, useSelected: injections.useSelected, useFocused: injections.useFocused, style: style }, data), el));
            }
            return el;
        }, children)));
    }, deps);
};
//# sourceMappingURL=renderHooks.js.map