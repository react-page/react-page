import HTML5Backend from 'react-dnd-html5-backend'
import { DragDropContext as dragDropContext } from 'react-dnd'
import React, { Component } from 'react'

class DragDropContext extends Component {
  render() {
    return <div {...this.props} />
  }
}

export default dragDropContext(HTML5Backend)(DragDropContext)
