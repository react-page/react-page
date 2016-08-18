// @flow
import { identity } from 'ramda'
import { createStore } from 'redux'
import { Store } from 'types/redux'

import rootReducer from './reducer'

/**
 * Returns a new redux store.
 */
export default (initialState: Object): Store => {
  let devTools = identity
  if (typeof window !== 'undefined' && window.devToolsExtension) {
    devTools = window.devToolsExtension()
  }

  return createStore(
    rootReducer,
    initialState,
    devTools
  )
}
