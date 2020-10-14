import { AnyAction } from 'redux';

import { cellOrder } from './helper/order';
import { setAllSizesAndOptimize } from './helper/setAllSizesAndOptimize';
import { cells } from './tree';

// TODO: refactor me
export const editable = (
  state = {
    id: null,
    cells: [],
  },
  action: AnyAction
) => {
  const newCells = setAllSizesAndOptimize(cells(state.cells, action));

  return {
    ...state,
    cells: newCells,
    cellOrder: cellOrder(newCells || []),
  };
};
