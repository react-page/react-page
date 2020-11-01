import { AnyAction } from 'redux';
import { EditableType } from '../../types/editable';

import { setAllSizesAndOptimize } from './helper/setAllSizesAndOptimize';
import { cells } from './tree';

// TODO: refactor me
export const editable = (state: EditableType, action: AnyAction) => {
  const newCells = state?.cells
    ? setAllSizesAndOptimize(cells(state.cells, action))
    : [];

  return {
    ...state,
    cells: newCells,
  };
};
