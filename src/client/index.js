// @flow
import React from 'react'
import ReactDOM from 'react-dom'
import Editor from 'src/editor'

import './index.css'

const editor = new Editor()

const renderComponent = (component: Object) => ReactDOM.render(component, document.getElementById('app'))

let render = () => {
  editor.renderControls()
  editor.render(document.querySelectorAll('.editable'))
}

if (module.hot) {
  const renderApp = render
  const renderError = (error) => {
    const RedBox = require('redbox-react').default
    renderComponent(<RedBox error={error} />)
  }

  render = () => {
    try {
      renderApp()
    } catch (error) {
      renderError(error)
    }
  }

  module.hot.accept('src/editor/components/Editable', () => {
    setTimeout(render)
  })
}

render()
