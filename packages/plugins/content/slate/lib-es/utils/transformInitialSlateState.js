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
import flattenDeep from './flattenDeep';
/**
 * FIXME: transformInitialSlateState does some polymorphic type magic, so that it is directly
 * compatible with the shipped default plugins or plugins created with pluginFactories
 *
 * This is a bit ugly and might be hard to understand,
 * but on the other hand its easy to use for developers that use this library
 *
 * Basicaly what we do is to unpack the factory or its result until we find
 * - object: "block" | "inline" | "mark"
 * - type: "SOMESTRING"
 *
 * We might revisit this in the future.
 *
 */
var transformChildren = function (defNodes) {
    return defNodes.map(function (defNode) {
        var _a;
        if (defNode.plugin) {
            var defPluginNode = defNode;
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            var slatePluginOrList = defPluginNode.plugin.toPlugin
                ? // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    defPluginNode.plugin.toPlugin()
                : defPluginNode.plugin;
            // the result of plugin.toPlugin might be an array, e.g. the list plugin is an array, because it defines ul, li AND indention-options on the same plugin
            var firstComponentPlugin = flattenDeep(slatePluginOrList).find(function (plugin) { return plugin.pluginType === 'component' || plugin; });
            if (firstComponentPlugin &&
                firstComponentPlugin.pluginType === 'component') {
                return __assign(__assign({ type: firstComponentPlugin.type }, ((_a = defPluginNode.data) !== null && _a !== void 0 ? _a : {})), { children: defPluginNode.children
                        ? transformChildren(defPluginNode.children)
                        : [] });
            }
            else {
                return null;
            }
        }
        else if (typeof defNode === 'string') {
            return {
                text: defNode,
            };
        }
    });
};
export default (function (def) { return ({
    slate: transformChildren(def.children),
}); });
//# sourceMappingURL=transformInitialSlateState.js.map