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
function createDataPlugin(def) {
    var customizablePlugin = function (customize) {
        if (customize === void 0) { customize = function (d) {
            return d;
        }; }
        return createDataPlugin(customize(def));
    };
    customizablePlugin.toPlugin = function () { return (__assign({ pluginType: 'data' }, def)); };
    return customizablePlugin;
}
export default createDataPlugin;
//# sourceMappingURL=createDataPlugin.js.map