// @flow
import React, { Component } from 'react'
import { Provider } from 'react-redux'
import Editable from 'src/editor/components/Editable'
import DragDropContext from 'src/editor/components/DragDropContext'
import HotKeyDecorator from 'src/editor/components/HotKey/Decorator'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

import type { Store } from 'types/redux'

const Editor = ({ id, store }: {id: string, store: Store }) => (
    <Provider store={store}>
      <DragDropContext>
        <HotKeyDecorator id={id}>
          <div>
            <MuiThemeProvider muiTheme={getMuiTheme()}>
              <Editable id={id} />
            </MuiThemeProvider>
          </div>
        </HotKeyDecorator>
      </DragDropContext>
    </Provider>
)

export default Editor
