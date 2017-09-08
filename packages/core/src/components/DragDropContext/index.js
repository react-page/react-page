// @flow
import React, { Component } from 'react'

import { shouldPureComponentUpdate } from '../../helper/shouldComponentUpdate'

// eslint-disable-next-line react/prefer-stateless-function
class DragDropContext extends Component {
  shouldComponentUpdate = shouldPureComponentUpdate

  render() {
    return <div {...this.props} />
  }
}

export default (dragDropContext: any) => {
  return dragDropContext(DragDropContext)
}
