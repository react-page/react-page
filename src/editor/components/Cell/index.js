import React, { PropTypes } from 'react'
import Inner from './inner'
import { connect } from 'react-redux'
import { editableConfig } from 'src/editor/selector/editable'
import { isPreviewMode, isEditMode, isResizeMode, isLayoutMode } from 'src/editor/selector/display'
import { createStructuredSelector } from 'reselect'
import Resizable from './Resizable'
import dimensions from 'react-dimensions'
import { resizeCell } from 'src/editor/actions/cell'
import grid from 'src/editor/styles/grid.scoped.css'
import cssModules from 'react-css-modules'
import classNames from 'classnames'
import styles from './index.scoped.css'

const gridClass = ({ size, isPreviewMode }) => `cell-${isPreviewMode ? 'md' : 'xs'}-${size}`

const resize = ({ resizeCell, id }) => (width) => resizeCell({ id }, width)

const Cell = (props) => (
  <div
    className={classNames({
      [props.className]: props.className,
      'has-inline-neighbour': props.hasInlineNeighbour,
      [`inline-${props.inline}`]: props.inline,
      'is-over-current': props.hover,
      [`is-over-${props.hover}`]: props.hover
    })}
    styleName={classNames(gridClass(props), {
      'is-over-current': props.hover,
      [`is-over-${props.hover}`]: props.hover
    })}
  >
    {props.resizable && (props.isResizeMode || props.isLayoutMode)
      ? (
      <Resizable rowWidth={props.containerWidth}
                 cellWidth={props.size}
                 bounds={props.bounds}
                 inline={props.inline}
                 steps={12}
                 onChange={resize(props)}
      >
        <div className="editable-cell" styleName="cell">
          <Inner {...{ ...props, styles: null, config: props.editableConfig(props.editable) }} />
        </div>
      </Resizable>
    ) : (
      <div className="editable-cell" styleName="cell">
        <Inner {...{ ...props, styles: null, config: props.editableConfig(props.editable) }} />
      </div>
    )}
  </div>
)

Cell.propTypes = {
  ancestors: PropTypes.array.isRequired,
  bounds: PropTypes.object.isRequired,
  editableConfig: PropTypes.func.isRequired,
  className: PropTypes.string,
  size: PropTypes.number.isRequired,
  containerWidth: PropTypes.number.isRequired,
  containerHeight: PropTypes.number.isRequired,
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

export default dimensions()(connect(mapStateToProps, mapDispatchToProps)(cssModules(Cell, { ...grid, ...styles }, { allowMultiple: true })))
