import { NewIds } from '../types/editable';
import { createUuid } from '../utils/createUuid';

export const generateIds = (): NewIds => {
  return {
    cell: createUuid(),
    item: createUuid(),
    others: [createUuid(), createUuid(), createUuid()],
  };
};
