import { useCallback } from 'react';
import { redo, undo } from '../../actions/undo';
import { useDispatch, useSelector } from '../../reduxConnect';

/**
 * @returns function, that undos last change if called
 */
export const useUndo = () => {
  const dispatch = useDispatch();
  return useCallback(() => dispatch(undo()), [dispatch]);
};

/**
 * @returns function, that redos last change if called
 */
export const useRedo = () => {
  const dispatch = useDispatch();
  return useCallback(() => dispatch(redo()), [dispatch]);
};

/**
 * @returns whether user can undo
 */
export const useCanUndo = () => {
  return useSelector((s) => s.reactPage.values.past.length > 0);
};
/**
 * @returns whether user can undo
 */
export const useCanRedo = () => {
  return useSelector((s) => s.reactPage.values.future.length > 0);
};
