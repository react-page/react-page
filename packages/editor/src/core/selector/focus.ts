import { RootState } from '../types/state';

export const focus = (state: RootState) =>
  state && state.reactPage && state.reactPage.focus;
