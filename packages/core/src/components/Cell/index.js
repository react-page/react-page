// @flow
import React, { Component } from 'react'
import { connect } from 'react-redux'
import classNames from 'classnames'
import { bindActionCreators } from 'redux'
import { createStructuredSelector } from 'reselect'

import Inner from './Inner'
import { shouldPureComponentUpdate } from '../../helper/shouldComponentUpdate'
import { editableConfig, node, purifiedNode } from '../../selector/editable'
import {
  isPreviewMode,
  isEditMode,
  isInsertMode,
  isLayoutMode
} from '../../selector/display'
import { focusCell, blurAllCells } from '../../actions/cell'

import type { ComponetizedCell } from '../../types/editable'

const gridClass = ({
  node: { size },
  isPreviewMode,
  isEditMode
}: ComponetizedCell): string => {
  if (isPreviewMode || isEditMode) {
    return `ory-cell-${isPreviewMode || isEditMode ? 'sm' : 'xs'}-${size || 12} ory-cell-xs-12`
  }

  return `ory-cell-xs-${size || 12}`
}

const stopClick = (isEditMode: boolean) => (e: Event) =>
  isEditMode ? e.stopPropagation() : null

type Props = ComponetizedCell

class Cell extends Component {
  shouldComponentUpdate = shouldPureComponentUpdate

  props: Props

  render() {
    const {
      id,
      rowWidth,
      rowHeight,
      updateDimensions,
      isEditMode,
      node: { inline, hasInlineNeighbour, focused },
      isLayoutMode
    } = this.props

    return (
      <div
        className={classNames('ory-cell', gridClass(this.props), {
          'ory-cell-has-inline-neighbour': hasInlineNeighbour,
          [`ory-cell-inline-${inline || ''}`]: inline,
          'ory-cell-focused': focused,
        })}
        onClick={stopClick(isEditMode)}
      >
        <Inner {...this.props} styles={null} />
      </div>
    )
  }
}

const mapStateToProps = createStructuredSelector({
  isPreviewMode,
  isEditMode,
  // required by sub-components
  isInsertMode,
  isLayoutMode,
  config: editableConfig,
  node: purifiedNode,
  rawNode: (state: any, props: any) => () => node(state, props)
})

const mapDispatchToProps = (dispatch: Function, { id }: { id: string }) =>
  bindActionCreators(
    {
      focusCell: focusCell(id),
      blurAllCells
    },
    dispatch
  )

export default connect(mapStateToProps, mapDispatchToProps)(Cell)
