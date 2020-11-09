import {
  CELL_FOCUS,
  CELL_BLUR,
  CELL_BLUR_ALL,
  BlurCellAction,
  BlurAllCellsAction,
  FocusCellAction,
  CELL_DRAG_HOVER,
  CellHoverAction,
  ClearHoverAction,
  CLEAR_CLEAR_HOVER,
} from '../../actions/cell';
import { PositionEnum } from '../../const';
import { HoverInsertActions } from '../../types/hover';

export type Hover = {
  nodeId: string;
  position: PositionEnum;
};

export const hover = (
  state: Hover = null,
  action: CellHoverAction | ClearHoverAction
): Hover => {
  switch (action.type) {
    case CELL_DRAG_HOVER: {
      return {
        nodeId: action.hoverId,
        position: action.position,
      };
    }
    case CLEAR_CLEAR_HOVER:
      return null;

    default:
      return state;
  }
};
