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
/* eslint-disable @typescript-eslint/no-explicit-any */
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Slider from '@mui/material/Slider';
import Typography from '@mui/material/Typography';
import DeleteIcon from '@mui/icons-material/Delete';
import { ColorPicker } from '@react-page/editor';
import React from 'react';
var LinearGradientComponent = /** @class */ (function (_super) {
    __extends(LinearGradientComponent, _super);
    function LinearGradientComponent() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.addGradient = function () {
            _this.props.ensureModeOn();
            _this.props.onChange({
                gradients: (_this.props.data.gradients
                    ? _this.props.data.gradients
                    : []).concat({
                    deg: 45,
                    opacity: 1,
                }),
            });
        };
        _this.handleChangeDeg = function (index, value) { return function () {
            _this.props.onChangeGradientDegPreview &&
                _this.props.onChangeGradientDegPreview(undefined, undefined);
            _this.props.onChange({
                gradients: (_this.props.data.gradients
                    ? _this.props.data.gradients
                    : []).map(function (g, i) { return (i === index ? __assign(__assign({}, g), { deg: value }) : g); }),
            });
        }; };
        _this.handleChangeDegPreview = function (index) { return function (e, value) {
            _this.props.onChangeGradientDegPreview &&
                _this.props.onChangeGradientDegPreview(value, index);
        }; };
        _this.handleChangeOpacity = function (index, value) { return function () {
            _this.props.onChangeGradientOpacityPreview &&
                _this.props.onChangeGradientOpacityPreview(undefined, undefined);
            _this.props.onChange({
                gradients: (_this.props.data.gradients
                    ? _this.props.data.gradients
                    : []).map(function (g, i) { return (i === index ? __assign(__assign({}, g), { opacity: value }) : g); }),
            });
        }; };
        _this.handleChangeOpacityPreview = function (index) { return function (e, value) {
            _this.props.onChangeGradientOpacityPreview &&
                _this.props.onChangeGradientOpacityPreview(value, index);
        }; };
        _this.handleChangeGradientColor = function (index, cpIndex) { return function (e) {
            var _a;
            _this.props.onChangeGradientColorPreview &&
                _this.props.onChangeGradientColorPreview(undefined, undefined, undefined);
            _this.props.onChange({
                gradients: ((_a = _this.props.data.gradients) !== null && _a !== void 0 ? _a : []).map(function (g, i) {
                    return i === index
                        ? __assign(__assign({}, g), { colors: (g.colors ? g.colors : []).map(function (c, cpI) {
                                return cpI === cpIndex ? __assign(__assign({}, c), { color: e }) : c;
                            }) }) : g;
                }),
            });
        }; };
        _this.handleChangeGradientColorPreview = function (index, cpIndex) { return function (e) {
            _this.props.onChangeGradientColorPreview &&
                _this.props.onChangeGradientColorPreview(e, index, cpIndex);
        }; };
        _this.addColor = function (index) { return function () {
            var _a;
            _this.props.ensureModeOn();
            _this.props.onChange({
                gradients: (_a = _this.props.data.gradients) === null || _a === void 0 ? void 0 : _a.map(function (g, i) {
                    return i === index
                        ? __assign(__assign({}, g), { colors: __spreadArray(__spreadArray([], __read((g.colors ? g.colors : [])), false), [
                                {
                                    color: (g.colors ? g.colors : []).length % 2 === index % 2
                                        ? _this.props.defaultGradientColor
                                        : _this.props.defaultGradientSecondaryColor,
                                },
                            ], false) }) : g;
                }),
            });
        }; };
        _this.removeColor = function (index, cpIndex) { return function () {
            var _a;
            _this.props.onChange({
                gradients: (_a = _this.props.data.gradients) === null || _a === void 0 ? void 0 : _a.map(function (g, i) {
                    return i === index
                        ? __assign(__assign({}, g), { colors: (g.colors ? g.colors : []).filter(function (c, cpI) { return cpI !== cpIndex; }) }) : g;
                }),
            });
        }; };
        _this.removeGradient = function (index) { return function () {
            var _a;
            _this.props.onChange({
                gradients: (_a = _this.props.data.gradients) === null || _a === void 0 ? void 0 : _a.filter(function (item, i) { return i !== index; }),
            });
        }; };
        return _this;
    }
    LinearGradientComponent.prototype.render = function () {
        var _this = this;
        var _a;
        var _b = this.props, gradientDegPreview = _b.gradientDegPreview, gradientDegPreviewIndex = _b.gradientDegPreviewIndex, gradientOpacityPreview = _b.gradientOpacityPreview, gradientOpacityPreviewIndex = _b.gradientOpacityPreviewIndex, gradientColorPreview = _b.gradientColorPreview, gradientColorPreviewIndex = _b.gradientColorPreviewIndex, gradientColorPreviewColorIndex = _b.gradientColorPreviewColorIndex, _c = _b.data.gradients, gradients = _c === void 0 ? [] : _c;
        return (React.createElement("div", null,
            gradients.map(function (gradient, i) {
                var _a, _b, _c, _d;
                var colors = gradient.colors ? gradient.colors : [];
                var deg = i === gradientDegPreviewIndex && gradientDegPreview !== undefined
                    ? gradientDegPreview
                    : gradient.deg;
                var opacity = i === gradientOpacityPreviewIndex &&
                    gradientOpacityPreview !== undefined
                    ? gradientOpacityPreview
                    : gradient.opacity;
                return (React.createElement("div", { key: i },
                    React.createElement("div", { style: { display: 'flex', maxWidth: '96%' } },
                        React.createElement("div", { style: { flex: 1 } },
                            React.createElement(Typography, { variant: "body1", id: "linear-gradient-degree-label" }, (_a = _this.props.translations) === null || _a === void 0 ? void 0 :
                                _a.gradientRotation,
                                " (",
                                deg, (_b = _this.props.translations) === null || _b === void 0 ? void 0 :
                                _b.degrees,
                                ")"),
                            React.createElement(Slider, { "aria-labelledby": "linear-gradient-degree-label", value: deg, onChange: _this.handleChangeDegPreview(i), onChangeCommitted: _this.handleChangeDeg(i, deg), step: 5, min: 0, max: 360 })),
                        React.createElement("div", { style: { flex: 1, marginLeft: 16 } },
                            React.createElement(Typography, { variant: "body1", id: "linear-gradient-opacity-label" }, (_c = _this.props.translations) === null || _c === void 0 ? void 0 :
                                _c.gradientOpacity,
                                " (",
                                (opacity * 100).toFixed(0),
                                "%)"),
                            React.createElement(Slider, { "aria-labelledby": "linear-gradient-opacity-label", value: opacity, onChange: _this.handleChangeOpacityPreview(i), onChangeCommitted: _this.handleChangeOpacity(i, opacity), step: 0.01, min: 0, max: 1 }))),
                    React.createElement("div", { style: { marginBottom: 32 } },
                        colors.map(function (c, cpIndex) {
                            var color = i === gradientColorPreviewIndex &&
                                cpIndex === gradientColorPreviewColorIndex &&
                                gradientColorPreview !== undefined
                                ? gradientColorPreview
                                : c.color;
                            return (React.createElement(React.Fragment, { key: cpIndex },
                                React.createElement(ColorPicker, { buttonContent: 'Select color ' + cpIndex, style: { marginLeft: '8px' }, color: color, onChange: _this.handleChangeGradientColorPreview(i, cpIndex), onChangeComplete: _this.handleChangeGradientColor(i, cpIndex) }),
                                React.createElement(IconButton, { "aria-label": "Delete", onClick: _this.removeColor(i, cpIndex) },
                                    React.createElement(DeleteIcon, null))));
                        }),
                        React.createElement(Button, { variant: "contained", onClick: _this.addColor(i), style: { marginLeft: '8px' } }, (_d = _this.props.translations) === null || _d === void 0 ? void 0 : _d.addColor),
                        React.createElement(IconButton, { "aria-label": "Delete", onClick: _this.removeGradient(i) },
                            React.createElement(DeleteIcon, null)))));
            }),
            React.createElement(Button, { style: {
                    margin: 'auto',
                }, variant: "outlined", onClick: this.addGradient, disabled: gradients.length > 5 }, (_a = this.props.translations) === null || _a === void 0 ? void 0 : _a.addGradient)));
    };
    return LinearGradientComponent;
}(React.Component));
export default LinearGradientComponent;
//# sourceMappingURL=LinearGradient.js.map