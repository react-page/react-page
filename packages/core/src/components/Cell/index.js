// @flow
import React, { Component } from 'react'
import { connect } from 'react-redux'
import classNames from 'classnames'
import { bindActionCreators } from 'redux'
import { createStructuredSelector } from 'reselect'

import Inner from './Inner'
import { shouldPureComponentUpdate } from '../../helper/shouldComponentUpdate'
import { editableConfig, node, purifiedNode } from '../../selector/editable'
import { isPreviewMode, isEditMode, isResizeMode, isInsertMode, isLayoutMode } from '../../selector/display'
import { resizeCell, focusCell, blurAllCells } from '../../actions/cell'
import Resizable from './Resizable'

import type { ComponentizedCell } from '../../types/editable'

const gridClass = ({ node: { size }, isPreviewMode, isEditMode }: ComponentizedCell): string => {
  if (isPreviewMode || isEditMode) {
    return `ory-cell-${isPreviewMode || isEditMode ? 'md' : 'xs'}-${size || 12} ory-cell-xs-12`
  }

  return `ory-cell-xs-${size || 12}`
}

const stopClick = (isEditMode: boolean) => (e: Event) => isEditMode ? e.stopPropagation() : null

class Cell extends Component {
  shouldComponentUpdate = shouldPureComponentUpdate

  props: ComponentizedCell

  render() {
    const {
      id, rowWidth, rowHeight, updateDimensions, isResizeMode, isEditMode,
      node: { inline, resizable, hasInlineNeighbour, focused }
    } = this.props

    const props = { ...this.props, styles: null }
    return (
      <div
        className={classNames('ory-cell', gridClass(this.props), {
          'ory-cell-has-inline-neighbour': hasInlineNeighbour,
          [`ory-cell-inline-${inline || ''}`]: inline,
          // 'ory-cell-bring-to-front': inline, && (!isLayoutMode && !isInsertMode && !isResizeMode),
          'ory-cell-focused': focused,
          'ory-cell-resizing-overlay': isResizeMode,
        })}
        onClick={stopClick(isEditMode)}
      >
        {resizable && (isResizeMode)
          ? (
            <Resizable
              id={id}
              rowWidth={rowWidth}
              rowHeight={rowHeight}
              updateDimensions={updateDimensions}
              node={props.node}
              steps={12}
              onChange={props.resizeCell}
            >
              <Inner {...props} />
            </Resizable>
          ) : (
            <Inner {...props} />
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

const mapDispatchToProps = (dispatch: Function, { id }: ComponentizedCell) => bindActionCreators({
  resizeCell: resizeCell(id),
  focusCell: focusCell(id),
  blurAllCells
}, dispatch)

export default (connect(mapStateToProps, mapDispatchToProps)(Cell))
