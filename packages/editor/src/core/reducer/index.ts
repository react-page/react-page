import { combineReducers } from 'redux';
import type { Value, RootState } from '../types';

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

export function initialState(value: Value | null, lang: string): RootState {
  return {
    reactPage: {
      __nodeCache: {},
      hover: null,
      focus: null,
      display: {
        mode: 'edit',
        zoom: 1,
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
