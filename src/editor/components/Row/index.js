import React, { PropTypes, Component } from 'react'
import droppable from './Droppable'
import { connect } from 'react-redux'
import { shouldPureComponentUpdate } from 'src/editor/helper/shouldComponentUpdate'
import { isLayoutMode, isResizeMode } from 'src/editor/selector/display'
import { editableConfig } from 'src/editor/selector/editable'
import { createStructuredSelector } from 'reselect'
import Inner from './inner'
import dimensions from 'react-dimensions'
import cssModules from 'react-css-modules'

import * as commonStyles from 'src/editor/styles'
import styles from './index.scoped.css'

class Row extends Component {
  constructor(props) {
    super(props)
    const { config, editable } = props
    const { whitelist } = config(editable)
    this.Droppable = droppable(whitelist)
  }

  shouldComponentUpdate = shouldPureComponentUpdate

  render() {
    const props = this.props
    const { isLayoutMode, isResizeMode } = this.props
    const Droppable = this.Droppable

    if (isLayoutMode) {
      props.styles = {
        ...props.styles,
        ...commonStyles.flexbox,
        ...styles // override defaults
      }
    }

    if (isLayoutMode) {
      return <Droppable {...props}><Inner {...props} /></Droppable>
    }

    if (isResizeMode) {
      const InnerResizeContainer = dimensions()(Inner)
      return (
        <InnerResizeContainer {...props} />
      )
    }

    return <Inner {...props} />
  }
}

Row.propTypes = {
  isLayoutMode: PropTypes.bool.isRequired,
  isResizeMode: PropTypes.bool.isRequired,
  config: PropTypes.func.isRequired
}

const mapStateToProps = createStructuredSelector({ isLayoutMode, config: editableConfig, isResizeMode })

export default connect(mapStateToProps)(cssModules(Row, {
  ...commonStyles.floating,
  ...commonStyles.common,
  ...styles
}, { allowMultiple: true }))
