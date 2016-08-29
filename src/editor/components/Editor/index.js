// @flow
import React, { PropTypes } from 'react'
import { Provider } from 'react-redux'
import Editable from 'src/editor/components/Editable'
import DragDropContext from 'src/editor/components/DragDropContext'
import HotKeyDecorator from 'src/editor/components/HotKey/Decorator'
import type { Store } from 'types/redux'

const Editor = ({ id, store }: {id: string, store: Store }) => (
  <Provider store={store}>
    <DragDropContext>
      <HotKeyDecorator id={id}>
        <Editable id={id} />
      </HotKeyDecorator>
    </DragDropContext>
  </Provider>
)

Editor.propTypes = {
  id: PropTypes.string.isRequired,
  store: PropTypes.object.isRequired
}

export default Editor
