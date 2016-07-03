import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { forEach } from 'ramda'
import Editable from 'src/editor/components/Editable'
import Toolbar from 'src/editor/components/Toolbar'
import createStore from './store'
import { updateEditable } from 'src/editor/actions/editables'
import ContentService from 'src/editor/service/content'

// required for material-ui
// import injectTapEventPlugin from 'react-tap-event-plugin'
// injectTapEventPlugin()

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
        <Toolbar/>
      </Provider >
    ), toolbar)
  }

  render(editables) {
    forEach((editable) => {
      this.content.fetch(editable).then((state) => {
        this.store.dispatch(updateEditable(state))
        ReactDOM.render((
          <Provider store={this.store}>
            <Editable id={state.id} />
          </Provider >
        ), editable)
      })
    }, editables)
  }
}

export default Editor
