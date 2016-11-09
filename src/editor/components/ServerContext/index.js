// @flow
import { Component, Children, PropTypes } from 'react'

class ServerContext extends Component {
  getChildContext() {
    return { isServerContext: true }
  }

  props: {
    children?: Component<*, *, *>
  }

  render() {
    return Children.only(this.props.children)
  }
}

ServerContext.childContextTypes = {
  isServerContext: PropTypes.bool
}

export default ServerContext
