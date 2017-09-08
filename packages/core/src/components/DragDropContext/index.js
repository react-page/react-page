// @flow
import React, { Component } from 'react'
import HTML5Backend from 'react-dnd-html5-backend'
import { DragDropContext as dragDropContext } from 'react-dnd'

import { shouldPureComponentUpdate } from '../../helper/shouldComponentUpdate'

// eslint-disable-next-line react/prefer-stateless-function
class DragDropContext extends Component {
  shouldComponentUpdate = shouldPureComponentUpdate

  render() {
    return <div {...this.props} />
  }
}

const defaultBackend = dragDropContext(HTML5Backend)

export default (backend: any) => {
  if (!backend) {
    return defaultBackend(DragDropContext)
  }

  return dragDropContext(backend)(DragDropContext)
}
