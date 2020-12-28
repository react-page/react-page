import { useCallback } from 'react';
import { redo, undo } from '../../actions/undo';
import { useDispatch } from '../../reduxConnect';

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
