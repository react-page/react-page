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
import classNames from 'classnames';
import React from 'react';
import { DragPreviewImage, useDrag } from 'react-dnd';
import { dragIcon } from '../../../core/components/Cell/Draggable/useDragHandle';
import { useSetLayoutMode } from '../../../core/components/hooks/displayMode';
var Draggable = function (_a) {
    var insert = _a.insert, children = _a.children;
    var setLayoutMode = useSetLayoutMode();
    var _b = __read(useDrag({
        type: 'cell',
        item: function () {
            setLayoutMode();
            return {
                cell: insert,
            };
        },
        collect: function (monitor) { return ({
            isDragging: monitor.isDragging(),
        }); },
    }), 3), isDragging = _b[0].isDragging, dragRef = _b[1], preview = _b[2];
    var classes = classNames({ 'react-page-toolbar-draggable-is-dragged': isDragging }, 'react-page-toolbar-draggable');
    return (React.createElement("div", { className: classes, ref: dragRef },
        React.createElement(DragPreviewImage, { connect: preview, src: dragIcon }),
        children));
};
export default Draggable;
//# sourceMappingURL=index.js.map