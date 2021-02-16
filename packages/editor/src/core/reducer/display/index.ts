import {
  DEFAULT_DISPLAY_MODE,
  SET_DISPLAY_MODE,
  SET_DISPLAY_REFERENCE_NODE_ID,
} from '../../actions/display';
import { Display, DisplayAction } from '../../types/display';

export const display = (
  state: Display = {
    mode: DEFAULT_DISPLAY_MODE,
  },
  action: DisplayAction
) => {
  switch (action.type) {
    case SET_DISPLAY_REFERENCE_NODE_ID:
      return {
        ...state,
        referenceNodeId: action.referenceNodeId,
      };
    case SET_DISPLAY_MODE:
      return {
        mode: action.mode,
        referenceNodeId: action.referenceNodeId || state.referenceNodeId,
      };
    default:
      return state;
  }
};
