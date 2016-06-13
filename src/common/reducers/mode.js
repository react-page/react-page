import { CELL_DRAG, CELL_CANCEL_DRAG, CELL_DROP } from "src/common/actions/cell";

export const mode = (state = {
  type: 'display'
}, action) => {
  switch (action.type) {
    case CELL_DRAG:
      return { type: 'layout' }
    case CELL_CANCEL_DRAG:
    case CELL_DROP:
      return { type: 'display' }
    default:
      return state
  }
}
