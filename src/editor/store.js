import { identity } from 'ramda'
import { createStore } from 'redux'

import rootReducer from './Editable/reducer'

export default (initialState) => (
  createStore(
    rootReducer,
    initialState,
    window.devToolsExtension ? window.devToolsExtension() : identity
  )
)
