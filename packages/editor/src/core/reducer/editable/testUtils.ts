import { Action, applyMiddleware, combineReducers, createStore } from 'redux';
import thunk from 'redux-thunk';
import { Value } from '../../types/editable';

import { editable } from './index';

export const simulateDispatch = (
  initialState: Value,
  action?: Action
): Value => {
  const reducer = combineReducers({ editable });
  const store = createStore(
    reducer,
    { editable: initialState },
    applyMiddleware(thunk)
  );
  if (action) store.dispatch(action);

  return store.getState().editable;
};
