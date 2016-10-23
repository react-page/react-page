// @flow
import { identity } from 'ramda'
import { createStore, applyMiddleware, compose } from 'redux'
import { Store } from 'types/redux'

import rootReducer from './reducer'

/**
 * Returns a new redux store.
 */
export default (initialState: Object, middleware: [] = []): Store => {
  const v = process.env.NODE_ENV !== 'production' && typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose

  // if (typeof window !== 'undefined' && window.devToolsExtension) {
  //   devTools = window.devToolsExtension()
  // }

  return createStore(
    rootReducer,
    initialState,
    v(applyMiddleware(...middleware))
  )
}
