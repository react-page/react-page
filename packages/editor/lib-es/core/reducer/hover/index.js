import { CELL_DRAG_HOVER, CLEAR_CLEAR_HOVER } from '../../actions/cell';
export var hover = function (state, action) {
    if (state === void 0) { state = null; }
    switch (action.type) {
        case CELL_DRAG_HOVER: {
            return {
                nodeId: action.hoverId,
                position: action.position,
            };
        }
        case CLEAR_CLEAR_HOVER:
            return null;
        default:
            return state;
    }
};
//# sourceMappingURL=index.js.map