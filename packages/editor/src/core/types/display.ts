import { DisplayModes } from '../actions/display';

export type Display = {
  mode: DisplayModes;
  referenceNodeId?: string;
};

export type DisplayAction = {
  type: string;
  mode: string;
  fallback: string;
  remember: boolean;
  referenceNodeId?: string;
};
