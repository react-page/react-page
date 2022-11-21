import { useSlate } from 'slate-react';
import { getCurrentNodeWithPlugin } from './useCurrentNodeWithPlugin';
export var getCurrentNodeDataWithPlugin = function (editor, plugin) {
    var currentNodeEntry = getCurrentNodeWithPlugin(editor, plugin);
    if (currentNodeEntry) {
        var currentNode = currentNodeEntry[0];
        if (plugin.pluginType === 'component' && plugin.object === 'mark') {
            return currentNode[plugin.type];
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        var data = currentNode.data;
        return data;
    }
    else if (plugin.getInitialData) {
        return plugin.getInitialData();
    }
    else {
        return {};
    }
};
export default (function (plugin) {
    var editor = useSlate();
    return getCurrentNodeDataWithPlugin(editor, plugin);
});
//# sourceMappingURL=useCurrentNodeDataWithPlugin.js.map