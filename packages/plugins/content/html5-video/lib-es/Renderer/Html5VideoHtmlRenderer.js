import React from 'react';
import { defaultHtml5VideoState } from '../default/state';
var Html5VideoHtmlRenderer = function (_a) {
    var _b;
    var _c = _a.data, data = _c === void 0 ? defaultHtml5VideoState : _c;
    return (React.createElement("div", { className: "react-page-content-plugin-html5-video" },
        React.createElement("video", { autoPlay: true, controls: true, loop: true, muted: true, width: "100%", key: data === null || data === void 0 ? void 0 : data.url },
            React.createElement("source", { src: data === null || data === void 0 ? void 0 : data.url, type: "video/".concat((_b = data === null || data === void 0 ? void 0 : data.url) === null || _b === void 0 ? void 0 : _b.split('.').pop()) }))));
};
export default Html5VideoHtmlRenderer;
//# sourceMappingURL=Html5VideoHtmlRenderer.js.map