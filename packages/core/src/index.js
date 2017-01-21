// @flow
/* eslint-disable no-use-before-define, no-underscore-dangle */
import uuid from 'uuid/v4'
import Editable from './components/Editable'
import createStore from './store'
import { actions } from './actions'
import PluginService from './service/plugin'
import pluginDefault from './service/plugin/default'
import type { Editable as EditableType } from './types/editable'
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
  defaultPlugin: any
  middleware: []

  constructor({
    plugins,
    middleware = [],
    editables = [],
    defaultPlugin = pluginDefault
  }: {
    plugins: { content: [], layout: [] },
    middleware: [],
    editables: EditableType[],
    defaultPlugin: any
  } = {}) {
    if (instance) {
      console.warn('You have defined multiple instances of Editor, this could cause problems.')
    }

    instance = this
    this.store = createStore(initialState(), middleware)
    this.plugins = new PluginService(plugins)
    this.middleware = middleware
    this.trigger = actions(this.store.dispatch)
    this.defaultPlugin = defaultPlugin

    editables.forEach((editable: EditableType) => {
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
}

export {
  PluginService,
  Editable,
  Editor
}

export const createEmptyState = () => ({ id: uuid(), cells: [] })

export default Editor
