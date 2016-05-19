import { identity } from 'ramda'
import { createStore } from 'redux'

import rootReducer from './editable/reducer'

export default (initialState) => (
  createStore(
    rootReducer,
    initialState,
    window.devToolsExtension ? window.devToolsExtension() : identity
  )
)
