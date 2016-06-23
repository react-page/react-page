import React from 'react'
import ReactDOM from 'react-dom'

import './index.css'

const renderComponent = (component) => ReactDOM.render(component, document.getElementById('app'))

let render = () => {
  const App = require('src/editor/components/Editor').default

  renderComponent(<App />)
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

  module.hot.accept('src/editor/components/Editor', () => {
    setTimeout(render)
  })
}

render()
