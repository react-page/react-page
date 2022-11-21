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
import { useDrop } from 'react-dnd';
import { useCellIsAllowedHere, useInsertNew, useIsLayoutMode, useIsPreviewMode, useSetDisplayReferenceNodeId, useSetInsertMode, } from '../hooks';
var InsertNew = function (_a) {
    var parentCellId = _a.parentCellId;
    var setInsertMode = useSetInsertMode();
    var insertNew = useInsertNew(parentCellId);
    var isPreviewMode = useIsPreviewMode();
    var isLayoutMode = useIsLayoutMode();
    var setReferenceNodeId = useSetDisplayReferenceNodeId();
    var checkIfAllowed = useCellIsAllowedHere(parentCellId);
    var _b = __read(useDrop({
        accept: 'cell',
        canDrop: function (item) {
            return checkIfAllowed(item);
        },
        collect: function (monitor) { return ({
            isOver: monitor.isOver(),
            isAllowed: checkIfAllowed(monitor.getItem()),
        }); },
        drop: function (item, monitor) {
            // fallback drop
            if (!monitor.didDrop() && item.cell) {
                insertNew(item.cell);
            }
        },
    }), 2), _c = _b[0], isOver = _c.isOver, isAllowed = _c.isAllowed, dropRef = _b[1];
    if (isPreviewMode)
        return null;
    return (React.createElement("div", { ref: dropRef, className: 'react-page-cell-insert-new' + (isOver && isAllowed ? ' hover' : ''), style: {
            pointerEvents: 'all',
            zIndex: isLayoutMode ? 10 : 1,
            overflow: 'hidden',
            width: '50%',
            minWidth: 120,
            margin: 'auto',
            cursor: isOver && !isAllowed ? 'not-allowed' : 'pointer',
        }, onClick: function (e) {
            e.stopPropagation();
            setReferenceNodeId(parentCellId);
            setInsertMode();
        } }));
};
export default React.memo(InsertNew);
//# sourceMappingURL=InsertNew.js.map