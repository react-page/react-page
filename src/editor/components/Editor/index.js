import React from 'react'
import { Provider } from 'react-redux'

import createStore from 'src/editor/store'

const store = createStore()

const Editor = () => (
  <Provider store={store}>
    <p>I'm the Ory Editor</p>
  </Provider>
)

export default Editor
