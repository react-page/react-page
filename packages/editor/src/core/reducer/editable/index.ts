import { AnyAction } from 'redux';
import { Value } from '../../types/editable';

import { setAllSizesAndOptimize } from './helper/setAllSizesAndOptimize';
import { rows } from './tree';

// TODO: refactor me
export const editable = (state: Value, action: AnyAction) => {
  const newRows = state?.rows
    ? setAllSizesAndOptimize(rows(state.rows, action, 0))
    : [];

  return {
    ...state,
    rows: newRows,
  };
};
