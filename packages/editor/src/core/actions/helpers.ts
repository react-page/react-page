import type { NewIds } from '../types/node';
import { createId } from '../utils/createId';

export const generateIds = (): NewIds => {
  return {
    cell: createId(),
    item: createId(),
    others: [createId(), createId(), createId()],
  };
};
