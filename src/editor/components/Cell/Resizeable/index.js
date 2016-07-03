import React, { PropTypes } from 'react'
import { Resizable as ReactResizeable } from 'react-resizable'
import Dimensions from 'react-dimensions'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { createStructuredSelector } from 'reselect'

const computeStepWidth = ({ rowWidth, steps = 12 }) => rowWidth / steps

class Resizable extends React.Component {
  constructor(props) {
    super(props)
    this.maxSteps = props.maxSteps || (props.steps - 1) || 11
    this.stepWidth = computeStepWidth(this.props)
    this.state = {
      width: props.containerWidth,
      isResizing: false,
      size: Math.round(props.containerWidth / this.stepWidth)
    }
    this.onResize = this.onResize.bind(this)
    this.onResizeStart = this.onResizeStart.bind(this)
    this.onResizeStop = this.onResizeStop.bind(this)
  }

  onResizeStart() {
    this.props.setMode('resize')
    this.setState({ isResizing: true })
  }

  onResizeStop() {
    this.props.setMode('edit')
    this.setState({ isResizing: false })
  }

  componentDidUpdate() {
    const width = this.state.size * this.stepWidth
    if (width != this.state.width) {
      this.setState({ width })
    }
  }

  onResize(event, { element, size: result }) {
    let size = Math.round(result.width / this.stepWidth)
    if (size >= this.maxSteps) {
      size = this.maxSteps
    } else if (size < 1) {
      size = 1
    }

    const width = size * this.stepWidth
    if (width != this.state.width) {
      this.props.onChange(size)
    }

    this.setState({
      width,
      size
    })
  }

  render() {
    if (!this.props.enabled) {
      return <div {...this.props} />
    }

    return (
      <ReactResizeable
        className={`resizeable${this.state.isResizing ? ' is-resizing' : ''}`}
        onResize={this.onResize}
        width={this.state.width}
        onResizeStart={this.onResizeStart}
        onResizeStop={this.onResizeStop}
        minConstraints={[this.stepWidth, 0]}
        maxConstraints={[this.props.rowWidth, 0]}
        height={0}>
        <div {...this.props} />
      </ReactResizeable>
    )
  }
}

Resizable.propTypes = {
  containerWidth: PropTypes.number.isRequired,
  setMode: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  cellWidth: PropTypes.number.isRequired,
  steps: PropTypes.number,
  rowWidth: PropTypes.number.isRequired,
  maxSteps: PropTypes.number.isRequired,
  enabled: PropTypes.bool.isRequired
}

const mapStateToProps = createStructuredSelector({})

const mapDispatchToProps = (dispatch) => bindActionCreators({
  setMode
}, dispatch)

export default Dimensions()(connect(mapStateToProps, mapDispatchToProps)(Resizable))
