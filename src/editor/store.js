import { identity } from 'ramda'
import { createStore } from 'redux'

import rootReducer from './reducer'

export default (initialState) => {
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
