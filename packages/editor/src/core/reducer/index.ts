import { combineReducers } from 'redux';

import { editables } from './editables';
import { display } from './display';
import { focus } from './focus';

import { hover } from './hover';
import { settings } from './settings';

const reducer = combineReducers({
  editables,
  display,
  focus,
  settings,
  hover,
});

export { reducer };

export default combineReducers({ reactPage: reducer });
