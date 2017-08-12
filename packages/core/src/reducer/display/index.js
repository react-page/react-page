// @flow
import {
  DEFAULT_DISPLAY_MODE,
  SET_DISPLAY_MODE,
  SET_PREVIOUS_DISPLAY_MODE
} from '../../actions/display'
import type { Display, DisplayAction } from '../../types/display'

export const display = (
  state: Display = {
    previous: DEFAULT_DISPLAY_MODE,
    mode: DEFAULT_DISPLAY_MODE
  },
  action: DisplayAction
) => {
  switch (action.type) {
    case SET_PREVIOUS_DISPLAY_MODE:
      return {
        ...state,
        mode: state.previous === state.mode ? action.fallback : state.previous
      }
    case SET_DISPLAY_MODE:
      return {
        previous:
          action.mode === state.mode && action.remember
            ? state.previous
            : action.mode,
        mode: action.mode
      }
    default:
      return state
  }
}
