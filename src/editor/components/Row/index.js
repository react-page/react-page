import React, { PropTypes, Component } from 'react'
import droppable from './Droppable'
import { connect } from 'react-redux'
import { shouldPureComponentUpdate } from 'src/editor/helper/shouldComponentUpdate'
import { isLayoutMode, isResizeMode } from 'src/editor/selector/display'
import { editableConfig } from 'src/editor/selector/editable'
import { createStructuredSelector } from 'reselect'
import Inner from './inner'
import dimensions from 'react-dimensions'

const InnerResizeContainer = dimensions()(Inner)

class Row extends Component {
  constructor(props) {
    super(props)
    const { config, editable } = props
    const { whitelist } = config(editable)
    this.Droppable = droppable(whitelist)
  }

  shouldComponentUpdate = shouldPureComponentUpdate

  render() {
    const { isLayoutMode, isResizeMode } = this.props
    const Droppable = this.Droppable

    if (isLayoutMode) {
      return <Droppable {...this.props}><Inner {...this.props} /></Droppable>
    }

    if (isResizeMode) {
      return (
        <InnerResizeContainer {...this.props} />
      )
    }

    return <Inner {...this.props} />
  }
}

Row.propTypes = {
  isLayoutMode: PropTypes.bool.isRequired,
  config: PropTypes.func.isRequired
}

const mapStateToProps = createStructuredSelector({ isLayoutMode, config: editableConfig, isResizeMode })

export default connect(mapStateToProps)(Row)
