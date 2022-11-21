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
import { useCallback } from 'react';
import { useDrop } from 'react-dnd';
import { useCellIsAllowedHere, useInsertNew, useSetDisplayReferenceNodeId, } from '../hooks';
var FallbackDropArea = function (_a) {
    var children = _a.children;
    var insertNew = useInsertNew();
    var isAllowed = useCellIsAllowedHere();
    var _b = __read(useDrop({
        accept: 'cell',
        canDrop: function (item) { return isAllowed(item); },
        drop: function (item, monitor) {
            // fallback drop
            if (!monitor.didDrop() && item.cell) {
                insertNew(item.cell);
            }
        },
    }), 2), dropRef = _b[1];
    var setReference = useSetDisplayReferenceNodeId();
    var clearReference = useCallback(function (e) {
        var _a;
        // if click was on the root, clear reference
        if ((_a = e.target.classList) === null || _a === void 0 ? void 0 : _a.contains('react-page-editable'))
            setReference(null);
    }, [setReference]);
    return (React.createElement("div", { ref: dropRef, onClick: clearReference }, children));
};
export default FallbackDropArea;
//# sourceMappingURL=FallbackDropArea.js.map