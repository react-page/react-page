// @flow
/* eslint-disable no-use-before-define, no-underscore-dangle */
import { v4 } from 'uuid'
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

const update = (editor: Editor) => (editable: EditableType) => {
  const state = editor.plugins.unserialize(editable)
  actions(editor.store.dispatch).editable.update({
    ...state,
    config: {
      whitelist: editor.plugins.getRegisteredNames()
    }
  })
}

/**
 * Editor is the core interface for dealing with the editor.
 */
class Editor {
  store: Store
  plugins: PluginService
  defaultPlugin: any
  middleware: []

  constructor(
    {
      plugins,
      middleware = [],
      editables = [],
      defaultPlugin = pluginDefault
    }: {
      plugins: { content: [], layout: [] },
      middleware: [],
      editables: EditableType[],
      defaultPlugin: any
    } = {}
  ) {
    if (instance) {
      console.warn(
        'You have defined multiple instances of Editor, this could cause problems.'
      )
    }

    instance = this
    this.store = createStore(initialState(), middleware)
    this.plugins = new PluginService(plugins)
    this.middleware = middleware
    this.trigger = actions(this.store.dispatch)
    this.defaultPlugin = defaultPlugin

    this.trigger.editable.add = update(this)
    this.trigger.editable.update = update(this)

    editables.forEach(this.trigger.editable.add)
  }

  trigger = {}
}

export { PluginService, Editable, Editor }

export const createEmptyState = () => ({ id: v4(), cells: [] })

export default Editor
