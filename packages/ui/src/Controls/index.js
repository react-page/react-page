// @flow
import React from 'react'
import Editor from 'ory-editor/lib'
import { Provider } from 'react-redux'
import DragDropContext from 'ory-editor/lib/components/DragDropContext'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

import Trash from './Trash'
import Toolbar from './Toolbar'
import DisplayModeToggle from './DisplayModeToggle'

const Controls = ({ editor }: { editor: Editor }) => {
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
}

export default Controls
