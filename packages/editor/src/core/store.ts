import type { Store, Middleware } from 'redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducer';
import type { RootState } from './types/state';
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
  initialState: Record<string, unknown>,
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
