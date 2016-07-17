import React, { PropTypes, Component } from 'react'
import { Resizable as ReactResizeable } from 'react-resizable'
import dimensions from 'react-dimensions'
import { connect } from 'react-redux'
import cssModules from 'react-css-modules'
import { createStructuredSelector } from 'reselect'
import { resizeMode, editMode } from 'src/editor/actions/display'
import { computeStepWidth, widthToSize } from './helper.js'
import styles from './index.scoped.css'

class Resizable extends Component {
  constructor(props) {
    super(props)

    const sw = computeStepWidth(props)
    this.state = {
      stepWidth: sw,
      isResizing: false,
      width: props.node.size * sw,
      steps: (props.steps - 1) || 11,
    }

    this.onResize = this.onResize.bind(this)
  }

  shouldComponentUpdate(nextProps, nextState) {
    return nextProps !== this.props || nextState !== this.state
  }

  onResize(event, { size }) {
    const newSize = widthToSize(this.state, this.props, size)
    this.props.onChange(newSize)
    this.setState({ width: newSize * this.state.stepWidth })
  }

  render() {
    const { node: { bounds, inline }, children } = this.props

    return (
      <ReactResizeable
        styleName={`resizable${inline ? ` inline-${inline}` : ''}`}
        className={`resizable-cell${this.state.isResizing ? ' is-resizing' : ''}`}
        onResize={this.onResize}
        minConstraints={inline ? null : [this.state.stepWidth, Infinity]}
        maxConstraints={inline ? null : [bounds.right * this.state.stepWidth, Infinity]}
        draggableOpts={{ grid: [this.state.stepWidth, 0], axis: 'none' }}
        width={this.state.width}
        height={0}
        children={children}
      />
    )
  }
}

Resizable.propTypes = {
  containerWidth: PropTypes.number,
  containerHeight: PropTypes.number,
  updateDimensions: PropTypes.func,

  children: PropTypes.element.isRequired,

  steps: PropTypes.number,
  rowWidth: PropTypes.number.isRequired,
  rowHeight: PropTypes.number.isRequired,

  node: PropTypes.shape({
    size: PropTypes.number.isRequired,
    bounds: PropTypes.shape({ right: PropTypes.number.isRequired }).isRequired,
    inline: PropTypes.string,
  }),

  onChange: PropTypes.func.isRequired,
  resizeMode: PropTypes.func.isRequired,
  editMode: PropTypes.func.isRequired
}

const mapStateToProps = createStructuredSelector({})

const mapDispatchToProps = {
  resizeMode, editMode
}

export default dimensions()(connect(mapStateToProps, mapDispatchToProps)(cssModules(Resizable, styles, { allowMultiple: true })))
