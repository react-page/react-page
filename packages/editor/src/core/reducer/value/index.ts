import { AnyAction } from 'redux';
import { Value } from '../../types/node';

import { setAllSizesAndOptimize } from './helper/setAllSizesAndOptimize';
import { rows } from './tree';

export const value = (state: Value, action: AnyAction) => {
  switch (action.type) {
    case 'UPDATE_VALUE': {
      return action.value;
    }
  }
  const newRows = state?.rows
    ? setAllSizesAndOptimize(rows(state.rows, action, 0))
    : [];

  return {
    ...state,
    rows: newRows,
  };
};
