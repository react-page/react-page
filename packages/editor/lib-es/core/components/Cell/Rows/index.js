import React from 'react';
import Row from '../../Row';
import { useNodeChildrenIds } from '../../hooks';
var Rows = function (_a) {
    var nodeId = _a.nodeId;
    var rowIds = useNodeChildrenIds(nodeId);
    return (React.createElement("div", { className: "react-page-cell-rows" }, rowIds.map(function (id) { return (React.createElement(Row, { nodeId: id, key: id })); })));
};
export default React.memo(Rows);
//# sourceMappingURL=index.js.map