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
import createPlugin from './createPlugin';
import ImageHtmlRenderer from './Renderer/ImageHtmlRenderer';
var ImageControls = lazyLoad(function () { return import('./Controls/ImageControls'); });
var imagePlugin = function (settings) {
    return createPlugin(__assign({ Renderer: ImageHtmlRenderer, Controls: ImageControls }, settings));
};
var image = imagePlugin();
export default image;
export { imagePlugin };
//# sourceMappingURL=index.js.map