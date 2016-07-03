import React, { Component, PropTypes } from 'react'
import cssModules from 'react-css-modules'
import debounce from 'lodash.debounce'
import { ResizableBox } from 'react-resizable'

import styles from './index.css'

const compute = ({ height }) => ({ height: height > 24 ? height : 24 })

const fire = debounce(({ state, onChange }) => onChange(state), 1000, { leading: false })

class Spacer extends Component {
  constructor(props) {
    super(props)

    this.state = compute(props)
    this.onResize = this.onResize.bind(this)
  }

  onResize(event, { size }) {
    const { onChange } = this.props
    const state = compute(size)
    this.setState(state)
    fire({ onChange, state })
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
