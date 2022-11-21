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
function createComponentPlugin(def) {
    var customizablePlugin = function (customize) {
        if (customize === void 0) { customize = function (d) {
            return d;
        }; }
        return createComponentPlugin(customize(def));
    };
    customizablePlugin.toPlugin = function () { return (__assign(__assign({}, def), { pluginType: 'component' })); };
    return customizablePlugin;
}
export default createComponentPlugin;
//# sourceMappingURL=createComponentPlugin.js.map