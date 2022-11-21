var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
import React from 'react';
import { useCellDrop } from '../../Cell/Droppable';
import { useIsInsertMode, useIsLayoutMode } from '../../hooks';
var Droppable = function (_a) {
    var children = _a.children, nodeId = _a.nodeId;
    var isLayoutMode = useIsLayoutMode();
    var isInsertMode = useIsInsertMode();
    var _b = __read(useCellDrop(nodeId), 2), ref = _b[0], isAllowed = _b[1];
    if (!(isLayoutMode || isInsertMode)) {
        return React.createElement("div", { className: "react-page-row-droppable-container" }, children);
    }
    return (React.createElement("div", { ref: ref, className: "react-page-row-droppable" }, children));
};
export default Droppable;
//# sourceMappingURL=index.js.map