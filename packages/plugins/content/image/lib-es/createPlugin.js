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
import React from 'react';
import { defaultSettings } from './default/settings';
var createPlugin = function (settings) {
    var _a, _b;
    var mergedSettings = __assign(__assign({}, defaultSettings), settings);
    var Controls = mergedSettings.Controls;
    return {
        controls: {
            type: 'custom',
            Component: function (props) { return (React.createElement(Controls, __assign({}, props, { translations: mergedSettings.translations, imageUpload: mergedSettings.imageUpload }))); },
        },
        Renderer: mergedSettings.Renderer,
        id: 'ory/editor/core/content/image',
        version: 1,
        icon: mergedSettings.icon,
        title: (_a = mergedSettings.translations) === null || _a === void 0 ? void 0 : _a.pluginName,
        isInlineable: true,
        description: (_b = mergedSettings.translations) === null || _b === void 0 ? void 0 : _b.pluginDescription,
    };
};
export default createPlugin;
//# sourceMappingURL=createPlugin.js.map