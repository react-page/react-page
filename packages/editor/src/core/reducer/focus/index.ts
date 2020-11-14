import {
  CELL_FOCUS,
  CELL_BLUR,
  CELL_BLUR_ALL,
  BlurCellAction,
  BlurAllCellsAction,
  FocusCellAction,
} from '../../actions/cell';

export type Focus = {
  nodeId: string;
  scrollToCell?: number; // a timestamp,
  source?: string;
};

export const focus = (
  state: Focus = null,
  action: FocusCellAction | BlurCellAction | BlurAllCellsAction
): Focus => {
  switch (action.type) {
    case CELL_FOCUS: {
      return {
        nodeId: action.id,
        source: action.source,
        scrollToCell: action.scrollToCell ? new Date().getTime() : null,
      };
    }

    case CELL_BLUR_ALL:
      return null;
    case CELL_BLUR:
      return action.id === state?.nodeId ? null : state;
    default:
      return state;
  }
};
