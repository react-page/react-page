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
import createPlugin from './createPlugin';
import BackgroundHtmlRenderer from './Renderer/BackgroundHtmlRenderer';
import { ModeEnum } from './types/ModeEnum';
export { ModeEnum };
import { lazyLoad } from '@react-page/editor';
var BackgroundDefaultControls = lazyLoad(function () { return import('./Controls/Controls'); });
export default (function (settings) {
    var plugin = createPlugin(__assign({ Controls: BackgroundDefaultControls, Renderer: BackgroundHtmlRenderer }, settings));
    return plugin;
});
//# sourceMappingURL=index.js.map