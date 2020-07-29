import { AnyAction } from 'redux';
import { CELL_CREATE_FALLBACK } from '../../actions/cell';
import sanitizeInitialChildren from '../../helper/sanitizeInitialChildren';
import { Cell, createCell } from '../../types/editable';
import { EditorState } from '../../types/editor';
import { cellOrder } from './helper/order';
import { setAllSizesAndOptimize } from './helper/setAllSizesAndOptimize';
import { cells } from './tree';

export const rawEditableReducer = (
  state: EditorState = {
    id: null,
    cells: [],
    config: {
      whitelist: [],
    },
  },
  action: AnyAction
) => {
  let newCells = setAllSizesAndOptimize(cells(state.cells, action));

  // eslint-disable-next-line default-case
  switch (action.type) {
    case CELL_CREATE_FALLBACK:
      if (action.editable === state.id) {
        if (action.fallback.createInitialChildren) {
          const children = sanitizeInitialChildren(
            action.fallback.createInitialChildren()
          );

          const c: Cell = {
            ...createCell(),
            ...children,
            layout: {
              plugin: action.fallback,
              state: action.fallback.createInitialState(),
            },
            id: action.ids.cell,
          };
          newCells = setAllSizesAndOptimize(cells([c], action));
        } else {
          const c: Cell = {
            ...createCell(),
            content: {
              plugin: action.fallback,
              state: action.fallback.createInitialState(),
            },
            id: action.ids.cell,
          };
          newCells = setAllSizesAndOptimize(cells([c], action));
        }
      }
      break;
    default:
      break;
  }

  return {
    ...state,
    cells: newCells,
    cellOrder: cellOrder(newCells || []),
  };
};

export const editable = rawEditableReducer;
