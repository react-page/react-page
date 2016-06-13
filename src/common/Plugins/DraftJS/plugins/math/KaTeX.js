import katex from "katex";
import React, { Component, PropTypes } from "react";
import "katex/dist/katex.min.css";

class KaTeX extends Component {
  constructor(props) {
    super(props)
    this.timer = null
  }

  componentDidMount() {
    this.update(this.props.src)
  }

  componentWillReceiveProps({ src }) {
    if (src !== this.props.src) {
      this.update(src)
    }
  }

  componentWillUnmount() {
    clearTimeout(this.timer)
    this.timer = null
  }

  update(src) {
    const { displayMode, throwOnError, errorColor } = this.props

    if (this.timer) {
      clearTimeout(this.timer)
    }

    this.timer = setTimeout(() => {
      try {
        const html = katex.renderToString(
          (src && src.length > 0) ? src : '\\text{empty formula}', {
            displayMode,
            throwOnError,
            errorColor
          }
        )

        this.setState({
          __html: html
        })
      } catch (e) {
      } // eslint-disable-line no-empty
    }, 0)
  }

  render() {
    return (
      <span dangerouslySetInnerHTML={this.state}
            onClick={this.props.onClick}/>
    )
  }
}

KaTeX.propTypes = {
  displayMode: PropTypes.bool.isRequired,
  src: PropTypes.string.isRequired,
  throwOnError: PropTypes.bool.isRequired,
  errorColor: (props, propName, componentName) => {
    if (!(/#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})/).test(props[propName])) {
      return new Error(
        `Invalid prop ${propName} supplied to ${componentName}. Should be a color string`
      )
    }
  },
  onClick: PropTypes.func
}

KaTeX.defaultProps = {
  displayMode: false,
  src: '',
  throwOnError: false,
  errorColor: '#cc0000'
}

export default KaTeX
