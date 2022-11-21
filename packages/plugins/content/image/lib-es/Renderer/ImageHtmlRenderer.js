import React from 'react';
import { iconStyle } from './../common/styles';
import { lazyLoad } from '@react-page/editor';
var ImageIcon = lazyLoad(function () { return import('@mui/icons-material/Landscape'); });
var ImageHtmlRenderer = function (props) {
    var data = props.data;
    var src = data === null || data === void 0 ? void 0 : data.src;
    var alt = data === null || data === void 0 ? void 0 : data.alt;
    var openInNewWindow = data === null || data === void 0 ? void 0 : data.openInNewWindow;
    var image = (React.createElement("img", { className: "react-page-plugins-content-image", alt: alt, src: src }));
    return src ? (React.createElement("div", null, (data === null || data === void 0 ? void 0 : data.href) ? (React.createElement("a", { onClick: props.isEditMode ? function (e) { return e.preventDefault(); } : undefined, href: data === null || data === void 0 ? void 0 : data.href, target: openInNewWindow ? '_blank' : undefined, rel: openInNewWindow ? 'noreferrer noopener' : undefined }, image)) : (image))) : (React.createElement("div", null,
        React.createElement("div", { className: "react-page-plugins-content-image-placeholder" },
            React.createElement(ImageIcon, { style: iconStyle }))));
};
export default ImageHtmlRenderer;
//# sourceMappingURL=ImageHtmlRenderer.js.map