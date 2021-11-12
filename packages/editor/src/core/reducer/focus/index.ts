import type {
  BlurCellAction,
  BlurAllCellsAction,
  FocusCellAction,
  RemoveCellAction,
} from '../../actions/cell';
import { CELL_FOCUS, CELL_BLUR, CELL_BLUR_ALL } from '../../actions/cell';

export type Focus = {
  nodeIds: string[];
  scrollToCell?: number | null; // a timestamp,
} | null;

const stateWithout = (state: Focus, idsToRemove: string[]) => {
  const nodeIds = state?.nodeIds?.filter((n) => !idsToRemove.includes(n)) ?? [];
  if (nodeIds.length === 0) {
    return null;
  }
  return {
    ...state,
    nodeIds,
  };
};
export const focus = (
  state: Focus = null,
  action:
    | FocusCellAction
    | BlurCellAction
    | BlurAllCellsAction
    | RemoveCellAction
): Focus => {
  switch (action.type) {
    case 'CELL_REMOVE': {
      return stateWithout(state, action.ids);
    }
    case CELL_FOCUS: {
      const nodeIds =
        action.mode === 'add'
          ? state?.nodeIds?.includes(action.id)
            ? stateWithout(state, [action.id])?.nodeIds ?? []
            : [...(state?.nodeIds ?? []), action.id]
          : [action.id];

      return {
        nodeIds: nodeIds,
        scrollToCell: action.scrollToCell ? new Date().getTime() : null,
      };
    }

    case CELL_BLUR_ALL:
      return null;
    case CELL_BLUR: {
      return stateWithout(state, [action.id]);
    }

    default:
      return state;
  }
};
