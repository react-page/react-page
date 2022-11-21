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
export var sanitizeVersion = function (version) {
    if (!version)
        return 0;
    // string versions are deprecated
    if (typeof version === 'string') {
        var _a = __read(version
            .replace(/\^|\*/g, '')
            .split('.')
            .map(Number), 3), major = _a[0], minor = _a[1], patch = _a[2];
        return major + minor * 0.01 + patch * 0.01 * 0.01;
    }
    else
        return version;
};
/**
 * @class the class used to migrate plugin content between toVersion
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
var Migration = /** @class */ (function () {
    function Migration(config) {
        var toVersion = config.toVersion, migrate = config.migrate, fromVersionOrg = config.fromVersion, fromVersionRange = config.fromVersionRange;
        var fromVersion = fromVersionOrg !== null && fromVersionOrg !== void 0 ? fromVersionOrg : fromVersionRange; // just for backwards compatibility
        this.toVersion = sanitizeVersion(toVersion);
        this.migrate = migrate;
        this.fromVersion = sanitizeVersion(fromVersion);
    }
    return Migration;
}());
export { Migration };
//# sourceMappingURL=Migration.js.map