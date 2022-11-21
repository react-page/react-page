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
import React, { createContext, useContext, useRef } from 'react';
import deepEquals from '../../utils/deepEquals';
import { DEFAULT_OPTIONS } from '../../defaultOptions';
import { EditorContext } from '../../EditorStore';
import { useSelector } from '../../reduxConnect';
import { getLang } from '../../selector/setting';
import { normalizeCellSpacing } from '../../utils/getCellSpacing';
import NoopProvider from '../Cell/NoopProvider';
import { RenderOptionsContext, useRenderOption, useRenderOptions, } from './renderOptions';
/**
 * @returns the store object of the current editor. Contains the redux store.
 */
export var useEditorStore = function () {
    return useContext(EditorContext);
};
export var OptionsContext = createContext(DEFAULT_OPTIONS);
/**
 * @returns the options object of the current Editor.
 *
 * this object is memoized, alltough its better to use `useOption` instead if you want to use a single option
 */
export var useOptions = function () { return useContext(OptionsContext); };
/**
 * get a single (memoized) option value
 * @param key the option key
 * @returns the option value
 */
export var useOption = function (key) {
    var options = useOptions();
    var option = options[key];
    var lastOption = useRef(option);
    if (!deepEquals(lastOption.current, option)) {
        lastOption.current = option;
    }
    return lastOption.current;
};
/**
 * @returns the an object with a single `t` function for ui translations
 */
export var useUiTranslator = function () {
    var uiTranslator = useOption('uiTranslator');
    return {
        t: function (key) {
            var _a, _b;
            return (_b = (_a = uiTranslator === null || uiTranslator === void 0 ? void 0 : uiTranslator(key)) !== null && _a !== void 0 ? _a : key) !== null && _b !== void 0 ? _b : null;
        },
    };
};
/**
 * @returns the current language
 */
export var useLang = function () {
    return useSelector(getLang);
};
/**
 * @returns cell spacing for the current cell sub-tree
 */
export var useCellSpacing = function () {
    return normalizeCellSpacing(useRenderOption('cellSpacing'));
};
/**
 * @returns a Provider/value tuple that can be used to override cell spacing for a subtree of cells
 */
export var useCellSpacingProvider = function (cellSpacing) {
    var renderOptions = useRenderOptions();
    var value = React.useMemo(function () { return (__assign(__assign({}, renderOptions), { cellSpacing: normalizeCellSpacing(cellSpacing) })); }, [renderOptions, JSON.stringify(cellSpacing)]);
    if (typeof cellSpacing === 'undefined' || cellSpacing == null) {
        return [NoopProvider, value];
    }
    else {
        return [RenderOptionsContext.Provider, value];
    }
};
//# sourceMappingURL=options.js.map