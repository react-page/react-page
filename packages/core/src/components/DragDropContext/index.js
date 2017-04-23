// @flow
import HTML5Backend from 'react-dnd-html5-backend'
import { DragDropContext as dragDropContext } from 'react-dnd'
import React, { Component } from 'react'

import { shouldPureComponentUpdate } from '../../helper/shouldComponentUpdate'

// eslint-disable-next-line react/prefer-stateless-function
class DragDropContext extends Component {
  shouldComponentUpdate = shouldPureComponentUpdate

  render() {
    return <div {...this.props} />
  }
}

export default dragDropContext(HTML5Backend)(DragDropContext)
