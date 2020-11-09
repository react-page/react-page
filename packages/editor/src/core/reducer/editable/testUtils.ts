import { applyMiddleware, combineReducers, createStore } from 'redux';
import thunk from 'redux-thunk';
import { EditableType } from '../../types/editable';

import { editable } from './index';

export const simulateDispatch = (
  initialState: EditableType,
  action?: any
): EditableType => {
  const reducer = combineReducers({ editable });
  const store = createStore(
    reducer,
    { editable: initialState },
    applyMiddleware(thunk)
  );
  if (action) store.dispatch(action);

  return store.getState().editable;
};
