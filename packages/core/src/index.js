// @flow
/* eslint-disable no-use-before-define, no-underscore-dangle */
import React from 'react'
import uuid from 'uuid/v4'
import ReactDOMServer from 'react-dom/server'
import Editable from './components/Editable'
import createStore from './store'
import { actions } from './actions'
import PluginService from './service/plugin'
import ServerContext from './components/ServerContext'
import type { EditableType } from './types/editable'
import type Store from './types/redux'

let instance: Editor

const initialState = () => ({
  editables: {
    past: [],
    present: [],
    future: []
  }
})

/**
 * Editor is the core interface for dealing with the editor.
 */
class Editor {
  store: Store
  plugins: PluginService
  middleware: []

  constructor({
    plugins,
    middleware = [],
    editables = []
  }: {
    plugins: { content: [], layout: [] },
    middleware: [],
    editables: EditableType[]
  } = {}) {
    if (instance) {
      console.warn('You have defined multiple instances of Editor, this could cause problems.')
    }

    instance = this
    this.store = createStore(initialState(), middleware)
    this.plugins = new PluginService(plugins)
    this.middleware = middleware
    this.trigger = actions(this.store.dispatch)

    editables.forEach((editable) => {
      const state = this.plugins.unserialize(editable)
      this.trigger.editable.add({
        ...state,
        config: {
          whitelist: this.plugins.getRegisteredNames()
        }
      })
    })
  }

  trigger = {}

  renderToHtml = (state: any) => {
    if (!state.id) {
      throw new Error('The state must have an unique id')
    }

    const store = createStore(initialState(), this.middleware)
    const deserialized = this.plugins.unserialize(state)

    this.trigger.editable.add({
      ...deserialized,
      config: {
        whitelist: this.plugins.getRegisteredNames()
      }
    })

    return ReactDOMServer.renderToStaticMarkup(
      <ServerContext>
        <Editable editor={{
          plugins: this.plugins,
          store
        }} id={state.id}
        />
      </ServerContext>
    )
  }
}

export {
  PluginService,
  Editable
}

export const createEmptyState = () => ({
  id: uuid(),
  cells: [{
    content: {
      plugin: { name: 'ory/editor/core/content/slate' },
      // state: createInitialState()
    }
  }]
})

export default Editor
