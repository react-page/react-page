/**
 * @module src/editor/actions/cell/drag
 */
import { PositionEnum } from '../../const';
export var CELL_DRAG_HOVER = 'CELL_DRAG_HOVER';
export var CELL_DRAG = 'CELL_DRAG';
export var CELL_DRAG_CANCEL = 'CELL_DRAG_CANCEL';
export var CLEAR_CLEAR_HOVER = 'CLEAR_CLEAR_HOVER';
/**
 * Creates a redux action for when a cell hovers another item.
 *
 * @example
 * // const store = redux.createStore()
 * store.dispatch(cellHover(drag, hover, level, position))
 *
 * @param {PartialCell} drag The cell that is currently being dragged.
 * @param {Cell} hover The cell that is being hovered by the dragged cell.
 * @param {number} level Set the level if the dragged cells should hover over an ancestor of hover.
 * @param {string} position Can be left, right, above, below.
 * @return {Action}
 */
export var cellHover = function (drag, hover, level, position) {
    var _a, _b;
    if (level === void 0) { level = 0; }
    var hoverId = level === 0
        ? hover.id
        : (_b = (_a = hover.ancestorIds) === null || _a === void 0 ? void 0 : _a[Math.max(0, level - 1)]) !== null && _b !== void 0 ? _b : hover.id;
    return {
        type: CELL_DRAG_HOVER,
        ts: new Date(),
        dragId: drag.id,
        hoverId: hoverId,
        level: level,
        position: position,
    };
};
/**
 * Creates a redux action for when a cell is hovering another cell on the left.
 *
 * @example
 * // const store = redux.createStore()
 * store.dispatch(cellHoverLeftOf(drag, hover, level))
 *
 * @param {PartialCell} drag The cell that is currently being dragged.
 * @param {Cell} hover The cell that is being hovered by the dragged cell.
 * @param {number} level Set the level if the dragged cells should hover over an ancestor of hover.
 * @return {Action}
 */
export var cellHoverLeftOf = function (drag, hover, level) { return cellHover(drag, hover, level, PositionEnum.LEFT_OF); };
/**
 * Creates a redux action for when a cell is hovering another cell on the right.
 *
 * @example
 * // const store = redux.createStore()
 * store.dispatch(cellHoverRightOf(drag, hover, level))
 *
 * @param {PartialCell} drag The cell that is currently being dragged.
 * @param {Cell} hover The cell that is being hovered by the dragged cell.
 * @param {number} level Set the level if the dragged cells should hover over an ancestor of hover.
 * @return {Action}
 */
export var cellHoverRightOf = function (drag, hover, level) { return cellHover(drag, hover, level, PositionEnum.RIGHT_OF); };
/**
 * Creates a redux action for when a cell is hovering another cell above.
 *
 * @example
 * // const store = redux.createStore()
 * store.dispatch(cellHoverAbove(drag, hover, level))
 *
 * @param {PartialCell} drag The cell that is currently being dragged.
 * @param {Cell} hover The cell that is being hovered by the dragged cell.
 * @param {number} level Set the level if the dragged cells should hover over an ancestor of hover.
 * @return {Action}
 */
export var cellHoverAbove = function (drag, hover, level) { return cellHover(drag, hover, level, PositionEnum.ABOVE); };
/**
 * Creates a redux action for when a cell is hovering another cell below.
 *
 * @example
 * // const store = redux.createStore()
 * store.dispatch(cellHoverBelow(drag, hover, level))
 *
 * @param {PartialCell} drag The cell that is currently being dragged.
 * @param {Cell} hover The cell that is being hovered by the dragged cell.
 * @param {number} level Set the level if the dragged cells should hover over an ancestor of hover.
 * @return {Action}
 */
export var cellHoverBelow = function (drag, hover, level) { return cellHover(drag, hover, level, PositionEnum.BELOW); };
/**
 * Creates a redux action for when a cell is hovering another cell on the left, but inline (css floating).
 *
 * @example
 * // const store = redux.createStore()
 * store.dispatch(cellHoverInlineLeft(drag, hover))
 *
 * @param {PartialCell} drag The cell that is currently being dragged.
 * @param {Cell} hover The cell that is being hovered by the dragged cell.
 * @return {Action}
 */
export var cellHoverInlineLeft = function (drag, hover) {
    return cellHover(drag, hover, 0, PositionEnum.INLINE_LEFT);
};
/**
 * Creates a redux action for when a cell is hovering another cell on the right, but inline (css floating).
 *
 * @example
 * // const store = redux.createStore()
 * store.dispatch(cellHoverInlineRight(drag, hover))
 *
 * @param {PartialCell} drag The cell that is currently being dragged.
 * @param {Cell} hover The cell that is being hovered by the dragged cell.
 * @return {Action}
 */
export var cellHoverInlineRight = function (drag, hover) {
    return cellHover(drag, hover, 0, PositionEnum.INLINE_RIGHT);
};
/**
 * Creates a redux action for when a cell is being dragged.
 *
 * @example
 * // const store = redux.createStore()
 * // const cell = { id: '1', ... }
 * store.dispatch(dragCell(cell.id))
 *
 * @param {string} id The id of the cell that is being dragged.
 * @return {Action}
 */
export var dragCell = function (id) { return ({
    type: CELL_DRAG,
    ts: new Date(),
    id: id,
}); };
/**
 * Creates a redux action to clear hover state of all cells.
 *
 * @return {Action}
 */
export var clearHover = function () { return ({
    type: CLEAR_CLEAR_HOVER,
    ts: new Date(),
}); };
/**
 * Creates a redux action for when cell dragging ends.
 *
 * @example
 * // const store = redux.createStore()
 * // const cell = { id: '1', ... }
 * store.dispatch(cancelCellDrag(cell.id))
 *
 * @param {string} id
 * @return {Action}
 */
export var cancelCellDrag = function () { return ({
    type: CELL_DRAG_CANCEL,
    ts: new Date(),
}); };
export var dragActions = {
    cancelCellDrag: cancelCellDrag,
    clearHover: clearHover,
    dragCell: dragCell,
    cellHoverInlineRight: cellHoverInlineRight,
    cellHoverInlineLeft: cellHoverInlineLeft,
    cellHoverBelow: cellHoverBelow,
    cellHoverAbove: cellHoverAbove,
    cellHoverRightOf: cellHoverRightOf,
    cellHoverLeftOf: cellHoverLeftOf,
    cellHover: cellHover,
};
//# sourceMappingURL=drag.js.map