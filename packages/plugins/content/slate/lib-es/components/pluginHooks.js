import { useMemo } from 'react';
export var useComponentNodePlugins = function (_a, deps) {
    var plugins = _a.plugins;
    return useMemo(function () {
        return plugins.filter(function (plugin) {
            return plugin.pluginType === 'component' && plugin.object !== 'mark';
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        );
    }, deps);
};
export var useComponentMarkPlugins = function (_a, deps) {
    var plugins = _a.plugins;
    return useMemo(function () {
        return plugins.filter(function (plugin) {
            return plugin.pluginType === 'component' && plugin.object === 'mark';
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        );
    }, deps);
};
//# sourceMappingURL=pluginHooks.js.map