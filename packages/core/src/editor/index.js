// @flow
/* eslint-disable no-use-before-define, no-underscore-dangle */
import React from 'react'
import Editable from 'src/editor/components/Editable'
import createStore from './store'
import { actions } from './actions'
import PluginService from 'src/editor/service/plugin'
import ServerContext from 'src/editor/components/ServerContext'
import ReactDOMServer from 'react-dom/server'
import uuid from 'uuid/v4'
import { updateEditable } from 'src/editor/actions/editables'

import type Store from 'types/redux'

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
  errorReporting: bool

  constructor({
    plugins = new PluginService(),
    middleware = []
  }: {
    plugins: PluginService,
    errorReporting: boolean,
    middleware: []
  } = {}) {
    if (instance) {
      console.warn('You have defined multiple instances of Editor, this could cause problems.')
    }

    instance = this
    this.store = createStore(initialState(), middleware)
    this.plugins = plugins
    this.middleware = middleware
    this.trigger = actions(this.store.dispatch)
  }

  trigger = {}

  renderToHtml = (state: any) => {
    if (!state.id) {
      throw new Error('The state must have an unique id')
    }

    const store = createStore(initialState(), this.middleware)
    const deserialized = this.plugins.unserialize(state)
    store.dispatch(updateEditable({
      ...deserialized,
      config: {
        whitelist: this.plugins.getRegisteredNames()
      }
    }))

    return ReactDOMServer.renderToStaticMarkup(
      <ServerContext>
        <Editable editor={{
          plugins: this.plugins,
          store
        }} state={deserialized}
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
