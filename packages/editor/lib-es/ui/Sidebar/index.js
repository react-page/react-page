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
import React from 'react';
import { useOption, useUiTranslator } from '../../core/components/hooks';
import ToggleEdit from './ToggleEdit/index';
import ToggleInsert from './ToggleInsert/index';
import ToggleLayout from './ToggleLayout/index';
import TogglePreview from './TogglePreview/index';
import ToggleResize from './ToggleResize/index';
import UndoRedo from './UndoRedo';
import Zoom from './Zoom';
var getStickyNessstyle = function (stickyness) {
    if (!stickyness ||
        (!stickyness.shouldStickToBottom && !stickyness.shouldStickToTop)) {
        return {
            position: 'fixed',
            right: (stickyness === null || stickyness === void 0 ? void 0 : stickyness.rightOffsetFixed) || 0,
        };
    }
    return {
        position: 'absolute',
        bottom: stickyness.shouldStickToBottom ? 0 : 'auto',
        top: stickyness.shouldStickToTop ? 0 : 'auto',
        right: -stickyness.rightOffset || 0,
    };
};
function notEmpty(value) {
    return value !== null && value !== undefined;
}
export var Sidebar = function (_a) {
    var _b, _c, _d, _e, _f, _g;
    var stickyNess = _a.stickyNess;
    var t = useUiTranslator().t;
    var zoomEnabled = useOption('zoomEnabled');
    var undoRedoEnabled = useOption('undoRedoEnabled');
    var editEnabled = useOption('editEnabled');
    var insertEnabled = useOption('insertEnabled');
    var layoutEnabled = useOption('layoutEnabled');
    var resizeEnabled = useOption('resizeEnabled');
    var previewEnabled = useOption('previewEnabled');
    var defaultLabels = {
        edit: 'Edit blocks',
        insert: 'Add blocks',
        layout: 'Move blocks',
        resize: 'Resize blocks',
        preview: 'Preview page',
    };
    var customOptions = useOption('customOptions');
    var actions = __spreadArray([
        // eslint-disable-next-line react/jsx-key
        undoRedoEnabled
            ? { action: React.createElement(UndoRedo, { labelRedo: "redo", labelUndo: "undo" }) }
            : null,
        zoomEnabled
            ? { action: React.createElement(Zoom, { labelZoomIn: "zoom in", labelZoomOut: "zoom out" }) }
            : null,
        editEnabled
            ? { action: React.createElement(ToggleEdit, { label: (_b = t(defaultLabels.edit)) !== null && _b !== void 0 ? _b : '' }) }
            : null,
        insertEnabled
            ? { action: React.createElement(ToggleInsert, { label: (_c = t(defaultLabels.insert)) !== null && _c !== void 0 ? _c : '' }) }
            : null,
        layoutEnabled
            ? { action: React.createElement(ToggleLayout, { label: (_d = t(defaultLabels.layout)) !== null && _d !== void 0 ? _d : '' }) }
            : null,
        resizeEnabled
            ? { action: React.createElement(ToggleResize, { label: (_e = t(defaultLabels.resize)) !== null && _e !== void 0 ? _e : '' }) }
            : null,
        previewEnabled
            ? { action: React.createElement(TogglePreview, { label: (_f = t(defaultLabels.preview)) !== null && _f !== void 0 ? _f : '' }) }
            : null
    ], __read(((_g = customOptions === null || customOptions === void 0 ? void 0 : customOptions.map(function (customOption) { return ({ action: customOption }); })) !== null && _g !== void 0 ? _g : [])), false).filter(notEmpty);
    return (React.createElement("div", { className: "react-page-controls-mode-toggle-control-group", style: __assign({ position: 'fixed', zIndex: 10001, bottom: 0, right: 0, display: 'flex', maxHeight: '100%' }, getStickyNessstyle(stickyNess)) },
        React.createElement("div", { ref: stickyNess === null || stickyNess === void 0 ? void 0 : stickyNess.stickyElRef, style: {
                padding: 16,
                position: 'relative',
                flexFlow: 'column wrap',
                direction: 'rtl',
                display: 'flex',
            } }, actions.map(function (_a, index) {
            var action = _a.action;
            return (React.createElement("div", { key: index, className: "react-page-controls-mode-toggle-control", style: {
                    animationDelay: (actions.length - index) * 150 + 'ms',
                } },
                React.createElement(React.Fragment, null,
                    action,
                    React.createElement("div", { className: "react-page-controls-mode-toggle-clearfix" }))));
        }))));
};
//# sourceMappingURL=index.js.map