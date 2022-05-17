import type { CellHoverAction, ClearHoverAction } from '../../actions/cell';
import { CELL_DRAG_HOVER, CLEAR_CLEAR_HOVER } from '../../actions/cell';
import type { PositionEnum } from '../../const';

export type Hover = {
  nodeId?: string;
  position: PositionEnum;
} | null;

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
