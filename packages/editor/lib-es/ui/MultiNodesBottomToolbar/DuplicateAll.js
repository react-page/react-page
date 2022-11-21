import { IconButton, Tooltip } from '@mui/material';
import React from 'react';
import { useAllFocusedNodeIds, useDuplicateMultipleCells, useUiTranslator, } from '../../core/components/hooks';
import Icon from '@mui/icons-material/FileCopy';
var DuplicateAll = function () {
    var _a;
    var duplicate = useDuplicateMultipleCells();
    var t = useUiTranslator().t;
    var nodeIds = useAllFocusedNodeIds();
    return (React.createElement(Tooltip, { title: (_a = t('Duplicate al')) !== null && _a !== void 0 ? _a : '' },
        React.createElement(IconButton, { onClick: function () { return duplicate(nodeIds); }, "aria-label": "delete", color: "default" },
            React.createElement(Icon, null))));
};
export default DuplicateAll;
//# sourceMappingURL=DuplicateAll.js.map