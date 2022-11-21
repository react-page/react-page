import Create from '@mui/icons-material/Create';
import React from 'react';
import { useIsEditMode, useSetEditMode } from '../../../core/components/hooks';
import Button from '../Button/index';
var ToggleEdit = function (_a) {
    var label = _a.label;
    var isEditMode = useIsEditMode();
    var setEditMode = useSetEditMode();
    return (React.createElement(Button, { icon: React.createElement(Create, null), description: label, active: isEditMode, onClick: setEditMode }));
};
export default React.memo(ToggleEdit);
//# sourceMappingURL=index.js.map