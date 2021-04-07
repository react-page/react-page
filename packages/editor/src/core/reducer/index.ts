import { combineReducers } from 'redux';
import { Value, RootState } from '../types';

import { values } from './values';
import { display } from './display';
import { focus } from './focus';

import { hover } from './hover';
import { settings } from './settings';

const reducer = combineReducers({
  values,
  display,
  focus,
  settings,
  hover,
  __nodeCache: () => null, // always empty __nodeCache
});

export { reducer };

export default combineReducers({ reactPage: reducer });

export function initialState(value: Value, lang: string): RootState {
  return {
    reactPage: {
      __nodeCache: {},
      hover: null,
      focus: null,
      display: {
        mode: 'edit',
      },
      settings: {
        lang,
      },
      values: {
        past: [],
        present: value,
        future: [],
      },
    },
  };
}
