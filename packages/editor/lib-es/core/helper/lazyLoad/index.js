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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
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
import React, { useEffect, useState } from 'react';
import { Suspense } from 'react';
import { lazyWithPreload } from 'react-lazy-with-preload';
function useIsServer() {
    var _a = __read(useState(true), 2), isServer = _a[0], setIsServer = _a[1];
    useEffect(function () {
        setIsServer(false);
    }, []);
    return isServer;
}
/**
 *
 * @param factory function that retuns a promise of a component
 * @returns a lazy loaded component. you can pass a fallback to the component that renders on server or when the component is not loaded
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
var loadable = function (factory) {
    var Component = lazyWithPreload(factory);
    var LoadableComponent = React.forwardRef(function (_a, ref) {
        var _b = _a.fallback, fallback = _b === void 0 ? null : _b, props = __rest(_a, ["fallback"]);
        var isServer = useIsServer();
        if (isServer) {
            return fallback !== null && fallback !== void 0 ? fallback : null;
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        var Inner = Component;
        return (React.createElement(Suspense, { fallback: fallback },
            React.createElement(Inner, __assign({ ref: ref }, props))));
    });
    var LoadableComponentWithPreload = LoadableComponent;
    LoadableComponentWithPreload.load = Component.preload;
    return LoadableComponentWithPreload;
};
export default loadable;
//# sourceMappingURL=index.js.map