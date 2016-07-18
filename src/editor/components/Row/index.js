import React, { PropTypes, Component } from 'react'
import droppable from './Droppable'
import { connect } from 'react-redux'
import { shouldPureComponentUpdate } from 'src/editor/helper/shouldComponentUpdate'
import { isLayoutMode, isResizeMode, isInsertMode } from 'src/editor/selector/display'
import { editableConfig, purifiedNode } from 'src/editor/selector/editable'
import { createStructuredSelector } from 'reselect'
import Inner from './inner'
import dimensions from 'react-dimensions'
import cssModules from 'react-css-modules'

import * as commonStyles from 'src/editor/styles'
import localStyles from './index.scoped.css'

class Row extends Component {
  constructor(props) {
    super(props)
    const { config: { whitelist } } = props
    this.Droppable = droppable(whitelist)
  }

  shouldComponentUpdate = shouldPureComponentUpdate

  render() {
    const { isLayoutMode, isResizeMode, isInsertMode } = this.props
    const Droppable = this.Droppable
    const props = {
      ...(this.props),
      ...(this.props.node)
    }

    if (isLayoutMode || isResizeMode || isInsertMode) {
      props.styles = {
        ...props.styles,
        ...commonStyles.flexbox,
        ...localStyles // override defaults
      }
    }

    if (isLayoutMode || isInsertMode) {
      return (
        <Droppable {...props}>
          <Inner {...props} />
        </Droppable>
      )
    }

    if (isResizeMode) {
      const InnerResizeContainer = Inner
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
  isInsertMode: PropTypes.bool.isRequired,
  config: PropTypes.func.isRequired,
  node: PropTypes.func.isRequired
}

const mapStateToProps = createStructuredSelector({
  isLayoutMode,
  config: editableConfig,
  isResizeMode,
  isInsertMode,
  node: purifiedNode
})

export default dimensions()(connect(mapStateToProps)(cssModules(Row, {
  ...commonStyles.floating,
  ...commonStyles.common,
  ...localStyles
}, { allowMultiple: true })))
