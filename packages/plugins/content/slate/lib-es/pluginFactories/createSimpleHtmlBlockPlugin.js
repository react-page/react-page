/* eslint-disable @typescript-eslint/ban-types */
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
import { getAlignmentFromElement } from '../plugins/paragraphs';
import createComponentPlugin from './createComponentPlugin';
function createSimpleHtmlBlockPlugin(def) {
    return createComponentPlugin({
        type: def.type,
        object: 'block',
        hotKey: def.hotKey,
        replaceWithDefaultOnRemove: def.replaceWithDefaultOnRemove,
        icon: def.icon,
        label: def.label,
        onKeyDown: def.onKeyDown,
        addToolbarButton: !def.noButton,
        customAdd: def.customAdd,
        customRemove: def.customRemove,
        controls: def.controls,
        addHoverButton: false,
        deserialize: {
            tagName: def.tagName,
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            getData: def.getData || getAlignmentFromElement,
        },
        getStyle: function (data) {
            var _a, _b;
            return (__assign({ textAlign: data.align }, ((_b = (_a = def.getStyle) === null || _a === void 0 ? void 0 : _a.call(def, data)) !== null && _b !== void 0 ? _b : {})));
        },
        Component: def.tagName,
    });
}
export default createSimpleHtmlBlockPlugin;
//# sourceMappingURL=createSimpleHtmlBlockPlugin.js.map