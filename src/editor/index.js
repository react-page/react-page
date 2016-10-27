// @flow
/* eslint-disable no-use-before-define, no-underscore-dangle */
import React from 'react'
import ReactDOM from 'react-dom'
import EditorComponent from 'src/editor/components/Editor'
import Controls from 'src/editor/components/Controls'
import createStore from './store'
import { updateEditable } from 'src/editor/actions/editables'
import ContentService from 'src/editor/service/content'
import { isProduction } from './const'
import consolePlugin from 'raven-js/plugins/console'
import PluginService from 'src/editor/service/plugin'
import { AbstractAdapter } from 'src/editor/service/content/adapter'
import Editable from './editable.js'

import type Store from 'types/redux'
import type { Editable as EditableType } from 'types/editable'

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
  /* eslint no-console:0*/
  return window.console && console.error && console.error(ex)
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
  content: ContentService
  editables: Editable[] = []

  constructor({
    adapters,
    plugins,
    disableAnonymousErrorReporting,
    middleware = []
  }: {
    adapters: Array<AbstractAdapter>,
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
    this.content = new ContentService(adapters, plugins)
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
        <Controls plugins={this.content.plugins} store={this.store} />
      ), toolbar)
    } catch (e) {
      logException(e)
    }
  }

  /**
   * Renders the editor given a list of DOM entities.
   */
  render = (editable: HTMLElement) => new Promise((res: (e: Editable) => void, rej: (e: Error) => void) => {
    try {
      this.content.fetch(editable).then((state: EditableType) => {
        this.store.dispatch(updateEditable({
          ...state,
          config: {
            whitelist: this.content.plugins.getRegisteredNames()
          }
        }))

        const edb = new Editable({
          id: state.id,
          store: this.store,
          content: this.content
        })

        ReactDOM.render(<EditorComponent store={this.store} id={state.id} />, editable)

        this.editables.push(edb)
        res(edb)
      })
    } catch (e) {
      logException(e)
      rej(e)
    }
  })

  destroy = (editable: HTMLElement) => new Promise((res: () => void) => {
    this.content.fetch(editable).then((state: EditableType) => {
      ReactDOM.unmountComponentAtNode(editable)
      this.editables = this.editables.filter((e: Editable) => e.id !== state.id)
      res()
    })
  })
}

if (typeof window !== 'undefined') {
  window.Ory = {
    Editor,
    ContentService,
    PluginService,
  }
}

export {
  ContentService,
  PluginService,
}

export default Editor
