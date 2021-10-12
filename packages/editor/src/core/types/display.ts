import type { DisplayModes } from '../actions/display';

export type Display = {
  mode: DisplayModes;
  referenceNodeId?: string;
  zoom: number;
};
