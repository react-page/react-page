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
import Html5VideoHtmlRenderer from './Renderer/Html5VideoHtmlRenderer';
var createPlugin = function (settings) {
    var _a, _b, _c, _d, _e;
    var mergedSettings = __assign(__assign({}, defaultSettings), settings);
    return {
        Renderer: (_a = mergedSettings.Renderer) !== null && _a !== void 0 ? _a : Html5VideoHtmlRenderer,
        controls: {
            columnCount: 1,
            type: 'autoform',
            schema: {
                required: ['url'],
                type: 'object',
                properties: {
                    url: {
                        type: 'string',
                        uniforms: {
                            placeholder: (_b = mergedSettings.translations) === null || _b === void 0 ? void 0 : _b.urlPlaceholder,
                            label: (_c = mergedSettings.translations) === null || _c === void 0 ? void 0 : _c.urlLabel,
                        },
                    },
                },
            },
        },
        id: 'ory/sites/plugin/content/html5-video',
        version: 1,
        title: (_d = mergedSettings.translations) === null || _d === void 0 ? void 0 : _d.pluginName,
        description: (_e = mergedSettings.translations) === null || _e === void 0 ? void 0 : _e.pluginDescription,
        icon: mergedSettings.icon,
        isInlineable: mergedSettings.isInlineable,
        createInitialData: function () { return ({
            url: '',
        }); },
    };
};
export default createPlugin;
//# sourceMappingURL=createPlugin.js.map