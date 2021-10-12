import type { EffectCallback, DependencyList } from 'react';
import { useEffect } from 'react';
import { useSelector } from '../../reduxConnect';

import {
  allFocusedNodeIds,
  focus,
  singleFocusedNode,
} from '../../selector/focus';

/**
 * @returns the current focused nodeId if just one or null
 */
export const useFocusedNodeId = () => {
  return useSelector(singleFocusedNode);
};

export const useAllFocusedNodeIds = () => {
  return useSelector(allFocusedNodeIds);
};

/**
 *
 * @param id the id of the node (row/cell)
 * @returns true if the given node id is focused
 */
export const useIsFocused = (id: string) => {
  return useSelector((state) => allFocusedNodeIds(state).includes(id));
};

/**
 *
 * @param id the id of the node (row/cell)
 * @returns true if ONLY the given node id is focused
 */
export const useIsExclusivlyFocused = (id: string) => {
  return useSelector((state) => singleFocusedNode(state) === id);
};

/**
 *
 * @param id the id of the node
 * @param effect callback that is run when the given node is focused and the focus action demanded scrollToCell
 * @param deps effect deps array
 */
export const useScrollToViewEffect = (
  id: string,
  effect: EffectCallback,
  deps: DependencyList
) => {
  const scrollToCell = useSelector((state) => {
    const f = focus(state);
    const nodeId = singleFocusedNode(state);

    if (!f || nodeId !== id) {
      return null;
    }
    return f.scrollToCell;
  });
  useEffect(() => {
    if (scrollToCell) {
      return effect();
    }
  }, [scrollToCell, ...deps]);
};
