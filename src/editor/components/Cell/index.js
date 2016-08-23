// @flow
import React, { PropTypes, Component } from 'react'
import Inner from './inner'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { editableConfig, node, purifiedNode } from 'src/editor/selector/editable'
import { isPreviewMode, isEditMode, isResizeMode, isLayoutMode, isInsertMode } from 'src/editor/selector/display'
import { createStructuredSelector } from 'reselect'
import Resizable from './Resizable'
import { resizeCell, focusCell, blurCell } from 'src/editor/actions/cell'
import classNames from 'classnames'
import cssModules from 'react-css-modules'
import deepEqual from 'deep-equal'
import type { ComponentizedCell } from 'types/editable'

import * as commonStyles from 'src/editor/styles'
import localStyles from './index.scoped.css'

const gridClass = ({ node: { size }, isPreviewMode, isEditMode }: ComponentizedCell): string => `cell-${isPreviewMode || isEditMode ? 'md' : 'xs'}-${size || 12}`

class Cell extends Component {
  shouldComponentUpdate(nextProps: ComponentizedCell) {
    const blacklist = ['rawNode']
    const nextKeys = Object.keys(nextProps)
    const prevKeys = Object.keys(this.props)
    if (!deepEqual(nextKeys, prevKeys)) {
      return true
    }

    return nextKeys.filter((n: string) => blacklist.indexOf(n) > -1 ? false : !deepEqual(this.props[n], nextProps[n])).length > 0
  }

  render() {
    const {
      id, rowWidth, rowHeight, updateDimensions,
      isLayoutMode, isResizeMode, isInsertMode,
      node: { inline, resizable, hover, hasInlineNeighbour }
    }: ComponentizedCell = this.props

    let styles
    if (isLayoutMode || isResizeMode || isInsertMode) {
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
          'is-over-current': hover,
          [`is-over-${hover || ''}`]: hover,
          'has-inline-neighbour': hasInlineNeighbour,
          [`inline-${inline || ''}`]: inline
        })}
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

Cell.propTypes = {
  node: PropTypes.shape({
    size: PropTypes.number.isRequired,
    resizable: PropTypes.bool.isRequired,
    inline: PropTypes.string,
    isPreviewMode: PropTypes.bool.isRequired,
    hasInlineNeighbour: PropTypes.bool,
    bounds: PropTypes.object.isRequired,
    hover: PropTypes.string
  }).isRequired,

  rowWidth: PropTypes.number.isRequired,
  rowHeight: PropTypes.number.isRequired,
  updateDimensions: PropTypes.func.isRequired,
  focusCell: PropTypes.func.isRequired,
  blurCell: PropTypes.func.isRequired,
  resizeCell: PropTypes.func.isRequired,

  id: PropTypes.string.isRequired,
  styles: PropTypes.object.isRequired,
  ancestors: PropTypes.array.isRequired,

  isResizeMode: PropTypes.bool.isRequired,
  isLayoutMode: PropTypes.bool.isRequired,
  isEditMode: PropTypes.bool.isRequired,
  isInsertMode: PropTypes.bool.isRequired
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
  blurCell: blurCell(id)
}, dispatch)

export default (connect(mapStateToProps, mapDispatchToProps)(cssModules(Cell, { ...commonStyles.floating, ...commonStyles.common, ...localStyles }, { allowMultiple: true })))
