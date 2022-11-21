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
export var removeUndefinedProps = function (obj) {
    return Object.keys(obj).reduce(function (acc, key) {
        var _a;
        var value = obj[key];
        if (typeof value === 'undefined' || value == null) {
            return acc;
        }
        return __assign(__assign({}, acc), (_a = {}, _a[key] = value, _a));
    }, {});
};
//# sourceMappingURL=removeUndefinedProps.js.map