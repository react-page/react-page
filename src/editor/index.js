// @flow
/* eslint-disable no-use-before-define, no-underscore-dangle */
import React from 'react'
import ReactDOM from 'react-dom'
import EditableComponent from 'src/editor/components/Editable'
import ControlsComponent from 'src/editor/components/Controls'
import createStore from './store'
import { isProduction } from './const'
import consolePlugin from 'raven-js/plugins/console'
import PluginService from 'src/editor/service/plugin'
import Editable from './editable.js'

import type { Editable as EditableType } from 'types/editable'
import type Store from 'types/redux'

// required for material-ui
import injectTapEventPlugin from 'react-tap-event-plugin'
injectTapEventPlugin()

if (!isProduction && typeof window !== 'undefined') {
  window.Perf = require('react-addons-perf')
}

let Raven

const connectToRaven = () => {
  if (Raven) {
    return
  }

  if (isProduction && window !== 'undefined') {
    Raven = require('raven-js')
    Raven.config('https://7ccaf04e48474399bb705ecbd317e6ce@sentry.io/95510').install()
    consolePlugin(Raven, console)
  }
}

const logException = (ex: any, context: any) => {
  if (Raven) {
    Raven.captureException(ex, {
      extra: context
    })
  }

  throw ex
  /* eslint no-console:0*/
  // return window.console && console.error && console.error(ex)
}

const notify = (e: Editor) => () => (next: any) => (action: any) => {
  const result = next(action)
  e.editables.forEach((eb: Editable) => eb.notify(result))
  return result
}

let instance: Editor

/**
 * Editor is the core interface for dealing with the editor.
 */
class Editor {
  store: Store
  plugins: PluginService
  editables: Editable[] = []

  constructor({
    plugins = new PluginService(),
    disableAnonymousErrorReporting,
    middleware = []
  }: {
    plugins: PluginService,
    disableAnonymousErrorReporting: boolean,
    middleware: []
  } = {}) {
    if (instance) {
      throw new Error('Only one instance of Editor is allowed')
    }

    if (!disableAnonymousErrorReporting) {
      connectToRaven()
    }

    instance = this
    this.store = createStore({ editables: [] }, [
      ...middleware,
      notify(this)
    ])

    this.plugins = plugins
  }

  /**
   * Renders the editor given a DOM entities.
   */
  renderControls(toolbarHandle: ?HTMLElement) {
    let toolbar = toolbarHandle
    if (!toolbar) {
      toolbar = document.createElement('div')
      document.body.appendChild(toolbar)
    }

    try {
      ReactDOM.render((
        <ControlsComponent editor={this} />
      ), toolbar)
    } catch (e) {
      logException(e)
    }
  }

  /**
   * Renders the editor given a list of DOM entities.
   */
  render = (element: HTMLElement, state: EditableType) => new Promise((res: (e: Editable) => void, rej: (e: Error) => void) => {
    try {
      const edb = new Editable({
        id: state.id,
        store: this.store
      })

      ReactDOM.render(<EditableComponent editor={this} state={state} />, element)
      this.editables.push(edb)
      res(edb)
    } catch (e) {
      logException(e)
      rej(e)
    }
  })

  destroy = (element: HTMLElement, id: string) => new Promise((res: () => void) => {
    ReactDOM.unmountComponentAtNode(element)
    this.editables = this.editables.filter((e: Editable) => e.id !== id)
    res()
  })
}

export {
  PluginService,
  EditableComponent,
  ControlsComponent
}

export default Editor
