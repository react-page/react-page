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
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListSubheader from '@mui/material/ListSubheader';
import TextField from '@mui/material/TextField';
import React from 'react';
import { Portal } from 'react-portal';
import { useIsInsertMode, useUiTranslator, useDisplayModeReferenceNodeId, useAllCellPluginsForNode, } from '../../core/components/hooks';
import Item from './Item/index';
var getPluginTitle = function (plugin) { var _a; return (_a = (plugin.title || plugin.text)) !== null && _a !== void 0 ? _a : ''; };
export var PluginDrawer = React.memo(function () {
    var _a;
    var defaultLabels = {
        noPluginFoundContent: 'No blocks found',
        searchPlaceholder: 'Search for blocks',
        insertPlugin: 'Add blocks to page',
        dragMe: 'Drag me!',
    };
    var nodeId = useDisplayModeReferenceNodeId();
    var plugins = useAllCellPluginsForNode(nodeId);
    var t = useUiTranslator().t;
    var _b = __read(React.useState(''), 2), searchText = _b[0], setSearchText = _b[1];
    var searchFilter = React.useCallback(function (plugin) {
        var id = plugin.id;
        var title = getPluginTitle(plugin);
        return (plugin &&
            id &&
            !plugin.hideInMenu &&
            (id.toLowerCase().startsWith(searchText === null || searchText === void 0 ? void 0 : searchText.toLowerCase()) ||
                (plugin.description &&
                    plugin.description
                        .toLowerCase()
                        .startsWith(searchText === null || searchText === void 0 ? void 0 : searchText.toLowerCase())) ||
                (title && title.toLowerCase().startsWith(searchText === null || searchText === void 0 ? void 0 : searchText.toLowerCase()))));
    }, [searchText]);
    var onSearch = React.useCallback(function (e) {
        var target = e.target;
        if (target instanceof HTMLInputElement) {
            setSearchText(target.value);
        }
    }, [setSearchText]);
    var isInsertMode = useIsInsertMode();
    var inputRef = React.useRef();
    React.useEffect(function () {
        var handle;
        if (inputRef.current && isInsertMode) {
            handle = setTimeout(function () {
                var _a;
                var e = (_a = inputRef === null || inputRef === void 0 ? void 0 : inputRef.current) === null || _a === void 0 ? void 0 : _a.querySelector('input');
                if (e) {
                    e.focus();
                }
            }, 100);
        }
        return function () {
            clearTimeout(handle);
        };
    }, [inputRef.current, isInsertMode]);
    var filteredPlugins = plugins.filter(searchFilter);
    return (React.createElement(Portal, null,
        React.createElement(Drawer, { variant: "persistent", className: "react-page-plugin-drawer", open: isInsertMode, PaperProps: {
                style: {
                    width: 320,
                },
            } },
            React.createElement(List, { subheader: React.createElement(ListSubheader, null, t(defaultLabels.insertPlugin)) },
                React.createElement(ListItem, null,
                    React.createElement(TextField, { inputRef: inputRef, placeholder: (_a = t(defaultLabels.searchPlaceholder)) !== null && _a !== void 0 ? _a : '', fullWidth: true, onChange: onSearch })),
                filteredPlugins.length === 0 && (React.createElement(ListSubheader, null, t(defaultLabels.noPluginFoundContent)))),
            filteredPlugins.length > 0 && (React.createElement(List, null, filteredPlugins.map(function (plugin, k) {
                return (React.createElement(Item, { translations: defaultLabels, plugin: plugin, key: k.toString(), insert: {
                        plugin: plugin.id,
                    } }));
            }))))));
});
//# sourceMappingURL=index.js.map