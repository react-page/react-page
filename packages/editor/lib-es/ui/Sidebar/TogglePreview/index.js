import Devices from '@mui/icons-material/Devices';
import React from 'react';
import { useIsPreviewMode, useSetPreviewMode, } from '../../../core/components/hooks';
import Button from '../Button/index';
var TogglePreview = function (_a) {
    var label = _a.label;
    var isPreviewMode = useIsPreviewMode();
    var setIsPreviewMode = useSetPreviewMode();
    return (React.createElement(Button, { icon: React.createElement(Devices, null), description: label, active: isPreviewMode, onClick: setIsPreviewMode }));
};
export default React.memo(TogglePreview);
//# sourceMappingURL=index.js.map