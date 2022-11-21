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
import { lazyLoad } from '@react-page/editor';
var Icon = lazyLoad(function () { return import('@mui/icons-material/CropLandscape'); });
var createPlugin = function (settings) {
    var _a, _b;
    var mergedSettings = __assign(__assign({}, defaultSettings), settings);
    var Controls = mergedSettings.Controls;
    var Renderer = mergedSettings.Renderer;
    var plugin = {
        controls: {
            type: 'custom',
            Component: function (props) { return React.createElement(Controls, __assign({}, props, mergedSettings)); },
        },
        Renderer: function (props) { return React.createElement(Renderer, __assign({}, props, mergedSettings)); },
        id: 'ory/editor/core/layout/background',
        version: 1,
        title: (_a = mergedSettings.translations) === null || _a === void 0 ? void 0 : _a.pluginName,
        description: (_b = mergedSettings.translations) === null || _b === void 0 ? void 0 : _b.pluginDescription,
        icon: React.createElement(Icon, null),
        createInitialChildren: settings.getInitialChildren,
        cellStyle: mergedSettings.cellStyle,
    };
    return plugin;
};
export default createPlugin;
//# sourceMappingURL=createPlugin.js.map