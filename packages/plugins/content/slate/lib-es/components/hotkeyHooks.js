import isHotkey from 'is-hotkey';
import React from 'react';
import { ReactEditor } from 'slate-react';
import { useSlate } from 'slate-react';
import { addPlugin } from '../hooks/useAddPlugin';
import { getCurrentNodeWithPlugin } from '../hooks/useCurrentNodeWithPlugin';
import { removePlugin } from '../hooks/useRemovePlugin';
export var useOnKeyDown = function (_a, deps) {
    var plugins = _a.plugins;
    var editor = useSlate();
    return React.useCallback(function (event) {
        plugins
            .filter(function (plugin) { return plugin.hotKey; })
            .forEach(function (plugin) {
            if (plugin.hotKey && isHotkey(plugin.hotKey, event)) {
                event.preventDefault();
                var node = getCurrentNodeWithPlugin(editor, plugin);
                if (node) {
                    removePlugin(editor, plugin);
                }
                else {
                    addPlugin(editor, plugin);
                }
            }
        });
        // we need to prevent slate from handling undo and redo
        if (isHotkey(['mod+z', 'mod+y'], event)) {
            event.preventDefault();
            return true;
        }
        if (isHotkey(['esc'], event)) {
            ReactEditor.blur(editor);
            return true;
        }
        if (isHotkey('shift+enter', event)) {
            event.preventDefault();
            editor.insertText('\n');
            return true;
        }
    }, deps);
};
//# sourceMappingURL=hotkeyHooks.js.map