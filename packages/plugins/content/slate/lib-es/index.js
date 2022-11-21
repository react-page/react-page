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
import { lazyLoad } from '@react-page/editor';
import React from 'react';
import ReadOnlySlate from './components/ReadOnlySlate';
import { defaultTranslations } from './default/settings';
import { HtmlToSlate } from './htmlToSlate';
import v002 from './migrations/v002';
import v003 from './migrations/v003';
import v004 from './migrations/v004';
import * as pluginFactories from './pluginFactories/index';
import defaultPlugins from './plugins/index';
import { getTextContents } from './utils/getTextContent';
import makeSlatePluginsFromDef from './utils/makeSlatePluginsFromDef';
import transformInitialSlateState from './utils/transformInitialSlateState';
import { useSafeSetState } from './utils/useSafeSetState';
var slatePlugins = defaultPlugins;
export { defaultPlugins, slatePlugins, pluginFactories, HtmlToSlate, };
var SlateEditor = lazyLoad(function () { return import('./components/SlateEditor'); });
var Subject = lazyLoad(function () { return import('@mui/icons-material/Subject'); });
var Controls = lazyLoad(function () { return import('./components/Controls'); });
var SlateProvider = lazyLoad(function () { return import('./components/SlateProvider'); });
var migrations = [v002, v003, v004];
export var DEFAULT_SLATE_PLUGIN_ID = 'ory/editor/core/content/slate';
var defaultConfig = {
    icon: React.createElement(Subject, null),
    plugins: defaultPlugins,
    defaultPluginType: 'PARAGRAPH/PARAGRAPH',
    id: DEFAULT_SLATE_PLUGIN_ID,
    version: 1,
    translations: defaultTranslations,
    migrations: migrations,
    allowInlineNeighbours: true,
};
function plugin(customize) {
    var settings = (customize ? customize(defaultConfig) : defaultConfig);
    var createData = function (customizer) {
        if (!customizer) {
            return { slate: [] };
        }
        return transformInitialSlateState(customizer({ plugins: settings.plugins }));
    };
    var createInitialData = function () {
        return createData(function (_a) {
            var plugins = _a.plugins;
            return ({
                children: [
                    {
                        plugin: plugins.paragraphs.paragraph,
                        children: [''],
                    },
                ],
            });
        });
    };
    // plugins should be flatten
    // NEW: to make it easier to manage and group plugins,
    // they now need to be an object of object with group and keys, see type SlatePluginCollection
    var plugins = makeSlatePluginsFromDef(settings.plugins);
    var htmlToSlate = HtmlToSlate({ plugins: plugins });
    return {
        Renderer: function (props) {
            var allProps = __assign(__assign({}, props), { plugins: plugins, translations: settings.translations, defaultPluginType: settings.defaultPluginType });
            /* we need a small fix to avoid flashing when SSR in edit mode:
            we code split the Provider AND the editor version, but we have to make sure to not render the editor without the provider:
            */
            var _a = __read(useSafeSetState(false), 2), providerLoaded = _a[0], setProviderLoaded = _a[1];
            if (!props.readOnly && !providerLoaded) {
                SlateProvider.load().then(function () { return setProviderLoaded(true); });
            }
            if (props.readOnly || !providerLoaded) {
                return React.createElement(ReadOnlySlate, __assign({}, allProps));
            }
            return (React.createElement(SlateEditor, __assign({}, allProps, { fallback: React.createElement(ReadOnlySlate, __assign({}, allProps)) })));
        },
        Provider: function (props) { return (React.createElement(SlateProvider, __assign({}, props, { plugins: plugins, translations: settings.translations, defaultPluginType: settings.defaultPluginType, fallback: React.createElement(React.Fragment, null, props.children) }))); },
        // we no longer require the provider in read only mode thanks to the static renderer:
        disableProviderInReadOnly: true,
        controls: {
            type: 'custom',
            Component: function (props) { return (React.createElement(Controls, __assign({}, props, { plugins: plugins, translations: settings.translations }))); },
        },
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        id: settings.id || settings.name,
        version: settings.version,
        icon: settings.icon,
        title: settings.title || settings.translations.pluginName,
        description: settings.description || settings.translations.pluginDescription,
        hideInMenu: settings.hideInMenu,
        allowInlineNeighbours: settings.allowInlineNeighbours,
        allowClickInside: true,
        // disable default hotkeys
        handleRemoveHotKey: function () { return Promise.reject(); },
        handleFocusPreviousHotKey: function () { return Promise.reject(); },
        handleFocusNextHotKey: function (e, node) { return Promise.reject(); },
        createInitialData: createInitialData,
        createInitialState: createInitialData,
        createInitialSlateState: createData,
        createData: createData,
        createDataFromHtml: htmlToSlate,
        getTextContents: function (data) {
            return getTextContents(data.slate, { slatePlugins: plugins });
        },
        // remove selection
        serialize: function (_a) {
            if (_a === void 0) { _a = { slate: [] }; }
            var slate = _a.slate, selection = _a.selection, rest = __rest(_a, ["slate", "selection"]);
            return (__assign({ slate: slate }, rest));
        },
        cellClassName: 'slate',
        unserialize: function (s) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            if (s === null || s === void 0 ? void 0 : s.importFromHtml) {
                // this is no longer supported, but we do not delete it
                return __assign(__assign({ 
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    importFromHtml: s.importFromHtml }, s), createInitialData());
            }
            if (s === null || s === void 0 ? void 0 : s.slate) {
                return __assign(__assign({}, s), { selection: null });
            }
            return createInitialData();
        },
        migrations: settings.migrations,
    };
}
export default plugin;
//# sourceMappingURL=index.js.map