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
import lazyLoad from '../core/helper/lazyLoad';
import { HTMLRenderer } from '../renderer/HTMLRenderer';
var EditableEditor = lazyLoad(function () { return import('./EditableEditor'); });
var Editor = function (_a) {
    var _b, _c;
    var _d = _a.readOnly, readOnly = _d === void 0 ? false : _d, _e = _a.value, value = _e === void 0 ? null : _e, _f = _a.onChange, onChange = _f === void 0 ? null : _f, _g = _a.onChangeLang, onChangeLang = _g === void 0 ? null : _g, passedLang = _a.lang, cellPlugins = _a.cellPlugins, children = _a.children, _h = _a.cellSpacing, cellSpacing = _h === void 0 ? null : _h, options = __rest(_a, ["readOnly", "value", "onChange", "onChangeLang", "lang", "cellPlugins", "children", "cellSpacing"]);
    // mount the component always in readonly, to avoid problems with SSR
    var _j = __read(useState(true), 2), renderReadOnly = _j[0], setRenderReadOnly = _j[1];
    useEffect(function () {
        setRenderReadOnly(readOnly);
    }, [readOnly]);
    var lang = (_c = passedLang !== null && passedLang !== void 0 ? passedLang : (_b = options.languages) === null || _b === void 0 ? void 0 : _b[0].lang) !== null && _c !== void 0 ? _c : 'default';
    // FIXME: we need to extact these objects here. It would be best, if the props would already group these,
    // but thats currently not the case and would mean a breaking change
    var renderOptions = {
        cellPlugins: cellPlugins,
        cellSpacing: cellSpacing,
    };
    var callbacks = {
        onChange: onChange,
        onChangeLang: onChangeLang,
    };
    return renderReadOnly ? (React.createElement(HTMLRenderer, { value: value, cellPlugins: cellPlugins, lang: lang, cellSpacing: cellSpacing })) : (React.createElement(EditableEditor, { fallback: React.createElement(HTMLRenderer, { value: value, cellPlugins: cellPlugins, lang: lang, cellSpacing: cellSpacing }), value: value, lang: lang, options: options, renderOptions: renderOptions, callbacks: callbacks, children: children }));
};
export default Editor;
//# sourceMappingURL=Editor.js.map