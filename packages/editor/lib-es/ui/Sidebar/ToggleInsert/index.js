import ContentAdd from '@mui/icons-material/Add';
import React from 'react';
import { useIsInsertMode, useSetInsertMode, } from '../../../core/components/hooks';
import Button from '../Button/index';
var ToggleInsert = function (_a) {
    var label = _a.label;
    var isInsertMode = useIsInsertMode();
    var setInsertMode = useSetInsertMode();
    return (React.createElement(Button, { icon: React.createElement(ContentAdd, null), description: label, active: isInsertMode, onClick: setInsertMode }));
};
export default React.memo(ToggleInsert);
//# sourceMappingURL=index.js.map