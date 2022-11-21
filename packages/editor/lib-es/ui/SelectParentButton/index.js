import IconButton from '@mui/material/IconButton';
import VerticalAlignTopIcon from '@mui/icons-material/VerticalAlignTop';
import React from 'react';
import { useFocusCell, useParentCellId, useUiTranslator, } from '../../core/components/hooks';
export var SelectParentButton = React.memo(function (_a) {
    var _b;
    var nodeId = _a.nodeId;
    var parentCellId = useParentCellId(nodeId);
    var t = useUiTranslator().t;
    var focusParent = useFocusCell(parentCellId);
    return parentCellId ? (React.createElement(IconButton, { className: "bottomToolbar__selectParentButton", onClick: function () { return focusParent(); }, color: "default", title: (_b = t('Select parent')) !== null && _b !== void 0 ? _b : '' },
        React.createElement(VerticalAlignTopIcon, null))) : null;
});
//# sourceMappingURL=index.js.map