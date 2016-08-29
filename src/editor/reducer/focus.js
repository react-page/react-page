// @flow
import { CELL_FOCUS, CELL_BLUR } from 'src/editor/actions/cell'

export const focus = (state : string[] = [], action: {
  type: string
}) => {
  switch (action.type) {
    case CELL_FOCUS:
      return [...state, action.id]
    case CELL_BLUR:
      return state.filter((id: string) => id !== action.id)
    default:
      return state
  }
}
