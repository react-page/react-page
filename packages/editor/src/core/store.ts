import {
  createStore,
  applyMiddleware,
  compose,
  Store,
  Middleware,
} from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducer';
import { RootState } from './types/state';
import { isProduction } from './const';

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: (settings: unknown) => void;
  }
}

/**
 * Returns a new redux store.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default (
  initialState: any,
  middleware: Middleware[] = []
): Store<RootState> => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const v: any =
    !isProduction &&
    typeof window === 'object' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
      ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
      : compose;

  return createStore(
    rootReducer,
    initialState,
    v(applyMiddleware(...middleware, thunk))
  );
};
