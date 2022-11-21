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
import { Editor } from 'slate';
import { useSlate } from 'slate-react';
export var getCurrentNodeWithPlugin = function (editor, plugin) {
    if (plugin.pluginType === 'custom') {
        return null;
    }
    var match = plugin.pluginType === 'component'
        ? plugin.object === 'mark'
            ? function (elem) { return Boolean(elem[plugin.type]); }
            : function (elem) { return elem.type === plugin.type; }
        : plugin.pluginType === 'data'
            ? // search for data
                function (_a) {
                    var data = _a.data;
                    var matches = plugin.dataMatches(data);
                    return matches;
                }
            : null;
    if (!match) {
        return null;
    }
    try {
        var _a = __read(Editor.nodes(editor, {
            match: match,
            mode: 'lowest', // FIXME: whats the best value?
        }), 1), matchingNode = _a[0];
        return matchingNode;
    }
    catch (e) {
        // seems to crash sometimes on redu
        return null;
    }
};
export default (function (plugin) {
    var editor = useSlate();
    return getCurrentNodeWithPlugin(editor, plugin);
});
//# sourceMappingURL=useCurrentNodeWithPlugin.js.map