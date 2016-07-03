import React, { PropTypes } from 'react'
import { Resizable as ReactResizeable } from 'react-resizable'
import Dimensions from 'react-dimensions'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import cssModules from 'react-css-modules'
import { createStructuredSelector } from 'reselect'
import { resizeMode, previousMode, DISPLAY_MODE_EDIT } from 'src/editor/actions/display'
import { isEditMode, isResizeMode } from 'src/editor/selector/display'
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

  onResizeStart() {
    this.props.resizeMode()
    this.setState({ isResizing: true })
  }

  onResizeStop() {
    this.props.previousMode(DISPLAY_MODE_EDIT)
    this.setState({ isResizing: false })
  }

  componentWillReceiveProps() {
    const width = this.state.size * this.stepWidth
    if (width !== this.state.width) {
      this.setState({ width })
    }
  }

  onResize(event, { size: result }) {
    let size = Math.round(result.width / this.stepWidth)
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
    const { bounds, isResizeMode, isEditMode, children } = this.props

    if (!(isResizeMode || isEditMode) || bounds.left === bounds.right) {
      return <div children={children} />
    }

    return (
      <ReactResizeable
        styleName="resizable"
        className={this.state.isResizing ? ' is-resizing' : ''}
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

  steps: PropTypes.number,
  cellWidth: PropTypes.number.isRequired,
  rowWidth: PropTypes.number.isRequired,

  bounds: PropTypes.shape({ right: PropTypes.number.isRequired }).isRequired,

  onChange: PropTypes.func.isRequired,

  previousMode: PropTypes.func.isRequired,
  resizeMode: PropTypes.func.isRequired,

  isResizeMode: PropTypes.bool.isRequired,
  isEditMode: PropTypes.bool.isRequired
}

const mapStateToProps = createStructuredSelector({
  isEditMode,
  isResizeMode
})

const mapDispatchToProps = (dispatch) => bindActionCreators({
  resizeMode, previousMode
}, dispatch)

export default Dimensions()(connect(mapStateToProps, mapDispatchToProps)(cssModules(Resizable, styles, { allowMultiple: true })))
