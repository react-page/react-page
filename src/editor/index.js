// @flow
/* eslint no-use-before-define: off */
import React from 'react'
import ReactDOM from 'react-dom'
import { forEach } from 'ramda'
import EditorComponent from 'src/editor/components/Editor'
import Controls from 'src/editor/components/Controls'
import createStore from './store'
import { updateEditable } from 'src/editor/actions/editables'
import ContentService from 'src/editor/service/content'
import { isProduction } from './const'

import type Store from 'types/redux'
import type { Editable as EditableType } from 'types/editable'

// required for material-ui
import injectTapEventPlugin from 'react-tap-event-plugin'
injectTapEventPlugin()

if (!isProduction && typeof window !== 'undefined') {
  window.Perf = require('react-addons-perf')
}

let instance: Editor

/**
 * Editor is the core interface for dealing with the editor.
 */
class Editor {
  store: Store
  content: ContentService

  constructor() {
    if (instance) {
      throw new Error('Only one instance of Editor is allowed')
    }

    instance = this
    this.store = createStore({ editables: [] })
    this.content = new ContentService()
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

    ReactDOM.render((
      <Controls plugins={this.content.plugins} store={this.store} />
    ), toolbar)
  }

  /**
   * Renders the editor given a list of DOM entities.
   */
  render(editables: NodeList<HTMLElement>) {
    forEach((editable: Node) => {
      this.content.fetch(editable).then((state: EditableType) => {
        this.store.dispatch(updateEditable({
          ...state,
          config: {
            whitelist: this.content.plugins.getRegisteredNames()
          }
        }))
        ReactDOM.render(<EditorComponent store={this.store} id={state.id} />, editable)
      })
    }, editables)
  }
}

export default Editor
