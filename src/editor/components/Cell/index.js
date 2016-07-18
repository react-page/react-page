import React, { PropTypes, Component } from 'react'
import Inner from './inner'
import { connect } from 'react-redux'
import { shouldPureComponentUpdate } from 'src/editor/helper/shouldComponentUpdate'
import { editableConfig, node, purifiedNode } from 'src/editor/selector/editable'
import { isPreviewMode, isEditMode, isResizeMode, isLayoutMode, isInsertMode } from 'src/editor/selector/display'
import { createStructuredSelector } from 'reselect'
import Resizable from './Resizable'
import { resizeCell } from 'src/editor/actions/cell'
import classNames from 'classnames'
import cssModules from 'react-css-modules'

import * as commonStyles from 'src/editor/styles'
import localStyles from './index.scoped.css'

const gridClass = ({ node: { size = 12 }, isPreviewMode }) => `cell-${isPreviewMode ? 'md' : 'xs'}-${size}`

const resize = ({ resizeCell, id }) => (width) => resizeCell({ id }, width)

class Cell extends Component {
  shouldComponentUpdate = shouldPureComponentUpdate

  render() {
    const {
      id,
      rowWidth,
      rowHeight,
      updateDimensions,

      isLayoutMode,
      isResizeMode,
      isInsertMode,

      node: {
        inline,
        resizable,
        hover,
        hasInlineNeighbour
      } = {}
    } = this.props

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
          'has-inline-neighbour': hasInlineNeighbour,
          [`inline-${inline}`]: inline,
          [`is-over-${hover}`]: hover
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
            onChange={resize(props)}
          >
            <div className="editable-cell">
              {/* this div needs to be kept or resize will be broken */}
              <Inner {...props} />
            </div>
          </Resizable>
        ) : (
          <div className="editable-cell">
            {/* this div needs to be kept or weird stylings will happen */}
            <Inner {...props} />
          </div>
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
    resizeCell: PropTypes.func.isRequired,
    hasInlineNeighbour: PropTypes.bool,
    bounds: PropTypes.object.isRequired,
    hover: PropTypes.string
  }).isRequired,

  rowWidth: PropTypes.number.isRequired,
  rowHeight: PropTypes.number.isRequired,
  updateDimensions: PropTypes.func.isRequired,

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
  rawNode: (state, props) => () => node(state, props)
})

const mapDispatchToProps = {
  resizeCell
}

export default (connect(mapStateToProps, mapDispatchToProps)(cssModules(Cell, { ...commonStyles.floating, ...commonStyles.common, ...localStyles }, { allowMultiple: true })))
