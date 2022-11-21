import { ActionTypes } from 'redux-undo';
export var undo = function () { return ({
    type: ActionTypes.UNDO,
}); };
export var redo = function () { return ({
    type: ActionTypes.REDO,
}); };
//# sourceMappingURL=undo.js.map