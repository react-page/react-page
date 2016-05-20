import React from 'react'
import { Provider } from 'react-redux'

import Editable from './Editable'
import createStore from './store'

const store = createStore()

const Editor = () => (
  <Provider store={store}>
    <Editable />
  </Provider>
)

export default Editor
