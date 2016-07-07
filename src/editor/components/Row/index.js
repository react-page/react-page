import React, { PropTypes, Component } from 'react'
import dimensions from 'react-dimensions'
import droppable from './Droppable'
import ResizeContainer from './ResizeContainer'
import { connect } from 'react-redux'
import { isLayoutMode, isResizeMode } from 'src/editor/selector/display'
import { editableConfig } from 'src/editor/selector/editable'
import { createStructuredSelector } from 'reselect'
import Inner from './inner'

class Row extends Component {
  constructor(props) {
    super(props)
    const { config, editable } = props
    const { whitelist } = config(editable)
    this.Droppable = droppable(whitelist)
  }

  shouldComponentUpdate(nextProps) {
    return this.props !== nextProps
  }

  render() {
    const { isLayoutMode, isResizeMode } = this.props
    const Droppable = this.Droppable

    if (isLayoutMode) {
      return <Droppable {...this.props}><Inner {...this.props} /></Droppable>
    } else if (isResizeMode) {
      return (
        <ResizeContainer>
          <Inner {...this.props} />
        </ResizeContainer>
      )
    }

    return <Inner {...this.props} />
  }
}

Row.propTypes = {
  isLayoutMode: PropTypes.bool.isRequired,
  config: PropTypes.func.isRequired,
  updateDimensions: PropTypes.func.isRequired
}

const mapStateToProps = createStructuredSelector({ isLayoutMode, config: editableConfig, isResizeMode })

export default connect(mapStateToProps)(Row)
