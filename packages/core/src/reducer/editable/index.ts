import { AnyAction } from 'redux';
import { EditableType } from '../../types/editable';

import { setAllSizesAndOptimize } from './helper/setAllSizesAndOptimize';
import { rows } from './tree';

// TODO: refactor me
export const editable = (state: EditableType, action: AnyAction) => {
  const newRows = state?.rows
    ? setAllSizesAndOptimize(rows(state.rows, action, 0))
    : [];

  return {
    ...state,
    rows: newRows,
  };
};
