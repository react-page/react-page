// @flow
/* eslint-disable no-use-before-define, no-underscore-dangle */
import { v4 } from 'uuid'
import Editable from './components/Editable'
import createStore from './store'
import { actions } from './actions'
import { selectors } from './selector'
import PluginService from './service/plugin'
import pluginDefault from './service/plugin/default'
import type { Editable as EditableType } from './types/editable'
import type Store from './types/redux'
import forEach from 'ramda/src/forEach'
import HTML5Backend, { NativeTypes } from 'react-dnd-html5-backend'
import { DragDropContext as dragDropContext } from 'react-dnd'

let instance: Editor

const initialState = () => ({
  editables: {
    past: [],
    present: [],
    future: []
  }
})

const nativeTypes = (editor: Editor) =>
  editor.plugins.hasNativePlugin()
    ? [NativeTypes.URL, NativeTypes.FILE, NativeTypes.TEXT]
    : []

const update = (editor: Editor) => (editable: EditableType) => {
  const state = editor.plugins.unserialize(editable)
  actions(editor.store.dispatch).editable.update({
    ...state,
    config: {
      plugins: editor.plugins,
      whitelist: [
        ...editor.plugins.getRegisteredNames(),
        ...nativeTypes(editor)
      ]
    }
  })
}

const dndBackend = HTML5Backend

/**
 * Editor is the core interface for dealing with the editor.
 */
class Editor {
  store: Store
  plugins: PluginService
  middleware: []

  dragDropContext: any
  defaultPlugin: any

  constructor(
    {
      plugins,
      middleware = [],
      editables = [],
      defaultPlugin = pluginDefault,
      dragDropBackend
    }: {
      plugins: { content: [], layout: [], native?: any },
      middleware: [],
      editables: EditableType[],
      defaultPlugin: any,
      dragDropBackend: any
    } = {}
  ) {
    if (instance) {
      console.warn(
        'You defined multiple instances of the Editor class, this can cause problems.'
      )
    }

    instance = this
    this.store = createStore(initialState(), middleware)
    this.plugins = new PluginService(plugins)
    this.middleware = middleware
    this.trigger = actions(this.store.dispatch)
    this.query = selectors(this.store)
    this.defaultPlugin = defaultPlugin
    this.dragDropContext = dragDropContext(dragDropBackend || dndBackend)

    this.trigger.editable.add = update(this)
    this.trigger.editable.update = update(this)

    editables.forEach(this.trigger.editable.add)
  }

  refreshEditables = () => {
    forEach((editable: any) => {
      console.log(this.plugins.serialize(editable))
      this.trigger.editable.update(this.plugins.serialize(editable))
    }, this.store.getState().editables.present)
  }

  setLayoutPlugins = (plugins: Array<any> = []) => {
    this.plugins.setLayoutPlugins(plugins)
    this.refreshEditables()
  }

  addLayoutPlugin = (config: any) => {
    this.plugins.addLayoutPlugin(config)
    this.refreshEditables()
  }

  removeLayoutPlugin = (name: string) => {
    this.plugins.removeLayoutPlugin(name)
    this.refreshEditables()
  }

  setContentPlugins = (plugins: Array<any> = []) => {
    this.plugins.setContentPlugins(plugins)
    console.log(this.store.getState())
    this.refreshEditables()
  }

  addContentPlugin = (config: any) => {
    this.plugins.addContentPlugin(config)
    this.refreshEditables()
  }

  removeContentPlugin = (name: string) => {
    this.plugins.removeContentPlugin(name)
    this.refreshEditables()
  }

  trigger = {}
  query = {}
}

export { PluginService, Editable, Editor }

export const createEmptyState = () => ({ id: v4(), cells: [] })

export default Editor
