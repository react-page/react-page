// @flow
import React, { Component } from 'react'
import { Provider } from 'react-redux'
import DragDropContext from 'src/editor/components/DragDropContext'
import HotKeyDecorator from 'src/editor/components/HotKey/Decorator'
import { updateEditable } from 'src/editor/actions/editables'
import { editable } from 'src/editor/selector/editable'
import PluginService from 'src/editor/service/plugin'

import Inner from './Inner'

import type { Store } from 'types/redux'
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

  previousState: any = {}

  props: {
    state: EditableType,
    editor: {
      plugins: PluginService,
      store: Store
    },
    onChange?: Function
  }

  onChange = () => {
    if (typeof this.props.onChange !== 'function') {
      return
    }
    const onChange = this.props.onChange || (() => ({}))

    const state: any = editable(this.props.editor.store.getState(), { id: this.props.state.id })
    if (state === this.previousState) {
      return
    }

    const serialized = this.props.editor.plugins.serialize(state)
    onChange(serialized)
  }

  render() {
    const {
      state: { id },
      editor: {
        store
      },
    } = this.props

      return (
        <Provider store={store}>
          <DragDropContext>
            <HotKeyDecorator id={id}>
              <Inner id={id} />
            </HotKeyDecorator>
          </DragDropContext>
        </Provider>
      )
  }
}

export default Editable
