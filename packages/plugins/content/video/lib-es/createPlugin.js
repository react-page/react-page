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
import { defaultSettings } from './default/settings';
var createPlugin = function (settings) {
    var _a, _b, _c, _d;
    var mergedSettings = __assign(__assign({}, defaultSettings), settings);
    return {
        controls: {
            type: 'autoform',
            schema: {
                required: ['src'],
                type: 'object',
                properties: {
                    src: {
                        type: 'string',
                        uniforms: {
                            placeholder: (_a = mergedSettings.translations) === null || _a === void 0 ? void 0 : _a.placeholder,
                            label: (_b = mergedSettings.translations) === null || _b === void 0 ? void 0 : _b.label,
                        },
                    },
                },
            },
        },
        Renderer: mergedSettings.Renderer,
        id: 'ory/editor/core/content/video',
        version: 1,
        icon: mergedSettings.icon,
        title: (_c = mergedSettings.translations) === null || _c === void 0 ? void 0 : _c.pluginName,
        description: (_d = mergedSettings.translations) === null || _d === void 0 ? void 0 : _d.pluginDescription,
        isInlineable: true,
    };
};
export default createPlugin;
//# sourceMappingURL=createPlugin.js.map