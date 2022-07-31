import type { Node } from '../types';

// poor check
export const objIsNode = (obj: Record<string, unknown>): obj is Node => {
  if (!obj) return false;
  if (!('id' in obj)) {
    return false;
  }
  return true;
};
