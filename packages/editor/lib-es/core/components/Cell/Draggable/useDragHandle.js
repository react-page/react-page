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
import { useDrag, DragPreviewImage } from 'react-dnd';
import { useCell, useHoverActions } from '../../hooks';
import React from 'react';
export var dragIcon = 
// tslint:disable-next-line:max-line-length
'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAhCAYAAACbffiEAAAA6UlEQVRYhe2ZQQ6CMBBFX0njHg7ESXTp1p3uvIBewc3Em3AfdelSFwRDCAm01JRO+pa0lP8zzc9kMCKyAa7AFqhIixdwB44WuACHuHq8KWm1vwtgF1lMCPaWkevUNE3Qr9R17XTu1P5uvUdV+IpbG2qMGBH5xBYRAjUVUWPEjj10SS3XRFry3kha/VBTETVGcmqtDTVGFqdWn7k9ku96f88QNRVRYySn1tpQY8QptXz7qinmnpt7rZTIqbU21BgJ2mv1+XfCDVFTETVGjIg8SG8KP+RZ0I7lU+dmgRNgaKfyZVw9znT/R85fOHJJE77U6UcAAAAASUVORK5CYII=';
export var useDragHandle = function (nodeId, enabled) {
    if (enabled === void 0) { enabled = true; }
    var actions = useHoverActions();
    var cell = useCell(nodeId);
    var _a = __read(useDrag({
        canDrag: enabled,
        item: function () {
            actions.dragCell(nodeId);
            return { cell: cell };
        },
        type: 'cell',
        collect: function (monitor) { return ({
            isDragging: monitor.isDragging(),
        }); },
        end: function (item, monitor) {
            if (monitor.didDrop()) {
                // If the item drop occurred deeper down the tree, don't do anything
                return;
            }
            // If drag ended but drop did not occur, cancel dragging
            actions.cancelCellDrag();
        },
    }), 3), isDragging = _a[0].isDragging, dragRef = _a[1], preview = _a[2];
    var previewElement = React.createElement(DragPreviewImage, { connect: preview, src: dragIcon });
    return [isDragging, dragRef, previewElement];
};
//# sourceMappingURL=useDragHandle.js.map