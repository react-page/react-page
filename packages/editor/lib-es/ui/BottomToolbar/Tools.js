import { IconButton, Tooltip } from '@mui/material';
import Delete from '@mui/icons-material/Delete';
import React from 'react';
import { useRemoveCell, useUiTranslator } from '../../core/components/hooks';
import DraftSwitch from '../DraftSwitch';
import { DuplicateButton } from '../DuplicateButton';
import { I18nTools } from '../I18nTools';
import { SelectParentButton } from '../SelectParentButton';
export var BottomToolbarTools = React.memo(function (_a) {
    var _b;
    var nodeId = _a.nodeId;
    var t = useUiTranslator().t;
    var removeCell = useRemoveCell(nodeId);
    return (React.createElement("div", { style: { display: 'flex', alignItems: 'center' } },
        React.createElement(I18nTools, { nodeId: nodeId }),
        React.createElement(DraftSwitch, { nodeId: nodeId }),
        React.createElement(SelectParentButton, { nodeId: nodeId }),
        React.createElement(DuplicateButton, { nodeId: nodeId }),
        React.createElement(Tooltip, { title: (_b = t('Remove Plugin')) !== null && _b !== void 0 ? _b : '' },
            React.createElement(IconButton, { onClick: function () { return removeCell(); }, "aria-label": "delete", color: "secondary" },
                React.createElement(Delete, null)))));
});
//# sourceMappingURL=Tools.js.map