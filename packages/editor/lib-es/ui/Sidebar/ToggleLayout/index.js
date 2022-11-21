import ViewQuilt from '@mui/icons-material/ViewQuilt';
import React from 'react';
import { useIsLayoutMode, useSetLayoutMode, } from '../../../core/components/hooks';
import Button from '../Button';
var ToggleLayout = function (_a) {
    var label = _a.label;
    var isLayoutMode = useIsLayoutMode();
    var setLayoutMode = useSetLayoutMode();
    return (React.createElement(Button, { icon: React.createElement(ViewQuilt, null), description: label, active: isLayoutMode, onClick: setLayoutMode }));
};
export default React.memo(ToggleLayout);
//# sourceMappingURL=index.js.map