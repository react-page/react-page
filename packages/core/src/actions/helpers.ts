import { v4 } from 'uuid';
import { NewIds } from '../types/editable';

export const generateIds = (): NewIds => {
  return {
    cell: v4(),
    item: v4(),
    others: [v4(), v4(), v4()],
  };
};
