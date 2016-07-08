import React, { PropTypes } from 'react'
import { Resizable as ReactResizeable } from 'react-resizable'
import dimensions from 'react-dimensions'
import { connect } from 'react-redux'
import cssModules from 'react-css-modules'
import { createStructuredSelector } from 'reselect'
import { resizeMode, editMode } from 'src/editor/actions/display'
import styles from './index.scoped.css'

const computeStepWidth = ({ rowWidth, steps = 12 }) => Math.round(rowWidth / steps)

const widthToSize = ({ stepWidth, steps }, { inline }, result) => {
  let size = Math.round(result.width / stepWidth)
  if (inline === 'right') {
    size = steps - size
  }

  if (size > steps) {
    size = steps
  } else if (size < 1) {
    size = 1
  }

  return size
}

class Resizable extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      stepWidth: computeStepWidth(props),
      steps: (props.steps - 1) || 11,
      isResizing: false,
      width: props.containerWidth,
      size: Math.round(props.containerWidth / this.stepWidth)
    }

    this.onResize = this.onResize.bind(this)
    this.onResizeStart = this.onResizeStart.bind(this)
    this.onResizeStop = this.onResizeStop.bind(this)
  }

  componentWillReceiveProps(next) {
    const width = next.cellWidth * this.state.stepWidth
    if (width !== this.state.width) {
      this.setState({ next })
    }
  }

  onResizeStart() {
    // FIXME
    // this.props.resizeMode()
    this.setState({ isResizing: true })
  }

  onResizeStop() {
    // FIXME
    // this.props.editMode()
    this.setState({ isResizing: false })
  }

  onResize(event, { size: result }) {
    this.props.onChange(widthToSize(this.state, this.props, result))
    this.setState({ width: result.width })
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
        minConstraints={[this.state.stepWidth, Infinity]}
        maxConstraints={[bounds.right * this.state.stepWidth, Infinity]}
        draggableOpts={{ grid: [this.state.stepWidth, 0], defaultPosition: { x: -1000, y: -1000 }, axis: 'x' }}
        height={0} children={children}
      />
    )
  }
}

Resizable.propTypes = {
  containerWidth: PropTypes.number.isRequired,
  containerHeight: PropTypes.number.isRequired,
  
  children: PropTypes.element.isRequired,

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

const mapDispatchToProps = {
  resizeMode, editMode
}

export default dimensions()(connect(mapStateToProps, mapDispatchToProps)(cssModules(Resizable, styles, { allowMultiple: true })))
