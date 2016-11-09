// @flow
import React from 'react'
import Editor from 'src/editor'
import { Provider } from 'react-redux'
import { logException } from 'src/editor/raven'
import Inner from './inner'

const Controls = ({ editor }: { editor: Editor }) => {
  try {
    return (
      <Provider store={editor.store}>
        <Inner plugins={editor.plugins} />
      </Provider>
    )
  } catch (e) {
    logException(e)
    return null
  }
}

export default Controls
