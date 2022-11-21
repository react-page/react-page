import IconZoomOut from '@mui/icons-material/ZoomOut';
import IconZoomIn from '@mui/icons-material/ZoomIn';
import React from 'react';
import { useCanZoomIn, useCanZoomOut, useIsSmallScreen, useZoomIn, useZoomOut, } from '../../../core/components/hooks';
import Button from '../Button/index';
var Zoom = function (_a) {
    var labelZoomIn = _a.labelZoomIn, labelZoomOut = _a.labelZoomOut;
    var canZoomIn = useCanZoomIn();
    var canZoomOut = useCanZoomOut();
    var zoomOut = useZoomOut();
    var zoomIn = useZoomIn();
    var isSmall = useIsSmallScreen();
    return (React.createElement("div", { style: {
            height: isSmall ? 56 : 80,
            float: 'right',
            display: 'flex',
            direction: 'ltr',
            transform: 'scale(1.2)',
        } },
        React.createElement("div", { style: {
                width: isSmall ? 29 : 36,
                overflow: 'hidden',
                marginRight: isSmall ? 1 : 2,
            } },
            React.createElement(Button, { active: true, disabled: !canZoomIn, style: {
                    transform: "translateX(".concat(isSmall ? 27 : 35, "px)"),
                }, icon: React.createElement(IconZoomIn, { style: { transform: "translateX(-".concat(isSmall ? 6 : 12, "px)") } }), description: labelZoomIn, onClick: zoomIn, activeColor: "default" })),
        React.createElement("div", { style: {
                width: isSmall ? 28 : 36,
                overflow: 'hidden',
                marginLeft: 1,
            } },
            React.createElement(Button, { style: {
                    position: 'relative',
                    transform: 'translateX(1px)',
                }, active: true, disabled: !canZoomOut, icon: React.createElement(IconZoomOut, { style: { transform: "translateX(".concat(isSmall ? 6 : 12, "px)") } }), description: labelZoomOut, onClick: zoomOut, activeColor: "default" }))));
};
export default React.memo(Zoom);
//# sourceMappingURL=index.js.map