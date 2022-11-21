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
import getCurrentData from '../utils/getCurrentData';
export var removePlugin = function (editor, plugin) {
    if (plugin.customRemove) {
        plugin.customRemove(editor);
    }
    else if (plugin.pluginType === 'component') {
        if (plugin.object === 'mark') {
            editor.removeMark(plugin.type);
        }
        else if (plugin.object === 'inline') {
            if (plugin.isVoid) {
                Transforms.removeNodes(editor, {
                    match: function (elem) { return elem.type === plugin.type; },
                });
            }
            else {
                Transforms.unwrapNodes(editor, {
                    match: function (elem) { return elem.type === plugin.type; },
                });
            }
            // Transforms.setNodes(editor, { type: null });
        }
        else if (plugin.object === 'block') {
            if (plugin.isVoid) {
                Transforms.removeNodes(editor, {
                    match: function (elem) { return elem.type === plugin.type; },
                });
            }
            else if (plugin.replaceWithDefaultOnRemove) {
                Transforms.setNodes(editor, {
                    type: null,
                });
            }
            else {
                Transforms.unwrapNodes(editor, {
                    match: function (elem) { return elem.type === plugin.type; },
                    split: true,
                });
            }
        }
    }
    else if (plugin.pluginType === 'data') {
        if (!plugin.properties) {
            // can't be removed
        }
        else {
            var existingData_1 = getCurrentData(editor);
            var dataWithout = Object.keys(existingData_1).reduce(function (acc, key) {
                var _a;
                var _b;
                if ((_b = plugin.properties) === null || _b === void 0 ? void 0 : _b.includes(key)) {
                    return acc;
                }
                return __assign(__assign({}, acc), (_a = {}, _a[key] = existingData_1[key], _a));
            }, {});
            Transforms.setNodes(editor, {
                data: dataWithout,
            });
        }
    }
};
export default (function (plugin) {
    var editor = useSlate();
    return useCallback(function () { return removePlugin(editor, plugin); }, []);
});
//# sourceMappingURL=useRemovePlugin.js.map