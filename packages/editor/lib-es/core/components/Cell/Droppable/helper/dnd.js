import throttle from 'lodash.throttle';
import { delay } from '../../../../helper/throttle';
import { computeAndDispatchHover, computeAndDispatchInsert, } from '../../../../service/hover/input';
import logger from '../../../../service/logger';
var last = { hoverId: '', dragId: '' };
var shouldClear = function (hoverId, dragId) {
    if (hoverId === last.hoverId && dragId === last.dragId) {
        return false;
    }
    last = { hoverId: hoverId, dragId: dragId };
    return true;
};
export var onHover = throttle(function (target, monitor, element, actions, cellPlugins) {
    var _a;
    var drag = monitor.getItem();
    if (!(drag === null || drag === void 0 ? void 0 : drag.cell) || !target) {
        // item undefined, happens when throttle triggers after drop
        return;
    }
    if (drag.cell.id === target.id) {
        // If hovering over itself, do nothing
        if (shouldClear(target.id, drag.cell.id)) {
            actions.clear();
        }
        return;
    }
    else if (!monitor.isOver({ shallow: true })) {
        // If hovering over ancestor cell, do nothing (we are going to propagate later in the tree anyways)
        return;
    }
    else if (drag.cell.id && ((_a = target.ancestorIds) === null || _a === void 0 ? void 0 : _a.includes(drag.cell.id))) {
        if (shouldClear(target.id, drag.cell.id)) {
            actions.clear();
        }
        return;
    }
    else if (!target.id) {
        // If hovering over something that isn't a cell or hasn't an id, do nothing. Should be an edge case
        logger.warn('Canceled cell drop, no id given.', target, drag);
        return;
    }
    last = { hoverId: target.id, dragId: drag.cell.id };
    computeAndDispatchHover(target, drag.cell, monitor, element, actions, cellPlugins);
}, delay, { leading: false });
export var onDrop = function (target, monitor, element, actions, cellPlugins) {
    var _a;
    var drag = monitor.getItem();
    if (!drag.cell)
        return;
    if (monitor.didDrop() || !monitor.isOver({ shallow: true }) || !target) {
        // If the item drop occurred deeper down the tree, don't do anything
        return;
    }
    else if (drag.cell.id === target.id) {
        // If the item being dropped on itself do nothing
        actions.cancelCellDrag();
        return;
    }
    else if (target &&
        drag.cell.id &&
        ((_a = target.ancestorIds) === null || _a === void 0 ? void 0 : _a.includes(drag.cell.id))) {
        // If hovering over a child of itself, don't propagate further
        actions.cancelCellDrag();
        return;
    }
    last = { hoverId: target.id, dragId: drag.cell.id };
    computeAndDispatchInsert(target, drag.cell, monitor, element, actions, cellPlugins);
};
//# sourceMappingURL=dnd.js.map