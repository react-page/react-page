// @flow
import { CELL_FOCUS, CELL_BLUR, CELL_BLUR_ALL } from '../../actions/cell'

export const focus = (
  state: string = '',
  action: {
    type: string,
    id: string
  }
) => {
  switch (action.type) {
    case CELL_FOCUS:
      return action.id
    case CELL_BLUR_ALL:
      return ''
    case CELL_BLUR:
      return action.id === state ? '' : state
    default:
      return state
  }
}
