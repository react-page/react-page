import React from 'react';
import PlayArrow from '@mui/icons-material/PlayArrow';
import { iconStyle } from '../common/styles';
import { lazyLoad } from '@react-page/editor';
// react player is big, better lazy load it.
var ReactPlayer = lazyLoad(function () { return import('react-player'); });
var Display = function (_a) {
    var data = _a.data, readOnly = _a.readOnly;
    return (data === null || data === void 0 ? void 0 : data.src) ? (React.createElement("div", { style: { position: 'relative', height: 0, paddingBottom: '65.25%' } },
        readOnly ? null : (React.createElement("div", { style: {
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                zIndex: 10,
            } })),
        React.createElement(ReactPlayer, { url: data === null || data === void 0 ? void 0 : data.src, height: "100%", width: "100%", style: {
                position: 'absolute',
                width: '100%',
                height: '100%',
            } }))) : (React.createElement("div", { className: "react-page-plugins-content-video-placeholder" },
        React.createElement(PlayArrow, { style: iconStyle })));
};
export default Display;
//# sourceMappingURL=VideoHtmlRenderer.js.map