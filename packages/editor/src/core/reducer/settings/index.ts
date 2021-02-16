import { SET_LANG } from '../../actions/setting';

export const settings = (
  state = {
    lang: null,
  },
  action: {
    type: string;

    [key: string]: unknown;
  }
) => {
  switch (action.type) {
    case SET_LANG:
      return {
        ...state,
        lang: action.lang,
      };
    default:
      return state;
  }
};
