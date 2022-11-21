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
import { useCallback } from 'react';
import { useDispatch, useSelector } from '../../reduxConnect';
import { setZoom } from '../../actions/display';
import { useOption } from './options';
export var useSetZoom = function () {
    var dispatch = useDispatch();
    return useCallback(function (zoom) { return dispatch(setZoom(zoom)); }, [dispatch]);
};
/**
 * @returns the current zoom
 */
export var useZoom = function () {
    return useSelector(function (state) { return state.reactPage.display.zoom; });
};
export var useZoomOut = function () {
    var zoom = useZoom();
    var zoomFactors = useOption('zoomFactors');
    var setZoom = useSetZoom();
    return useCallback(function () {
        var newZoom = zoomFactors === null || zoomFactors === void 0 ? void 0 : zoomFactors.find(function (z) { return z < zoom; });
        if (newZoom)
            setZoom(newZoom);
    }, [zoom, setZoom, zoomFactors]);
};
export var useZoomIn = function () {
    var zoom = useZoom();
    var setZoom = useSetZoom();
    var zoomFactors = useOption('zoomFactors');
    return useCallback(function () {
        var newZoom = __spreadArray([], __read((zoomFactors !== null && zoomFactors !== void 0 ? zoomFactors : [])), false).reverse().find(function (z) { return z > zoom; });
        if (newZoom)
            setZoom(newZoom);
    }, [zoom, setZoom, zoomFactors]);
};
export var useCanZoomOut = function () {
    var _a;
    var zoom = useZoom();
    var zoomFactors = useOption('zoomFactors');
    return (_a = zoomFactors === null || zoomFactors === void 0 ? void 0 : zoomFactors.some(function (z) { return z < zoom; })) !== null && _a !== void 0 ? _a : false;
};
export var useCanZoomIn = function () {
    var _a;
    var zoom = useZoom();
    var zoomFactors = useOption('zoomFactors');
    return (_a = zoomFactors === null || zoomFactors === void 0 ? void 0 : zoomFactors.some(function (z) { return z > zoom; })) !== null && _a !== void 0 ? _a : false;
};
//# sourceMappingURL=display.js.map