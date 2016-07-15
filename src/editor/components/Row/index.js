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

const innerResizeContainer = (styles) => dimensions()((cssModules(Inner, styles, { allowMultiple: true })))
const innerContainer = (styles) => (cssModules(Inner, styles, { allowMultiple: true }))

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
    const css = {
      ...(isLayoutMode ? commonStyles.floating : commonStyles.flexbox),
      ...commonStyles.common
      ...styles
    }
    const InnerContainer = innerContainer(css)

    if (isLayoutMode) {
      return <Droppable {...this.props}><InnerContainer {...this.props} /></Droppable>
    }

    if (isResizeMode) {
      const InnerResizeContainer = innerResizeContainer(css)
      return (
        <InnerResizeContainer {...this.props} />
      )
    }

    return <InnerContainer {...this.props} />
  }
}

Row.propTypes = {
  isLayoutMode: PropTypes.bool.isRequired,
  config: PropTypes.func.isRequired
}

const mapStateToProps = createStructuredSelector({ isLayoutMode, config: editableConfig, isResizeMode })

export default connect(mapStateToProps)(Row)
