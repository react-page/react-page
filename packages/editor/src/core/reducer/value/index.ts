import type { AnyAction } from 'redux';
import type { Value } from '../../types/node';

import { setAllSizesAndOptimize } from './helper/setAllSizesAndOptimize';
import { rows } from './tree';

export const value = (state: Value | null | undefined, action: AnyAction) => {
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
