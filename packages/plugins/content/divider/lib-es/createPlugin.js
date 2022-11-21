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
import { lazyLoad } from '@react-page/editor';
import React from 'react';
import { defaultSettings } from './default/settings';
import DividerHtmlRenderer from './Renderer/DividerHtmlRenderer';
var Remove = lazyLoad(function () { return import('@mui/icons-material/Remove'); });
var createPlugin = function (settings) {
    var _a, _b;
    var mergedSettings = __assign(__assign({}, defaultSettings), settings);
    return {
        Renderer: settings.Renderer || DividerHtmlRenderer,
        id: 'ory/editor/core/content/divider',
        version: 1,
        icon: React.createElement(Remove, null),
        title: (_a = mergedSettings.translations) === null || _a === void 0 ? void 0 : _a.pluginName,
        description: (_b = mergedSettings.translations) === null || _b === void 0 ? void 0 : _b.pluginDescription,
    };
};
export default createPlugin;
//# sourceMappingURL=createPlugin.js.map