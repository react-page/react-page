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
import React, { useEffect, useMemo, useRef } from 'react';
import { updateValue } from '../actions/value';
import { useCallbackOption, useOption, useRenderOption, } from '../components/hooks';
import EditorStore, { EditorContext } from '../EditorStore';
import { migrateValue } from '../migrations/migrate';
import { serialzeValue } from '../migrations/serialzeValue';
import { initialState } from '../reducer';
import { ReduxProvider } from '../reduxConnect';
import deepEquals from '../utils/deepEquals';
var EditorStoreProvider = function (_a) {
    var _b;
    var children = _a.children, lang = _a.lang, value = _a.value;
    var cellPlugins = useRenderOption('cellPlugins');
    var middleware = (_b = useOption('middleware')) !== null && _b !== void 0 ? _b : [];
    var onChangeLang = useCallbackOption('onChangeLang');
    var onChange = useCallbackOption('onChange');
    var storeFromOptions = useOption('store');
    var editorStore = useMemo(function () {
        var store = new EditorStore({
            initialState: initialState(migrateValue(value, {
                cellPlugins: cellPlugins,
                lang: lang,
            }), lang),
            store: storeFromOptions,
            middleware: middleware,
        });
        return store;
    }, __spreadArray([storeFromOptions], __read(middleware), false));
    var lastValueRef = useRef(value);
    useEffect(function () {
        var oldLang = lang;
        var handleChanges = function () {
            // notify outsiders to new language, when chagned in ui
            var newLang = editorStore.store.getState().reactPage.settings.lang;
            if (newLang && (newLang !== oldLang || newLang !== lang)) {
                oldLang = newLang;
                onChangeLang === null || onChangeLang === void 0 ? void 0 : onChangeLang(newLang);
            }
            if (!onChange) {
                return;
            }
            //console.time('calculate notifiy on change');
            var currentValue = editorStore.store.getState().reactPage.values.present;
            if (!currentValue) {
                // console.timeEnd('calculate notifiy on change');
                return;
            }
            var serializedValue = serialzeValue(currentValue, cellPlugins);
            var serializedEqual = deepEquals(lastValueRef.current, serializedValue);
            if (serializedEqual) {
                //    console.timeEnd('calculate notifiy on change');
                return;
            }
            lastValueRef.current = serializedValue;
            //   console.timeEnd('calculate notifiy on change');
            onChange(serializedValue);
        };
        var unsubscribe = editorStore.store.subscribe(handleChanges);
        return function () {
            unsubscribe();
        };
    }, [editorStore, onChange, cellPlugins]);
    useEffect(function () {
        var equal = deepEquals(value, lastValueRef.current);
        // value changed from outside
        if (!equal) {
            lastValueRef.current = value;
            var migratedValue = migrateValue(value, {
                cellPlugins: cellPlugins,
                lang: lang,
            });
            editorStore.store.dispatch(updateValue(migratedValue));
        }
    }, [value, cellPlugins, lang]);
    useEffect(function () {
        // if changed from outside
        editorStore.setLang(lang);
    }, [editorStore, lang]);
    return (React.createElement(ReduxProvider, { store: editorStore.store },
        React.createElement(EditorContext.Provider, { value: editorStore }, children)));
};
export default EditorStoreProvider;
//# sourceMappingURL=EditorStoreProvider.js.map