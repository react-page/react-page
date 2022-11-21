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
import { useCallback } from 'react';
import { Transforms } from 'slate';
import { useSlate } from 'slate-react';
import { getCurrentNodeWithPlugin } from './useCurrentNodeWithPlugin';
import { removePlugin } from './useRemovePlugin';
import getCurrentData from '../utils/getCurrentData';
export var addPlugin = function (editor, plugin, props) {
    var _a;
    var _b = props || {}, passedData = _b.data, text = _b.text;
    var currentNodeEntry = getCurrentNodeWithPlugin(editor, plugin);
    if (text) {
        var withExtraSpace = plugin.pluginType === 'component' &&
            plugin.object === 'inline' &&
            plugin.addExtraSpace;
        var textToInsert = withExtraSpace ? text + ' ' : text;
        editor.insertText(textToInsert);
        if (editor.selection) {
            Transforms.select(editor, {
                anchor: editor.selection.anchor,
                focus: __assign(__assign({}, editor.selection.focus), { offset: editor.selection.focus.offset - textToInsert.length }),
            });
        }
    }
    var data = passedData || (plugin.getInitialData ? plugin.getInitialData() : null);
    if (currentNodeEntry) {
        Transforms.select(editor, currentNodeEntry[1]);
        removePlugin(editor, plugin);
    }
    // add new
    if (plugin.customAdd) {
        plugin.customAdd(editor);
    }
    else if (plugin.pluginType === 'component') {
        if (plugin.object === 'mark') {
            editor.addMark(plugin.type, data || true);
        }
        else if (plugin.isVoid) {
            Transforms.insertNodes(editor, {
                type: plugin.type,
                data: data,
                children: [{ text: '' }],
            });
        }
        else {
            if (plugin.object === 'block' && plugin.replaceWithDefaultOnRemove) {
                Transforms.setNodes(editor, { type: plugin.type, data: data });
            }
            else {
                Transforms.wrapNodes(editor, {
                    type: plugin.type,
                    children: [],
                    data: data,
                }, { split: true });
                // workaround for inline problems in slate
                if (plugin.object === 'inline' &&
                    plugin.addExtraSpace &&
                    !text &&
                    editor.selection) {
                    var focus_1 = __assign({}, editor.selection.focus);
                    Transforms.insertText(editor, ' ', {
                        at: editor.selection.focus,
                    });
                    Transforms.select(editor, focus_1);
                }
            }
        }
    }
    else if (plugin.pluginType === 'data') {
        var existingData = (_a = getCurrentData(editor)) !== null && _a !== void 0 ? _a : {};
        Transforms.setNodes(editor, {
            data: __assign(__assign({}, existingData), (data !== null && data !== void 0 ? data : {})),
        });
    }
};
export default (function (plugin) {
    var editor = useSlate();
    return useCallback(function (props) {
        return addPlugin(editor, plugin, props);
    }, []);
});
//# sourceMappingURL=useAddPlugin.js.map