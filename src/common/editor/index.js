import React from 'react'
import { Provider } from 'react-redux'

import Editable from './editable'
import createStore from './store'

const store = createStore()

const Editor = () => (
  <Provider store={store}>
    <Editable />
  </Provider>
)

export default Editor
