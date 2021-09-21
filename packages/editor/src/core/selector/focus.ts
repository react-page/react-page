import type { RootState } from '../types/state';

export const focus = (state: RootState) =>
  state && state.reactPage && state.reactPage.focus;

export const singleFocusedNode = (state: RootState) => {
  const nodeIds = focus(state)?.nodeIds;
  if (nodeIds?.length === 1) return nodeIds[0];
  return null;
};
