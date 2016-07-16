import React, { PropTypes, Component } from 'react'
import Inner from './inner'
import { connect } from 'react-redux'
import { shouldPureComponentUpdate } from 'src/editor/helper/shouldComponentUpdate'
import { editableConfig } from 'src/editor/selector/editable'
import { isPreviewMode, isEditMode, isResizeMode, isLayoutMode } from 'src/editor/selector/display'
import { createStructuredSelector } from 'reselect'
import Resizable from './Resizable'
import { resizeCell } from 'src/editor/actions/cell'
import classNames from 'classnames'
import cssModules from 'react-css-modules'

import * as commonStyles from 'src/editor/styles'
import styles from './index.scoped.css'

const gridClass = ({ size, isPreviewMode, isLayoutMode }) => `cell-${isPreviewMode ? 'md' : 'xs'}-${size}`

const resize = ({ resizeCell, id }) => (width) => resizeCell({ id }, width)

class Cell extends Component {
  shouldComponentUpdate = shouldPureComponentUpdate

  render() {
    const props = this.props

    if (props.isLayoutMode) {
      props.styles = {
        ...props.styles,
        ...commonStyles.flexbox,
        ...styles // override defaults
      }
    }

    return (
      <div
        styles={props.styles}
        styleName={classNames(gridClass(props), {
          'is-over-current': props.hover,
          'has-inline-neighbour': props.hasInlineNeighbour,
          [`inline-${props.inline}`]: props.inline,
          [`is-over-${props.hover}`]: props.hover
        })}
        className="editable-cell"
      >
        {props.resizable && (props.isResizeMode)
          ? (
          <Resizable
            id={props.id}
            rowWidth={props.rowWidth}
            updateDimensions={props.updateDimensions}
            rowHeight={props.rowHeight}
            size={props.size}
            bounds={props.bounds}
            inline={props.inline}
            steps={12}
            onChange={resize(props)}
          >
            <Inner {...{ ...props, styles: null, config: props.editableConfig(props.editable) }} />
          </Resizable>
        ) : (
          <Inner {...{ ...props, styles: null, config: props.editableConfig(props.editable) }} />
        )}
      </div>
    )
  }
}

Cell.propTypes = {

  rowWidth: PropTypes.number.isRequired,

  ancestors: PropTypes.array.isRequired,
  bounds: PropTypes.object.isRequired,
  editableConfig: PropTypes.func.isRequired,
  className: PropTypes.string,
  size: PropTypes.number.isRequired,
  resizable: PropTypes.bool.isRequired,
  inline: PropTypes.string,
  isPreviewMode: PropTypes.bool.isRequired,
  resizeCell: PropTypes.func.isRequired,
  hasInlineNeighbour: PropTypes.bool,
  isResizeMode: PropTypes.bool.isRequired,
  isLayoutMode: PropTypes.bool.isRequired,
  isEditMode: PropTypes.bool.isRequired,
  editable: PropTypes.string.isRequired,
  hover: PropTypes.string
}

const mapStateToProps = createStructuredSelector({
  isPreviewMode, isEditMode, isResizeMode, isLayoutMode, editableConfig
})

const mapDispatchToProps = {
  resizeCell
}

export default (connect(mapStateToProps, mapDispatchToProps)(cssModules(Cell, { ...commonStyles.floating, ...commonStyles.common, ...styles }, { allowMultiple: true })))
