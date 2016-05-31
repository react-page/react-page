import React from 'react'
import ReactDOM from 'react-dom'

import './index.css'

const renderComponent = (component, element) => ReactDOM.render(component, element)

let render = (elements) => {
  const Editable = require('src/common/components/Editable').default

  elements.forEach((e) => renderComponent(<Editable />, e))
}

if (module.hot) {
  const renderApp = render
  const renderError = (error) => {
    const RedBox = require('redbox-react')
    renderComponent(<RedBox error={error} />, document.getElementById('app'))
  }

  render = () => {
    try {
      renderApp()
    } catch (error) {
      renderError(error)
    }
  }

  module.hot.accept('src/common/components/App', () => {
    setTimeout(render)
  })
}

render(document.querySelectorAll('editable'))
