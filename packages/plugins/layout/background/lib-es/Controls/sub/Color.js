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
import React, { Component } from 'react';
import { ColorPicker } from '@react-page/editor';
var ColorComponent = /** @class */ (function (_super) {
    __extends(ColorComponent, _super);
    function ColorComponent() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.handleChangePickerBackgroundColor = function (e) {
            return _this.props.onChangeBackgroundColorPreview &&
                _this.props.onChangeBackgroundColorPreview(e);
        };
        _this.handleChangePickerBackgroundColorComplete = function (e) {
            if (_this.props.onChangeBackgroundColorPreview) {
                _this.props.onChangeBackgroundColorPreview(undefined);
            }
            _this.props.onChange({ backgroundColor: e });
        };
        return _this;
    }
    ColorComponent.prototype.render = function () {
        var _a = this.props, backgroundColorPreview = _a.backgroundColorPreview, _b = _a.data.backgroundColor, backgroundColor = _b === void 0 ? this.props.defaultBackgroundColor : _b;
        return (React.createElement("div", { style: { display: 'flex' } },
            React.createElement(ColorPicker, { color: backgroundColorPreview ? backgroundColorPreview : backgroundColor, onChange: this.handleChangePickerBackgroundColor, onDialogOpen: this.props.ensureModeOn, onChangeComplete: this.handleChangePickerBackgroundColorComplete, style: { margin: 'auto' } })));
    };
    return ColorComponent;
}(Component));
export default ColorComponent;
//# sourceMappingURL=Color.js.map