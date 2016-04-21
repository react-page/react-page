import React from 'react'

import Editor from 'src/common/components/Editor'
import createLocalStorage from 'src/common/storage/LocalStorage'

const App = () => (
  <Editor storage={createLocalStorage('content')} />
)

export default App
