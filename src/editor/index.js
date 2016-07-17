import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { forEach } from 'ramda'
import Editable from 'src/editor/components/Editable'
import Controls from 'src/editor/components/Controls'
import createStore from './store'
import { updateEditable } from 'src/editor/actions/editables'
import ContentService from 'src/editor/service/content'
import { isProduction } from './const'
import DragDropContext from 'src/editor/components/DragDropContext'

// required for material-ui
import injectTapEventPlugin from 'react-tap-event-plugin'
injectTapEventPlugin()

if (!isProduction && typeof window !== 'undefined') {
  window.Perf = require('react-addons-perf')
}

let instance

class Editor {
  constructor() {
    if (instance) {
      throw new Error('Only one instance of Editor is allowed')
    }

    instance = this
    this.store = createStore({ editables: [] })
    this.content = new ContentService()
  }

  toolbar(toolbarHandle) {
    let toolbar = toolbarHandle
    if (!toolbar) {
      toolbar = document.createElement('div')
      document.body.appendChild(toolbar)
    }

    ReactDOM.render((
      <Provider store={this.store}>
        <DragDropContext>
          <Controls plugins={this.content.plugins} />
        </DragDropContext>
      </Provider >
    ), toolbar)
  }

  render(editables) {
    forEach((editable) => {
      this.content.fetch(editable).then((state) => {
        this.store.dispatch(updateEditable({
          ...state,
          config: {
            whitelist: this.content.plugins.getRegisteredNames()
          }
        }))
        ReactDOM.render((
          <Provider store={this.store}>
            <DragDropContext>
              <Editable id={state.id} />
            </DragDropContext>
          </Provider>
        ), editable)
      })
    }, editables)
  }
}

export default Editor
