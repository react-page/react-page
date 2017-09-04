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
  isResizeMode,
  isInsertMode,
  isLayoutMode
} from '../../selector/display'
import { resizeCell, focusCell, blurAllCells } from '../../actions/cell'
import Resizable from './Resizable'

import type { ComponetizedCell } from '../../types/editable'

const gridClass = ({
  node: { size },
  isPreviewMode,
  isEditMode
}: ComponetizedCell): string => {
  if (isPreviewMode || isEditMode) {
    return `ory-cell-${isPreviewMode || isEditMode ? 'sm' : 'xs'}-${size ||
      12} ory-cell-xs-12`
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
      isResizeMode,
      isEditMode,
      node: { inline, resizable, hasInlineNeighbour, focused },
      isLayoutMode
    } = this.props

    return (
      <div
        className={classNames('ory-cell', gridClass(this.props), {
          'ory-cell-has-inline-neighbour': hasInlineNeighbour,
          [`ory-cell-inline-${inline || ''}`]: inline,
          // 'ory-cell-bring-to-front': inline, && (!isLayoutMode && !isInsertMode && !isResizeMode),
          'ory-cell-focused': focused,
          'ory-cell-resizing-overlay': isResizeMode,
          'ory-cell-bring-to-front': !isResizeMode && !isLayoutMode && inline // inline must not be active for resize/layout
        })}
        onClick={stopClick(isEditMode)}
      >
        {resizable && isResizeMode ? (
          <Resizable
            {...this.props}
            id={id}
            rowWidth={rowWidth}
            rowHeight={rowHeight}
            updateDimensions={updateDimensions}
            node={this.props.node}
            steps={12}
            onChange={this.props.resizeCell}
          >
            <Inner {...this.props} styles={null} />
          </Resizable>
        ) : (
          <Inner {...this.props} styles={null} />
        )}
      </div>
    )
  }
}

const mapStateToProps = createStructuredSelector({
  isPreviewMode,
  isEditMode,
  isResizeMode,
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
      resizeCell: resizeCell(id),
      focusCell: focusCell(id),
      blurAllCells
    },
    dispatch
  )

export default connect(mapStateToProps, mapDispatchToProps)(Cell)
