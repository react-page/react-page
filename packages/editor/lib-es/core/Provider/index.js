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
import React from 'react';
import DndProvider from './DndProvider';
import BlurGate from '../components/BlurGate';
import CallbacksProvider from './CallbacksProvider';
import EditorStoreProvider from './EditorStoreProvider';
import OptionsProvider from './OptionsProvider';
import RenderOptionsProvider from './RenderOptionsProvider';
import { ThemeProvider } from '@mui/material';
import { DEFAULT_OPTIONS } from '../defaultOptions';
var Provider = function (_a) {
    var _b = _a.lang, lang = _b === void 0 ? 'default' : _b, value = _a.value, _c = _a.children, children = _c === void 0 ? [] : _c, renderOptions = _a.renderOptions, callbacks = _a.callbacks, options = _a.options;
    return (React.createElement(OptionsProvider, __assign({}, options),
        React.createElement(RenderOptionsProvider, __assign({}, renderOptions),
            React.createElement(CallbacksProvider, __assign({}, callbacks),
                React.createElement(DndProvider, null,
                    React.createElement(EditorStoreProvider, { lang: lang, value: value },
                        React.createElement(ThemeProvider, { theme: options.uiTheme || DEFAULT_OPTIONS.uiTheme },
                            React.createElement(BlurGate, null, children))))))));
};
export default Provider;
//# sourceMappingURL=index.js.map