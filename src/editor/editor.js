import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { forEach } from 'ramda'
import createStore from './store'

// required for material-ui
// import injectTapEventPlugin from 'react-tap-event-plugin'
// injectTapEventPlugin()

let instance

class Editor {
  constructor(editables = [], options = {}) {
    if (instance) {
      throw new Error('Only one instance of Editor is allowed')
    }

    instance = this
    this.editables = editables
    this.store = createStore(this.props.content)
    this.options = { ...options }
  }

  renderAll() {
    forEach(this.render, this.editables)
  }

  render(editable) {
    return ReactDOM.render((
      <Provider store={this.store}>
        <div />
      </Provider >
    ), editable)
  }
}

export default Editor
