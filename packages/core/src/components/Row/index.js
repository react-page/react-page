// @flow
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import droppable from './Droppable'
import Inner from './inner'
import dimensions from '../Dimensions'
import { shouldPureComponentUpdate } from '../../helper/shouldComponentUpdate'
import { isLayoutMode, isEditMode, isResizeMode, isInsertMode } from '../../selector/display'
import { editableConfig, purifiedNode, node } from '../../selector/editable'
import { blurAllCells } from '../../actions/cell'

import type { ComponentizedRow } from '../../types/editable'

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
    // const { isResizeMode }: ComponentizedRow = this.props
    const Droppable = this.Droppable
    const props = this.props

    // originally, flexbox grid was used in d&d:
    //
    //  if (isLayoutMode || isResizeMode || isInsertMode) {

    // if (isResizeMode) {
    //   props.styles = {
    //     ...props.styles,
    //     ...commonStyles.flexbox,
    //     ...localStyles // override defaults
    //   }
    // }

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

export default dimensions()(connect(mapStateToProps, mapDispatchToProps)(Row))
