import React from 'react';
import { IconButton, Tooltip } from '@mui/material';
import Delete from '@mui/icons-material/Delete';
import { useAllFocusedNodeIds, useRemoveMultipleNodeIds, useUiTranslator, } from '../../core/components/hooks';
var DeleteAll = function () {
    var _a;
    var remove = useRemoveMultipleNodeIds();
    var focused = useAllFocusedNodeIds();
    var t = useUiTranslator().t;
    return (React.createElement(Tooltip, { title: (_a = t('Remove all selected')) !== null && _a !== void 0 ? _a : '' },
        React.createElement(IconButton, { onClick: function () { return remove(focused); }, "aria-label": "delete", color: "secondary" },
            React.createElement(Delete, null))));
};
export default DeleteAll;
//# sourceMappingURL=DeleteAll.js.map