import { useCallback } from 'react';
import { redo, undo } from '../../actions/undo';
import { useDispatch, useSelector } from '../../reduxConnect';
/**
 * @returns function, that undos last change if called
 */
export var useUndo = function () {
    var dispatch = useDispatch();
    return useCallback(function () { return dispatch(undo()); }, [dispatch]);
};
/**
 * @returns function, that redos last change if called
 */
export var useRedo = function () {
    var dispatch = useDispatch();
    return useCallback(function () { return dispatch(redo()); }, [dispatch]);
};
/**
 * @returns whether user can undo
 */
export var useCanUndo = function () {
    return useSelector(function (s) { return s.reactPage.values.past.length > 0; });
};
/**
 * @returns whether user can undo
 */
export var useCanRedo = function () {
    return useSelector(function (s) { return s.reactPage.values.future.length > 0; });
};
//# sourceMappingURL=actions.js.map