import type { Node } from '../types';

// poor check
export const objIsNode = (obj: any): obj is Node => {
  if (!obj) return false;
  if (!('id' in obj)) {
    return false;
  }
  return true;
};
