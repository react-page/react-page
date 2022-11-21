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
import { Tab, Tabs } from '@mui/material';
import React, { useState } from 'react';
import { AutoformControls } from '../../../../ui';
var ControlsList = React.memo(function (_a) {
    var _b;
    var controls = _a.controls, componentProps = _a.componentProps;
    var _c = __read(useState(0), 2), tab = _c[0], setTab = _c[1];
    var activeControls = (_b = controls[tab]) === null || _b === void 0 ? void 0 : _b.controls;
    return (React.createElement("div", { style: {
            display: 'flex',
            flexDirection: 'row',
        } },
        React.createElement(Tabs, { sx: {
                marginTop: '-12px',
                marginBottom: '-12px',
                marginLeft: '-24px',
                alignItems: 'flex-start',
                backgroundColor: function (theme) { return theme.palette.background.default; },
            }, value: tab, onChange: function (e, v) { return setTab(v); }, orientation: "vertical", variant: "scrollable" }, controls.map(function (t, index) { return (React.createElement(Tab, { sx: {
                alignItems: 'flex-start',
            }, label: t.title, key: index })); })),
        activeControls ? (React.createElement("div", { style: {
                flex: 1,
                marginLeft: 24,
                display: 'flex',
            } },
            React.createElement(Controls, { controls: activeControls, componentProps: componentProps }))) : null));
});
var Controls = React.memo(function (_a) {
    var controls = _a.controls, componentProps = _a.componentProps;
    var pluginControls = null;
    if (Array.isArray(controls)) {
        return React.createElement(ControlsList, { componentProps: componentProps, controls: controls });
    }
    if ((controls === null || controls === void 0 ? void 0 : controls.type) === 'custom') {
        var Component = controls.Component;
        pluginControls = React.createElement(Component, __assign({}, componentProps, controls));
    }
    else if ((controls === null || controls === void 0 ? void 0 : controls.type) === 'autoform') {
        pluginControls = React.createElement(AutoformControls, __assign({}, componentProps, controls));
    }
    return React.createElement("div", { style: { overflow: 'auto', flex: 1 } }, pluginControls);
});
var PluginControls = function (_a) {
    var controls = _a.controls, componentProps = _a.componentProps;
    return (React.createElement("div", { style: {
            maxHeight: '50vh',
            // if it has tabs, stretch to avoid jumping tabs
            width: Array.isArray(controls) ? '100vw' : undefined,
            maxWidth: '100%',
            display: 'flex',
        } },
        React.createElement(Controls, { controls: controls, componentProps: componentProps })));
};
export default React.memo(PluginControls);
//# sourceMappingURL=index.js.map