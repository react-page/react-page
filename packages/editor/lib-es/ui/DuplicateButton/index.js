import { IconButton, Tooltip } from '@mui/material';
import Icon from '@mui/icons-material/FileCopy';
import React from 'react';
import { useDuplicateCell, useUiTranslator } from '../../core/components/hooks';
export var DuplicateButton = React.memo(function (_a) {
    var _b;
    var nodeId = _a.nodeId;
    var duplicateCell = useDuplicateCell(nodeId);
    var t = useUiTranslator().t;
    return (React.createElement(Tooltip, { title: (_b = t('Duplicate Plugin')) !== null && _b !== void 0 ? _b : '' },
        React.createElement(IconButton, { onClick: duplicateCell, "aria-label": "delete", color: "default" },
            React.createElement(Icon, null))));
});
//# sourceMappingURL=index.js.map