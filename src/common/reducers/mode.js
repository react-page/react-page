import {SET_MODE} from "src/common/actions/mode"

export const mode = (state = {
  type: 'display'
}, action) => {
  switch (action.type) {
    case SET_MODE:
      return { type: action.mode }
    default:
      return state
  }
}
