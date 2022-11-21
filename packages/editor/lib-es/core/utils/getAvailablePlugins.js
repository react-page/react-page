var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
export var getChildCellPlugins = function (currentCellPlugins, cell) {
    if (!(cell === null || cell === void 0 ? void 0 : cell.pluginId)) {
        return currentCellPlugins;
    }
    var plugin = cell.pluginId
        ? currentCellPlugins.find(function (p) { return p.id === cell.pluginId; })
        : null;
    if (!(plugin === null || plugin === void 0 ? void 0 : plugin.cellPlugins)) {
        return currentCellPlugins;
    }
    var childPlugins = Array.isArray(plugin.cellPlugins)
        ? plugin.cellPlugins
        : plugin.cellPlugins(currentCellPlugins, cell.data);
    return childPlugins.reduceRight(function (filtered, p) {
        //omit if already seen
        if (filtered.some(function (o) { return o.id === p.id; })) {
            return filtered;
        }
        return __spreadArray([p], __read(filtered), false);
    }, []);
};
export var getAvailablePlugins = function (rootCellPlugins, ancestors) {
    var e_1, _a;
    var currentPlugins = rootCellPlugins;
    try {
        for (var ancestors_1 = __values(ancestors), ancestors_1_1 = ancestors_1.next(); !ancestors_1_1.done; ancestors_1_1 = ancestors_1.next()) {
            var ancestor = ancestors_1_1.value;
            currentPlugins = getChildCellPlugins(currentPlugins, ancestor);
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (ancestors_1_1 && !ancestors_1_1.done && (_a = ancestors_1.return)) _a.call(ancestors_1);
        }
        finally { if (e_1) throw e_1.error; }
    }
    return currentPlugins;
};
//# sourceMappingURL=getAvailablePlugins.js.map