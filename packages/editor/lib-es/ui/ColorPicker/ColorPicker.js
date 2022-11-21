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
import Button from '@mui/material/Button';
import Popover from '@mui/material/Popover';
import ColorizeIcon from '@mui/icons-material/Colorize';
import React from 'react';
import { ChromePicker } from 'react-color';
import { colorToString } from './colorToString';
var ColorPicker = /** @class */ (function (_super) {
    __extends(ColorPicker, _super);
    function ColorPicker() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.anchorEl = null;
        _this.state = {
            isColorPickerVisible: false,
        };
        _this.handleClickShowColorPicker = function (e) {
            var _a;
            if ((_a = _this.props) === null || _a === void 0 ? void 0 : _a.onDialogOpen) {
                _this.props.onDialogOpen();
            }
            _this.setState({ isColorPickerVisible: !_this.state.isColorPickerVisible });
        };
        _this.onChange = function (e) {
            return _this.props.onChange && _this.props.onChange(e.rgb);
        };
        _this.handleChangeComplete = function (e) {
            return _this.props.onChangeComplete && _this.props.onChangeComplete(e.rgb);
        };
        return _this;
    }
    ColorPicker.prototype.render = function () {
        var _this = this;
        var _a;
        return (React.createElement(React.Fragment, null,
            React.createElement(Button, { ref: function (node) {
                    _this.anchorEl = node;
                }, variant: "contained", onClick: this.handleClickShowColorPicker, style: __assign(__assign({}, this.props.style), { borderColor: colorToString(this.props.color), borderStyle: 'solid', borderWidth: '2px' }) },
                this.props.buttonContent,
                this.props.icon),
            React.createElement(Popover, { open: this.state.isColorPickerVisible, anchorEl: this.anchorEl, onClose: this.handleClickShowColorPicker, anchorOrigin: {
                    vertical: 'top',
                    horizontal: 'center',
                }, transformOrigin: {
                    vertical: 'bottom',
                    horizontal: 'center',
                } },
                React.createElement("div", null,
                    React.createElement(ChromePicker, { color: (_a = this.props.color) !== null && _a !== void 0 ? _a : undefined, onChange: this.onChange, onChangeComplete: this.handleChangeComplete })))));
    };
    ColorPicker.defaultProps = {
        buttonContent: 'Change color',
        icon: React.createElement(ColorizeIcon, { style: { marginLeft: '4px', fontSize: '19px' } }),
    };
    return ColorPicker;
}(React.Component));
export default ColorPicker;
//# sourceMappingURL=ColorPicker.js.map