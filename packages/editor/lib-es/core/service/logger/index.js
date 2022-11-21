// tslint:disable:no-console
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
var trace = function () {
    var _a, _b;
    var e = new Error('dummy');
    return ((_b = (_a = e.stack) === null || _a === void 0 ? void 0 : _a.replace(/^[^(]+?[\n$]/gm, '').replace(/^\s+at\s+/gm, '').replace(/^Object.<anonymous>\s*\(/gm, '{anonymous}()@').split('\n')) !== null && _b !== void 0 ? _b : []);
};
var Logger = /** @class */ (function () {
    function Logger() {
    }
    /**
     * Logs a warning. Warnings are things that are exceptional, but easily to recover from.
     */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    Logger.prototype.warn = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        console.warn.apply(console, __spreadArray(['Warning:'], __read(args), false));
    };
    /**
     * Logs a debug message. Debug messages are things that help developers debugging things.
     */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    Logger.prototype.debug = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        console.log.apply(console, __spreadArray(['Debug:'], __read(args), false));
    };
    /**
     * Logs an info. Infos are things that might be interesting for someone who needs to take a closer look.
     */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    Logger.prototype.info = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        console.log.apply(console, __spreadArray(['Info:'], __read(args), false));
    };
    /**
     * Logs an error. Error are things that are exceptional, but can be recovered from.
     */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    Logger.prototype.error = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        console.error.apply(console, __spreadArray(['Error:'], __read(args), false));
        console.error('Trace:', trace());
    };
    /**
     * Logs a fatal error. Fatal errors are things that are exceptional and can not be recovered from.
     */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    Logger.prototype.fatal = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        console.error.apply(console, __spreadArray(['Fatal:'], __read(args), false));
        console.error('Trace:', trace());
        throw new Error(args.join(' '));
    };
    /**
     * Logs a message.
     */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    Logger.prototype.log = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        console.log.apply(console, __spreadArray(['Fatal:'], __read(args), false));
        console.log('Trace:', trace());
    };
    return Logger;
}());
export { Logger };
var instance = new Logger();
export default instance;
//# sourceMappingURL=index.js.map