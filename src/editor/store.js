import { identity } from 'ramda'
import { createStore } from 'redux'
import { isProduction } from './const'

import rootReducer from './reducer'

export default (initialState) => {
  let devTools = identity
  if (!isProduction && typeof window !== 'undefined' && window.devToolsExtension) {
    devTools = window.devToolsExtension()
  }

  return createStore(
    rootReducer,
    initialState,
    devTools
  )
}
