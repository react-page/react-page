// @flow
import { CELL_FOCUS, CELL_BLUR, CELL_BLUR_ALL } from 'src/editor/actions/cell'

export const focus = (state: string = '', action: {
  type: string,
  id: string
}) => {
  switch (action.type) {
    case CELL_FOCUS:
      return action.id
    case CELL_BLUR_ALL:
    case CELL_BLUR:
      return ''
    default:
      return state
  }
}
