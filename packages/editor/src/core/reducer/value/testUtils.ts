import type { Action } from 'redux';
import { applyMiddleware, combineReducers, createStore } from 'redux';
import thunk from 'redux-thunk';
import type { Value } from '../../types/node';

import { value } from './index';

export const simulateDispatch = (
  initialState: Value,
  action?: Action
): Value => {
  const reducer = combineReducers({ value });
  const store = createStore(
    reducer,
    { value: initialState },
    applyMiddleware(thunk)
  );
  if (action) store.dispatch(action);

  return store.getState().value;
};
