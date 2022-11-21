import React, { useRef } from 'react';
import { useDisplayMode, useZoom } from '../../hooks';
import { useKeepScrollPosition } from '../hooks/useKeepScrollPosition';
import Rows from './Rows';
var Inner = function () {
    var _a, _b, _c;
    var mode = useDisplayMode();
    var ref = useRef(null);
    var zoom = useZoom();
    useKeepScrollPosition(ref);
    var rect = (_a = ref.current) === null || _a === void 0 ? void 0 : _a.getBoundingClientRect();
    var zoomTransformOriginY = window.innerHeight / 2 - ((_b = rect === null || rect === void 0 ? void 0 : rect.top) !== null && _b !== void 0 ? _b : 0);
    var offsetPercent = zoomTransformOriginY / ((_c = rect === null || rect === void 0 ? void 0 : rect.height) !== null && _c !== void 0 ? _c : 0);
    var backdropPercent = 50 * (1 - zoom);
    var left = backdropPercent + '%';
    var right = 100 - backdropPercent + '%';
    var top = backdropPercent * offsetPercent * 2 + '%';
    var bottom = 100 - backdropPercent * (1 - offsetPercent) * 2 + '%';
    return (React.createElement("div", { ref: ref, style: {
            position: 'relative',
        } },
        React.createElement("div", { style: {
                opacity: zoom < 1 ? 1 : 0,
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                transition: '0.6s',
                clipPath: "polygon(0% 0%, 0% 100%, ".concat(left, " 100%, ").concat(left, " ").concat(top, ", ").concat(right, " ").concat(top, ", ").concat(right, " ").concat(bottom, ", ").concat(left, " ").concat(bottom, ", ").concat(left, " 100%, 100% 100%, 100% 0%)"),
                background: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16  ' viewBox='0 0 8 8'%3E%3Cg fill='%23c5c5c5' fill-opacity='0.4'%3E%3Cpath fill-rule='evenodd' d='M0 0h4v4H0V0zm4 4h4v4H4V4z'/%3E%3C/g%3E%3C/svg%3E\")",
            } }),
        React.createElement("div", { style: {
                transformOrigin: "center ".concat(zoomTransformOriginY, "px"),
                transform: "scale(".concat(zoom, ")"),
                transition: '0.6s',
            }, className: 'react-page-editable react-page-editable-mode-' + mode },
            React.createElement(Rows, null))));
};
export default React.memo(Inner);
//# sourceMappingURL=index.js.map