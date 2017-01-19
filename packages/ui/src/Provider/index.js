// @flow
import React from 'react'
import { Provider as ReduxProvider } from 'react-redux'
import Editor from 'ory-editor-core/lib'
import DragDropContext from 'ory-editor-core/lib/components/DragDropContext'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

const Provider = ({ editor, children }: { editor: Editor, children: [] }) => (
  <ReduxProvider store={editor.store}>
    <DragDropContext>
      <MuiThemeProvider muiTheme={getMuiTheme()}>
        {children}
      </MuiThemeProvider>
    </DragDropContext>
  </ReduxProvider>
)

export default Provider
