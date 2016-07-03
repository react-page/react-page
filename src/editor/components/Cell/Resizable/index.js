import React, { PropTypes } from 'react'
import { Resizable as ReactResizeable } from 'react-resizable'
import dimensions from 'react-dimensions'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import cssModules from 'react-css-modules'
import { createStructuredSelector } from 'reselect'
import { resizeMode, editMode } from 'src/editor/actions/display'
import styles from './index.scoped.css'

const computeStepWidth = ({ rowWidth, steps = 12 }) => Math.round(rowWidth / steps)

class Resizable extends React.Component {
  constructor(props) {
    super(props)
    this.maxSteps = (props.steps - 1) || 11
    this.stepWidth = computeStepWidth(props)

    this.state = {
      isResizing: false,
      width: props.containerWidth,
      size: Math.round(props.containerWidth / this.stepWidth)
    }
    this.onResize = this.onResize.bind(this)
    this.onResizeStart = this.onResizeStart.bind(this)
    this.onResizeStop = this.onResizeStop.bind(this)
  }

  componentWillReceiveProps() {
    const width = this.props.cellWidth * this.stepWidth
    if (width !== this.state.width) {
      this.setState({ width })
    }
  }

  onResizeStart() {
    // this.props.resizeMode()
    this.setState({ isResizing: true })
  }

  onResizeStop() {
    // this.props.editMode()
    this.setState({ isResizing: false })
  }

  onResize(event, { size: result }) {
    let size = Math.round(result.width / this.stepWidth)
    if (this.props.inline === 'right') {
      size = this.props.steps - size
    }

    if (size >= this.maxSteps) {
      size = this.maxSteps
    } else if (size < 1) {
      size = 1
    }

    const width = size * this.stepWidth
    if (width !== this.state.width) {
      this.props.onChange(size)
    }

    this.setState({ width, size })
  }

  render() {
    const { bounds, children, inline } = this.props

    return (
      <ReactResizeable
        styleName={`resizable${inline ? ` inline-${inline}` : ''}`}
        className={`resizable-cell${this.state.isResizing ? ' is-resizing' : ''}`}
        onResize={this.onResize}
        width={this.state.width}
        onResizeStart={this.onResizeStart}
        onResizeStop={this.onResizeStop}
        minConstraints={[this.stepWidth, 0]}
        maxConstraints={[bounds.right * this.stepWidth, 0]}
        height={0}>
        <div children={children} />
      </ReactResizeable>
    )
  }
}

Resizable.propTypes = {
  containerWidth: PropTypes.number.isRequired,
  children: PropTypes.array.isRequired,

  steps: PropTypes.number,
  inline: PropTypes.string,
  cellWidth: PropTypes.number.isRequired,
  rowWidth: PropTypes.number.isRequired,

  bounds: PropTypes.shape({ right: PropTypes.number.isRequired }).isRequired,

  onChange: PropTypes.func.isRequired,

  resizeMode: PropTypes.func.isRequired,
  editMode: PropTypes.func.isRequired
}

const mapStateToProps = createStructuredSelector({})

const mapDispatchToProps = (dispatch) => bindActionCreators({
  resizeMode, editMode
}, dispatch)

export default dimensions()(connect(mapStateToProps, mapDispatchToProps)(cssModules(Resizable, styles, { allowMultiple: true })))
