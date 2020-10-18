export type Display = {
  mode: string;
  referenceNodeId?: string;
};

export type DisplayAction = {
  type: string;
  mode: string;
  fallback: string;
  remember: boolean;
  referenceNodeId?: string;
};
