import { combineReducers } from 'redux';

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
