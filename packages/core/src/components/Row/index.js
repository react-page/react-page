// @flow
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import droppable from './Droppable'
import Inner from './inner'
import dimensions from '../Dimensions'
import { shouldPureComponentUpdate } from '../../helper/shouldComponentUpdate'
import {
  isLayoutMode,
  isEditMode,
  isInsertMode
} from '../../selector/display'
import { editableConfig, purifiedNode, node } from '../../selector/editable'
import { blurAllCells } from '../../actions/cell'

import type { ComponetizedRow } from '../../types/editable'

class Row extends Component {
  constructor(props: ComponetizedRow) {
    super(props)
    const { config: { whitelist } } = props
    this.Droppable = droppable(whitelist)
  }

  shouldComponentUpdate = shouldPureComponentUpdate
  props: ComponetizedRow
  Droppable: any

  render() {
    const Droppable = this.Droppable
    const props = this.props

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
  isInsertMode,
  isEditMode,
  node: purifiedNode,
  rawNode: (state: any, props: any) => () => node(state, props)
})

const mapDispatchToProps = {
  blurAllCells
}

export default dimensions()(connect(mapStateToProps, mapDispatchToProps)(Row))
