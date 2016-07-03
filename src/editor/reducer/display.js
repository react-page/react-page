import { DEFAULT_DISPLAY_MODE, SET_DISPLAY_MODE } from 'src/editor/actions/display'

export const display = (state = {
  previous: null,
  mode: DEFAULT_DISPLAY_MODE
}, action) => {
  switch (action.type) {
    case SET_DISPLAY_MODE:
      return {
        previous: state.mode,
        mode: action.mode
      }
    default:
      return state
  }
}
