// @flow
/* eslint-disable no-use-before-define, no-underscore-dangle */
import React from 'react'
import EditableComponent from 'src/editor/components/Editable'
import ControlsComponent from 'src/editor/components/Controls'
import createStore from './store'
import { isProduction } from './const'
import { connectToRaven } from './raven'
import PluginService from 'src/editor/service/plugin'
import ServerContext from 'src/editor/components/ServerContext'
import ReactDOMServer from 'react-dom/server'

import type Store from 'types/redux'

if (!isProduction && typeof window !== 'undefined') {
  window.Perf = require('react-addons-perf')
}
let instance: Editor

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
    errorReporting = true,
    middleware = []
  }: {
    plugins: PluginService,
    errorReporting: boolean,
    middleware: []
  } = {}) {
    if (instance) {
      throw new Error('Only one instance of Editor is allowed')
    }

    instance = this
    this.store = createStore({ editables: [] }, middleware)
    this.plugins = plugins
    this.errorReporting = errorReporting
    this.middleware = middleware
    connectToRaven(errorReporting)
  }

  injectTapPlugin = () => {
    // required for material-ui
    require('react-tap-event-plugin')()
  }

  renderToHtml = (state: any) => ReactDOMServer.renderToStaticMarkup(
    <ServerContext>
      <EditableComponent editor={{
        plugins: this.plugins,
        store: createStore({ editables: [] }, this.middleware)
      }} state={state}
      />
    </ServerContext>
  )
}

export {
  PluginService,
  EditableComponent,
  ControlsComponent
}

export default Editor
