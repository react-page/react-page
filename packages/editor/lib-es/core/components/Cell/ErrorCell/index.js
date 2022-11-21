import React from 'react';
import { useIsEditMode, useRemoveCell, useUiTranslator } from '../../hooks';
var ErrorCell = function (_a) {
    var nodeId = _a.nodeId, error = _a.error;
    var isEditMode = useIsEditMode();
    var removeCell = useRemoveCell(nodeId);
    var t = useUiTranslator().t;
    return (React.createElement("div", { className: "react-page-cell-error" },
        React.createElement("strong", null, t('An error occurred!')),
        React.createElement("small", null,
            React.createElement("dl", null,
                React.createElement("dt", null, t('Cause:')),
                React.createElement("dd", null, error.message),
                React.createElement("dt", null, t('Cell:')),
                React.createElement("dd", null, nodeId))),
        isEditMode ? (React.createElement("button", { onClick: function () { return removeCell(); } }, t('Remove'))) : null));
};
export default ErrorCell;
//# sourceMappingURL=index.js.map