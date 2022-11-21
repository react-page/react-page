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
import React from 'react';
import Switch from '@mui/material/Switch';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import { ImageUpload } from '@react-page/editor';
import Typography from '@mui/material/Typography';
var ImageComponent = /** @class */ (function (_super) {
    __extends(ImageComponent, _super);
    function ImageComponent() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.handleChangeBackground = function (e) {
            _this.props.ensureModeOn();
            _this.props.onChange({ background: e.target.value });
        };
        _this.handleChangeIsParallax = function (e) {
            _this.props.ensureModeOn();
            _this.props.onChange({
                isParallax: _this.props.data.isParallax === undefined
                    ? false
                    : !_this.props.data.isParallax,
            });
        };
        _this.handleImageLoaded = function (image) {
            _this.props.ensureModeOn();
            _this.props.onImageLoaded(image);
        };
        _this.handleImageUploaded = function (resp) {
            _this.props.onImageUploaded();
            _this.props.onChange({ background: resp.url });
        };
        return _this;
    }
    ImageComponent.prototype.render = function () {
        var _a, _b, _c, _d, _e;
        var _f = this.props.data, _g = _f.isParallax, isParallax = _g === void 0 ? true : _g, _h = _f.background, background = _h === void 0 ? '' : _h;
        return (React.createElement("div", null,
            React.createElement("div", { style: { display: 'flex' } },
                this.props.imageUpload && (React.createElement(React.Fragment, null,
                    React.createElement(ImageUpload, { translations: this.props.translations, imageUpload: this.props.imageUpload, imageLoaded: this.handleImageLoaded, imageUploaded: this.handleImageUploaded }),
                    React.createElement(Typography, { variant: "body1", style: { margin: '20px 16px 0 16px' } }, (_a = this.props.translations) === null || _a === void 0 ? void 0 : _a.or))),
                React.createElement(TextField, { placeholder: (_b = this.props.translations) === null || _b === void 0 ? void 0 : _b.srcPlaceholder, label: this.props.imageUpload
                        ? (_c = this.props.translations) === null || _c === void 0 ? void 0 : _c.haveUrl
                        : (_d = this.props.translations) === null || _d === void 0 ? void 0 : _d.imageUrl, style: { width: '256px' }, value: background, onChange: this.handleChangeBackground }),
                React.createElement(FormControlLabel, { control: React.createElement(Switch, { onChange: this.handleChangeIsParallax, checked: isParallax }), label: (_e = this.props.translations) === null || _e === void 0 ? void 0 : _e.isParallax }))));
    };
    return ImageComponent;
}(React.Component));
export default ImageComponent;
//# sourceMappingURL=Image.js.map