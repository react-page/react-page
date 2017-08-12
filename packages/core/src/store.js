// @flow
import { createStore, applyMiddleware, compose } from 'redux'

import type { Store } from './types/redux'
import rootReducer from './reducer'

/**
 * Returns a new redux store.
 */
export default (initialState: Object, middleware: [] = []): Store => {
  /* eslint no-underscore-dangle: 'off' */
  const v =
    process.env.NODE_ENV !== 'production' &&
    typeof window === 'object' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
      ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
      : compose

  return createStore(
    rootReducer,
    initialState,
    v(applyMiddleware(...middleware))
  )
}
