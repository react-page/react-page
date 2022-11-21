var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
import FormControlLabel from '@mui/material/FormControlLabel';
import Slider from '@mui/material/Slider';
import Switch from '@mui/material/Switch';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Typography from '@mui/material/Typography';
import ColorIcon from '@mui/icons-material/ColorLens';
import GradientIcon from '@mui/icons-material/Gradient';
import ImageIcon from '@mui/icons-material/Landscape';
import React from 'react';
import { ModeEnum } from '../types/ModeEnum';
import ColorComponent from './sub/Color';
import ImageComponent from './sub/Image';
import LinearGradientComponent from './sub/LinearGradient';
var Inner = /** @class */ (function (_super) {
    __extends(Inner, _super);
    function Inner(props) {
        var _this = _super.call(this, props) || this;
        _this.renderModeSwitch = function () {
            var _a;
            var _b = _this.props.data.modeFlag, modeFlag = _b === void 0 ? _this.props.defaultModeFlag : _b;
            return (React.createElement(FormControlLabel, { style: { marginBottom: 16 }, control: React.createElement(Switch, { onChange: _this.props.handleChangeModeSwitch(_this.state.mode, modeFlag), checked: Boolean(modeFlag && _this.state.mode && modeFlag & _this.state.mode) }), label: (_a = _this.props.translations) === null || _a === void 0 ? void 0 : _a.onOff }));
        };
        _this.renderUI = function () {
            switch (_this.state.mode) {
                case ModeEnum.COLOR_MODE_FLAG:
                    return (React.createElement(React.Fragment, null,
                        _this.renderModeSwitch(),
                        React.createElement(ColorComponent, __assign({}, _this.props, { ensureModeOn: _this.ensureModeOn(ModeEnum.COLOR_MODE_FLAG), onChangeBackgroundColorPreview: _this.props.handleChangeBackgroundColorPreview, backgroundColorPreview: _this.props.backgroundColorPreview }))));
                case ModeEnum.GRADIENT_MODE_FLAG:
                    return (React.createElement(React.Fragment, null,
                        _this.renderModeSwitch(),
                        React.createElement(LinearGradientComponent, __assign({}, _this.props, { ensureModeOn: _this.ensureModeOn(ModeEnum.GRADIENT_MODE_FLAG), gradientDegPreview: _this.props.gradientDegPreview, gradientDegPreviewIndex: _this.props.gradientDegPreviewIndex, gradientOpacityPreview: _this.props.gradientOpacityPreview, gradientOpacityPreviewIndex: _this.props.gradientOpacityPreviewIndex, gradientColorPreview: _this.props.gradientColorPreview, gradientColorPreviewIndex: _this.props.gradientColorPreviewIndex, gradientColorPreviewColorIndex: _this.props.gradientColorPreviewColorIndex, onChangeGradientDegPreview: _this.props.handleChangeGradientDegPreview, onChangeGradientOpacityPreview: _this.props.handleChangeGradientOpacityPreview, onChangeGradientColorPreview: _this.props.handleChangeGradientColorPreview }))));
                case ModeEnum.IMAGE_MODE_FLAG:
                default:
                    return (React.createElement(React.Fragment, null,
                        _this.renderModeSwitch(),
                        React.createElement(ImageComponent, __assign({}, _this.props, { onImageLoaded: _this.props.handleImageLoaded, onImageUploaded: _this.props.handleImageUploaded, ensureModeOn: _this.ensureModeOn(ModeEnum.IMAGE_MODE_FLAG) }))));
            }
        };
        _this.ensureModeOn = function (mode) { return function () {
            var _a = _this.props.data.modeFlag, modeFlag = _a === void 0 ? _this.props.defaultModeFlag : _a;
            if (modeFlag && (modeFlag & mode) === 0) {
                _this.props.handleChangeModeSwitch(mode, modeFlag)();
            }
        }; };
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        _this.handleChangeMode = function (e, mode) {
            _this.setState({ mode: mode });
        };
        _this.state = {
            mode: props.defaultMode,
        };
        return _this;
    }
    Inner.prototype.render = function () {
        var _this = this;
        var _a, _b, _c, _d, _e, _f;
        var _g = this.props.data, _h = _g.hasPadding, hasPadding = _h === void 0 ? this.props.defaultHasPadding : _h, _j = _g.modeFlag, modeFlag = _j === void 0 ? this.props.defaultModeFlag : _j, _k = _g.darken, darken = _k === void 0 ? this.props.defaultDarken : _k, _l = _g.lighten, lighten = _l === void 0 ? this.props.defaultLighten : _l;
        var darkenFinal = this.props.darkenPreview !== undefined
            ? this.props.darkenPreview
            : darken !== null && darken !== void 0 ? darken : 0;
        var lightenFinal = this.props.lightenPreview !== undefined
            ? this.props.lightenPreview
            : lighten !== null && lighten !== void 0 ? lighten : 0;
        var tabs = this.props.enabledModes
            ? __spreadArray(__spreadArray(__spreadArray([], __read(((this.props.enabledModes & ModeEnum.IMAGE_MODE_FLAG) > 0
                ? [
                    React.createElement(Tab, { icon: React.createElement(ImageIcon, { color: modeFlag && (modeFlag & ModeEnum.IMAGE_MODE_FLAG) > 0
                                ? 'secondary'
                                : undefined }), label: (_a = this.props.translations) === null || _a === void 0 ? void 0 : _a.imageMode, value: ModeEnum.IMAGE_MODE_FLAG, key: ModeEnum.IMAGE_MODE_FLAG }),
                ]
                : [])), false), __read(((this.props.enabledModes & ModeEnum.COLOR_MODE_FLAG) > 0
                ? [
                    React.createElement(Tab, { icon: React.createElement(ColorIcon, { color: modeFlag && (modeFlag & ModeEnum.COLOR_MODE_FLAG) > 0
                                ? 'secondary'
                                : undefined }), label: (_b = this.props.translations) === null || _b === void 0 ? void 0 : _b.colorMode, value: ModeEnum.COLOR_MODE_FLAG, key: ModeEnum.COLOR_MODE_FLAG }),
                ]
                : [])), false), [
                (this.props.enabledModes & ModeEnum.GRADIENT_MODE_FLAG) > 0
                    ? [
                        React.createElement(Tab, { icon: React.createElement(GradientIcon, { color: modeFlag && (modeFlag & ModeEnum.GRADIENT_MODE_FLAG) > 0
                                    ? 'secondary'
                                    : undefined }), label: (_c = this.props.translations) === null || _c === void 0 ? void 0 : _c.gradientMode, value: ModeEnum.GRADIENT_MODE_FLAG, key: ModeEnum.GRADIENT_MODE_FLAG }),
                    ]
                    : [],
            ], false) : [];
        return (React.createElement("div", null,
            this.props.enabledModes ? (React.createElement(Tabs, { style: { marginBottom: 16 }, value: this.state.mode, onChange: this.handleChangeMode, centered: true }, tabs)) : null,
            this.renderUI(),
            React.createElement("br", null),
            React.createElement("div", { style: { display: 'flex' } },
                React.createElement("div", { style: { flex: 1 } },
                    React.createElement(Typography, { variant: "body1", id: "linear-gradient-darken-label" }, (_d = this.props.translations) === null || _d === void 0 ? void 0 :
                        _d.darken,
                        " (",
                        (darkenFinal * 100).toFixed(0),
                        "%)"),
                    React.createElement(Slider, { "aria-labelledby": "linear-gradient-darken-label", value: darkenFinal, onChange: function (e, value) {
                            return _this.props.handleChangeDarkenPreview(value instanceof Array ? value[0] : value);
                        }, onChangeCommitted: this.props.handleChangeDarken, step: 0.01, min: 0, max: 1 })),
                React.createElement("div", { style: { flex: 1, marginLeft: 16 } },
                    React.createElement(Typography, { variant: "body1", id: "linear-gradient-lighten-label" }, (_e = this.props.translations) === null || _e === void 0 ? void 0 :
                        _e.lighten,
                        " (",
                        (lightenFinal * 100).toFixed(0),
                        "%)"),
                    React.createElement(Slider, { "aria-labelledby": "linear-gradient-lighten-label", value: lightenFinal, onChange: function (e, value) {
                            return _this.props.handleChangeLightenPreview(value instanceof Array ? value[0] : value);
                        }, onChangeCommitted: this.props.handleChangeLighten, step: 0.01, min: 0, max: 1 })),
                React.createElement("div", { style: { flex: 1, marginLeft: 16 } },
                    React.createElement(FormControlLabel, { control: React.createElement(Switch, { onChange: this.props.handleChangeHasPadding, checked: hasPadding }), label: (_f = this.props.translations) === null || _f === void 0 ? void 0 : _f.usePadding })))));
    };
    return Inner;
}(React.Component));
export default Inner;
//# sourceMappingURL=Inner.js.map