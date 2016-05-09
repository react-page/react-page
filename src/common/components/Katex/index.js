import katex from 'katex'
import React, { Component, PropTypes } from 'react'

import 'katex/dist/katex.min.css'

class Katex extends Component {
  constructor(props) {
    super(props)
    this.timer = null
  }

  componentDidMount() {
    this.update(this.props.src)
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.src !== this.props.src) {
      this.update(nextProps.src)
    }
  }

  componentWillUnmount() {
    clearTimeout(this.timer)
    this.timer = null
  }

  update(src) {
    if (this.timer) {
      clearTimeout(this.timer)
    }

    this.timer = setTimeout(() => {
      try {
        const html = katex.renderToString(
          (src && src.length > 0) ? src : '\\text{empty formula}', {
            displayMode: true,
            throwOnError: false
          }
        )

        this.setState({
          __html: html
        })
      } catch (e) {} // eslint-disable-line no-empty
    }, 0)
  }

  render() {
    return (
      <div dangerouslySetInnerHTML={this.state}
           onClick={this.props.onClick} />
    )
  }
}

Katex.propTypes = {
  src: PropTypes.string.isRequired,
  onClick: PropTypes.func
}

Katex.defaultProps = { src: '' }

export default Katex
