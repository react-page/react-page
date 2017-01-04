// @flow
import React, { Component } from 'react'
import Inner from './inner'
import { connect } from 'react-redux'
import { shouldPureComponentUpdate } from 'src/editor/helper/shouldComponentUpdate'
import { bindActionCreators } from 'redux'
import { editableConfig, node, purifiedNode } from 'src/editor/selector/editable'
import { isPreviewMode, isEditMode, isResizeMode, isLayoutMode, isInsertMode } from 'src/editor/selector/display'
import { createStructuredSelector } from 'reselect'
import Resizable from './Resizable'
import { resizeCell, focusCell, blurAllCells } from 'src/editor/actions/cell'
import classNames from 'classnames'
import cssModules from 'react-css-modules'
import type { ComponentizedCell } from 'types/editable'

import * as commonStyles from 'src/editor/styles'
import localStyles from './index.scoped.css'

const gridClass = ({ node: { size }, isPreviewMode, isEditMode }: ComponentizedCell): string => `cell-${isPreviewMode || isEditMode ? 'md' : 'xs'}-${size || 12}`

const stopClick = (isEditMode: boolean) => (e: Event) => isEditMode ? e.stopPropagation() : null

class Cell extends Component {
  shouldComponentUpdate = shouldPureComponentUpdate

  props: ComponentizedCell

  render() {
    const {
      id, rowWidth, rowHeight, updateDimensions, isLayoutMode, isInsertMode,
      isResizeMode,
      isEditMode,
      node: { inline, resizable, hasInlineNeighbour, focused }
    } = this.props


    // originally, flexbox grid was used in d&d:
    //
    //  if (isLayoutMode || isResizeMode || isInsertMode) {

    let styles
    if (isResizeMode) {
      styles = {
        ...this.props.styles,
        ...commonStyles.flexbox,
        ...localStyles // override defaults
      }
    }

    const props = { ...this.props, styles: null }
    return (
      <div
        styles={styles}
        styleName={classNames(gridClass(this.props), {
          'has-inline-neighbour': hasInlineNeighbour,
          [`inline-${inline || ''}`]: inline,
          'bring-to-front': inline && (!isLayoutMode && !isInsertMode && !isResizeMode),
          focused
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
  isInsertMode,
  isResizeMode,
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

export default (connect(mapStateToProps, mapDispatchToProps)(cssModules(Cell, { ...commonStyles.floating, ...commonStyles.common, ...localStyles }, { allowMultiple: true })))
