import { AnyAction } from 'redux';
import { EditorState } from '../../types/editor';
import { cellOrder } from './helper/order';
import { setAllSizesAndOptimize } from './helper/setAllSizesAndOptimize';
import { cells } from './tree';

export const editable = (
  state: EditorState = {
    id: null,
    cells: [],
    config: {
      whitelist: [],
    },
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
