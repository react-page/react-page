import React, { Component, PropTypes } from 'react'
import cssModules from 'react-css-modules'
import throttle from 'lodash.throttle'
import { ResizableBox } from 'react-resizable'

import styles from './index.css'

const compute = ({ height }) => ({ height: height > 24 ? height : 24 })

class Spacer extends Component {
  constructor(props) {
    super(props)

    this.state = compute(props)
    this.onResize = this.onResize.bind(this)
  }

  onResize(event, { size }) {
    const { onChange } = this.props
    this.setState(compute(size))
    throttle(() => onChange(compute(size)), 100, { trailing: false })()
  }

  render() {
    return (
      <div styleName="spacer">
        <ResizableBox onResize={this.onResize} height={this.state.height}>
          <div />
        </ResizableBox>
      </div>
    )
  }
}

Spacer.propTypes = {
  onChange: PropTypes.func.isRequired,
  height: PropTypes.number
}

export default cssModules(Spacer, styles)
