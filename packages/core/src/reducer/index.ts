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
  hover,
  settings,
});

/**
 * @example
 * import { reducer } from '@react-page/core'
 * const reducer = combineReducers({
 *   reactPage: reducer,
 *   // ...
 * })
 * const store = createStore(reducer, null, middleware)
 * new Editor({ store })
 */
export { reducer };

export default combineReducers({ reactPage: reducer });
