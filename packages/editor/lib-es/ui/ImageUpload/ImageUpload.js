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
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import ErrorIcon from '@mui/icons-material/Error';
import { defaultTranslations } from './defaultTranslations';
import { useUiTranslator } from '../../core/components/hooks';
var NO_FILE_ERROR_CODE = 1;
var BAD_EXTENSION_ERROR_CODE = 2;
var TOO_BIG_ERROR_CODE = 3;
var UPLOADING_ERROR_CODE = 4;
/*
 * FIXME: rewrite to functional component
 */
var ImageUpload = /** @class */ (function (_super) {
    __extends(ImageUpload, _super);
    function ImageUpload() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            isUploading: false,
            hasError: false,
            errorText: '',
            progress: 0,
        };
        _this.hasExtension = function (fileName) {
            var patternPart = _this.props.allowedExtensions
                ? _this.props.allowedExtensions.map(function (a) { return a.toLowerCase(); }).join('|')
                : '';
            var pattern = '(' + patternPart.replace(/\./g, '\\.') + ')$';
            return new RegExp(pattern, 'i').test(fileName.toLowerCase());
        };
        _this.handleError = function (errorCode) {
            var _a, _b, _c, _d, _e;
            var errorText;
            switch (errorCode) {
                case NO_FILE_ERROR_CODE:
                    errorText = _this.props.t((_a = _this.props.translations) === null || _a === void 0 ? void 0 : _a.noFileError);
                    break;
                case BAD_EXTENSION_ERROR_CODE:
                    errorText = _this.props.t((_b = _this.props.translations) === null || _b === void 0 ? void 0 : _b.badExtensionError);
                    break;
                case TOO_BIG_ERROR_CODE:
                    errorText = _this.props.t((_c = _this.props.translations) === null || _c === void 0 ? void 0 : _c.tooBigError);
                    break;
                case UPLOADING_ERROR_CODE:
                    errorText = _this.props.t((_d = _this.props.translations) === null || _d === void 0 ? void 0 : _d.uploadingError);
                    break;
                default:
                    errorText = _this.props.t((_e = _this.props.translations) === null || _e === void 0 ? void 0 : _e.unknownError);
                    break;
            }
            // Need to flick "isUploading" because otherwise the handler doesn't fire properly
            _this.setState({ hasError: true, errorText: errorText, isUploading: true }, function () {
                return _this.setState({ isUploading: false });
            });
            setTimeout(function () { return _this.setState({ hasError: false, errorText: '' }); }, 5000);
        };
        _this.handleFileSelected = function (e) {
            if (!e.target.files || !e.target.files[0]) {
                _this.handleError(NO_FILE_ERROR_CODE);
                return;
            }
            var file = e.target.files[0];
            if (!_this.hasExtension(file.name)) {
                _this.handleError(BAD_EXTENSION_ERROR_CODE);
                return;
            }
            if (_this.props.maxFileSize && file.size > _this.props.maxFileSize) {
                _this.handleError(TOO_BIG_ERROR_CODE);
                return;
            }
            if (_this.props.imageLoaded) {
                _this.readFile(file).then(function (data) { var _a, _b; return (_b = (_a = _this.props).imageLoaded) === null || _b === void 0 ? void 0 : _b.call(_a, data); });
            }
            if (_this.props.imageUpload) {
                _this.setState({ isUploading: true });
                _this.props
                    .imageUpload(file, _this.handleReportProgress)
                    .then(function (resp) {
                    _this.setState({ progress: undefined, isUploading: false });
                    _this.props.imageUploaded && _this.props.imageUploaded(resp);
                })
                    .catch(function (error) {
                    _this.setState({ isUploading: false });
                    _this.props.imageUploadError && _this.props.imageUploadError(error);
                });
            }
        };
        _this.handleFileUploadClick = function () { var _a; return (_a = _this.fileInput) === null || _a === void 0 ? void 0 : _a.click(); };
        _this.handleReportProgress = function (progress) { return _this.setState({ progress: progress }); };
        _this.renderChildren = function () {
            var _a;
            if (_this.state.isUploading) {
                return React.createElement(CircularProgress, { value: _this.state.progress, size: 19 });
            }
            if (_this.state.hasError) {
                return (React.createElement(React.Fragment, null,
                    _this.state.errorText,
                    React.createElement(ErrorIcon, { style: { marginLeft: '8px' } })));
            }
            return (React.createElement(React.Fragment, null, (_a = _this.props.translations) === null || _a === void 0 ? void 0 :
                _a.buttonContent,
                _this.props.icon));
        };
        return _this;
    }
    ImageUpload.prototype.readFile = function (file) {
        return new Promise(function (resolve, reject) {
            var reader = new FileReader();
            // Read the image via FileReader API and save image result in state.
            reader.onload = function (e) {
                // Add the file name to the data URL
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                var dataUrl = e.target.result;
                dataUrl = dataUrl.replace(';base64', ";name=".concat(file.name, ";base64"));
                resolve({ file: file, dataUrl: dataUrl });
            };
            reader.readAsDataURL(file);
        });
    };
    ImageUpload.prototype.render = function () {
        var _this = this;
        return (React.createElement(React.Fragment, null,
            React.createElement(Button, { disabled: this.state.isUploading, variant: "contained", color: this.state.hasError ? 'secondary' : 'primary', onClick: this.handleFileUploadClick, style: this.props.style, size: "small" }, this.renderChildren()),
            !this.state.isUploading && (React.createElement("input", { style: { display: 'none' }, ref: function (fileInput) { return (_this.fileInput = fileInput); }, type: "file", onChange: this.handleFileSelected }))));
    };
    ImageUpload.defaultProps = {
        icon: React.createElement(CloudUploadIcon, { style: { marginLeft: '8px' } }),
        allowedExtensions: ['jpg', 'jpeg', 'png'],
        maxFileSize: 5242880,
        translations: defaultTranslations,
    };
    return ImageUpload;
}(React.Component));
export default (function (props) {
    var t = useUiTranslator().t;
    return React.createElement(ImageUpload, __assign({}, props, { t: t }));
});
//# sourceMappingURL=ImageUpload.js.map