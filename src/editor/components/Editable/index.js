// @flow
import React, { Component } from 'react'
import { Provider } from 'react-redux'
import DragDropContext from 'src/editor/components/DragDropContext'
import HotKeyDecorator from 'src/editor/components/HotKey/Decorator'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import { updateEditable } from 'src/editor/actions/editables'
import Editor from 'src/editor'
import Inner from './inner'
import { logException } from 'src/editor/raven'
import { editable } from 'src/editor/selector/editable'

import type { Editable as EditableType } from 'types/editable'

class Editable extends Component {
  componentDidMount() {
    if (!this.props.state.id) {
      throw new Error('The state must have an unique id')
    }

    const state = {
      ...this.props.editor.plugins.unserialize(this.props.state),
      config: {
        whitelist: this.props.editor.plugins.getRegisteredNames()
      }
    }

    this.props.editor.store.dispatch(updateEditable(state))
    this.props.editor.store.subscribe(this.onChange)

    this.previousState = null
  }


  props: {
    state: EditableType,
    editor: Editor,
    onChange?: Function
  }

  onChange = () => {
    if (!this.props.onChange) {
      return
    }

    const state = editable(this.props.editor.store.getState(), { id: this.props.state.id })
    if (state === this.previousState) {
      return
    }

    const serialized = this.props.editor.plugins.serialize(state)
    this.props.onChange(serialized)
  }

  render() {
    const {
      state: { id },
      editor: {
        store
      },
    } = this.props

    try {
      return (
        <Provider store={store}>
          <DragDropContext>
            <HotKeyDecorator id={id}>
              <MuiThemeProvider muiTheme={getMuiTheme()}>
                <Inner id={id} />
              </MuiThemeProvider>
            </HotKeyDecorator>
          </DragDropContext>
        </Provider>
      )
    } catch (e) {
      logException(e)
      return null
    }
  }
}

export default Editable
