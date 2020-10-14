import {
  CELL_FOCUS,
  CELL_BLUR,
  CELL_BLUR_ALL,
  CELL_DRAG_HOVER_NEW,
  BlurCellAction,
  BlurAllCellsAction,
  FocusCellAction,
  ClearHoverAction,
  CellHoverAction,
  CELL_DRAG_HOVER,
  CellHoverActionNew,
  ClearHoverActionNew,
  CLEAR_HOVER_NEW,
} from '../../actions/cell';
import { PositionEnum } from '../../const';
import { HoverInsertActions } from '../../types/hover';

export type Hover = {
  current?: {
    nodeId: string;
    position?: PositionEnum;
  };
};

export const hover = (
  state: Hover = null,
  action: ClearHoverActionNew | CellHoverActionNew
): Hover => {
  switch (action.type) {
    case CELL_DRAG_HOVER_NEW: {
      return {
        ...(state ?? {}),
        current: {
          nodeId: action.nodeId,
          position: action.position,
        },
      };
    }
    case CLEAR_HOVER_NEW: {
      if (action.nodeId === state?.current?.nodeId) {
        return {
          ...state,
          current: null,
        };
      }
      return state;
    }

    default:
      return state;
  }
};
