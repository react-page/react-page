import { RootState } from '.';

export const hover = (state: RootState) =>
  state && state.reactPage && state.reactPage.hover;
