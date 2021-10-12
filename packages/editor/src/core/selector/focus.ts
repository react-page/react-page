import type { RootState } from '../types/state';
import { findNodeInState } from './editable';

export const focus = (state: RootState) =>
  state && state.reactPage && state.reactPage.focus;

export const allFocusedNodeIds = (state: RootState) => {
  return (
    focus(state)?.nodeIds?.filter((n) => findNodeInState(state, n)?.node) ?? []
  );
};
export const singleFocusedNode = (state: RootState) => {
  const nodeIds = allFocusedNodeIds(state);

  if (nodeIds?.length === 1) return nodeIds[0];
  return null;
};
