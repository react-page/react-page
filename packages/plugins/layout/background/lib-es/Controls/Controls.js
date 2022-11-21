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
import React from 'react';
import Inner from './Inner';
var BackgroundDefaultControls = /** @class */ (function (_super) {
    __extends(BackgroundDefaultControls, _super);
    function BackgroundDefaultControls(props) {
        var _this = _super.call(this, props) || this;
        _this.handleChangeDarken = function () {
            _this.props.onChange({ darken: _this.state.darkenPreview });
            _this.setState({ darkenPreview: undefined });
        };
        _this.handleChangeDarkenPreview = function (value) {
            _this.setState({ darkenPreview: value });
        };
        _this.handleChangeLighten = function () {
            _this.props.onChange({ lighten: _this.state.lightenPreview });
            _this.setState({ lightenPreview: undefined });
        };
        _this.handleChangeLightenPreview = function (value) {
            _this.setState({ lightenPreview: value });
        };
        _this.handleChangeHasPadding = function () {
            _this.props.onChange({
                hasPadding: _this.props.data.hasPadding === undefined
                    ? !_this.props.defaultHasPadding
                    : !_this.props.data.hasPadding,
            });
        };
        _this.handleChangeBackgroundColorPreview = function (e) {
            return _this.setState({ backgroundColorPreview: e });
        };
        _this.handleChangeGradientDegPreview = function (gradientDegPreview, gradientDegPreviewIndex) { return _this.setState({ gradientDegPreview: gradientDegPreview, gradientDegPreviewIndex: gradientDegPreviewIndex }); };
        _this.handleChangeGradientOpacityPreview = function (gradientOpacityPreview, gradientOpacityPreviewIndex) { return _this.setState({ gradientOpacityPreview: gradientOpacityPreview, gradientOpacityPreviewIndex: gradientOpacityPreviewIndex }); };
        _this.handleChangeGradientColorPreview = function (gradientColorPreview, gradientColorPreviewIndex, gradientColorPreviewColorIndex) {
            return _this.setState({
                gradientColorPreview: gradientColorPreview,
                gradientColorPreviewIndex: gradientColorPreviewIndex,
                gradientColorPreviewColorIndex: gradientColorPreviewColorIndex,
            });
        };
        _this.handleImageLoaded = function (imagePreview) {
            return _this.setState({ imagePreview: imagePreview });
        };
        _this.handleImageUploaded = function () { return _this.setState({ imagePreview: undefined }); };
        _this.handleChangeModeSwitch = function (mode, modeFlag) { return function () {
            if (mode && modeFlag) {
                modeFlag ^= mode;
                _this.props.onChange({ modeFlag: modeFlag });
            }
            else {
                _this.props.onChange({ modeFlag: modeFlag });
            }
        }; };
        _this.state = {};
        return _this;
    }
    BackgroundDefaultControls.prototype.render = function () {
        return (React.createElement(Inner, __assign({}, this.props, { handleChangeDarken: this.handleChangeDarken, handleChangeDarkenPreview: this.handleChangeDarkenPreview, handleChangeLighten: this.handleChangeLighten, handleChangeLightenPreview: this.handleChangeLightenPreview, handleChangeHasPadding: this.handleChangeHasPadding, handleChangeModeSwitch: this.handleChangeModeSwitch, handleChangeBackgroundColorPreview: this.handleChangeBackgroundColorPreview, handleChangeGradientDegPreview: this.handleChangeGradientDegPreview, handleChangeGradientOpacityPreview: this.handleChangeGradientOpacityPreview, handleChangeGradientColorPreview: this.handleChangeGradientColorPreview, handleImageLoaded: this.handleImageLoaded, handleImageUploaded: this.handleImageUploaded }, this.state)));
    };
    return BackgroundDefaultControls;
}(React.Component));
export default BackgroundDefaultControls;
//# sourceMappingURL=Controls.js.map