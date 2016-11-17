// @flow
import React, { Component } from 'react'
import droppable from './Droppable'
import { connect } from 'react-redux'
import { shouldPureComponentUpdate } from 'src/editor/helper/shouldComponentUpdate'
import { isLayoutMode, isEditMode, isResizeMode, isInsertMode } from 'src/editor/selector/display'
import { editableConfig, purifiedNode, node } from 'src/editor/selector/editable'
import { createStructuredSelector } from 'reselect'
import { blurAllCells } from 'src/editor/actions/cell'
import Inner from './inner'
import dimensions from 'src/editor/components/Dimensions'
import cssModules from 'react-css-modules'
import type { ComponentizedRow } from 'types/editable'

import * as commonStyles from 'src/editor/styles'
import localStyles from './index.scoped.css'

class Row extends Component {
  constructor(props: ComponentizedRow) {
    super(props)
    const { config: { whitelist } } = props
    this.Droppable = droppable(whitelist)
  }

  shouldComponentUpdate = shouldPureComponentUpdate
  props: ComponentizedRow
  Droppable: Object

  render() {
    const { isResizeMode }: ComponentizedRow = this.props
    const Droppable = this.Droppable
    const props = { ...this.props }

    // originally, flexbox grid was used in d&d:
    //
    //  if (isLayoutMode || isResizeMode || isInsertMode) {

    if (isResizeMode) {
      props.styles = {
        ...props.styles,
        ...commonStyles.flexbox,
        ...localStyles // override defaults
      }
    }

    return (
      <Droppable {...props}>
        <Inner {...props} />
      </Droppable>
    )
  }
}

const mapStateToProps = createStructuredSelector({
  isLayoutMode,
  config: editableConfig,
  isResizeMode,
  isInsertMode,
  isEditMode,
  node: purifiedNode,
  rawNode: (state: any, props: any) => () => node(state, props)
})

const mapDispatchToProps = {
  blurAllCells
}

export default dimensions()(connect(mapStateToProps, mapDispatchToProps)(cssModules(Row, {
  ...commonStyles.floating,
  ...commonStyles.common,
  ...localStyles
}, { allowMultiple: true })))
