import { CELL_DRAG, CELL_CANCEL_DRAG, CELL_DROP } from "src/common/actions/cell";
import {SET_MODE} from "src/common/actions/mode"

export const mode = (state = {
  type: 'display'
}, action) => {
  switch (action.type) {
    case SET_MODE:
      return { type: action.mode }
    case CELL_DRAG:
      return { type: 'layout' }
    case CELL_CANCEL_DRAG:
    case CELL_DROP:
      return { type: 'display' }
    default:
      return state
  }
}
