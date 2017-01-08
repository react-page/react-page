// @flow
import React from 'react'
import Editor from 'src/editor'
import { Provider } from 'react-redux'
import { logException } from 'src/editor/raven'
import DragDropContext from 'src/editor/components/DragDropContext'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

import Trash from './Trash'
import Toolbar from './Toolbar'
import DisplayModeToggle from './DisplayModeToggle'

const Controls = ({ editor }: { editor: Editor }) => {
  try {
    return (
      <Provider store={editor.store}>
        <DragDropContext>
          <MuiThemeProvider muiTheme={getMuiTheme()}>
            <div>
              <DisplayModeToggle plugins={editor.plugins}/>
              <Toolbar plugins={editor.plugins} />
              <Trash plugins={editor.plugins}/>
            </div>
          </MuiThemeProvider>
        </DragDropContext>
      </Provider>
    )
  } catch (e) {
    logException(e)
    return null
  }
}

export default Controls
