import React, { PropTypes } from 'react'
import cssModules from 'react-css-modules'
import Inner from './inner'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { isPreviewMode, isEditMode, isResizeMode } from 'src/editor/selector/display'
import { createStructuredSelector } from 'reselect'
import Resizable from './Resizable'
import dimensions from 'react-dimensions'
import { resizeCell } from 'src/editor/actions/cell'
import grid from 'src/editor/styles/grid.scoped.css'
import styles from './index.scoped.css'

const gridClass = ({ size, isPreviewMode }) => `cell-${isPreviewMode ? 'md' : 'xs'}-${size}`

const resize = ({ resizeCell, id }) => (width) => resizeCell({ id }, width)

const Cell = (props) => (
  <div className={`${props.hasInlineNeighbour ? 'has-inline-neighbour' : ''}${props.inline ? ` inline-${props.inline}` : ''}`} styleName={gridClass(props)}>
    {props.resizable && (props.isResizeMode || props.isEditMode)
      ? (
      <Resizable rowWidth={props.containerWidth}
                 cellWidth={props.size}
                 bounds={props.bounds}
                 inline={props.inline}
                 steps={12}
                 onChange={resize(props)}>
        <div className="editable-cell">
          <Inner {...{ ...props, styles: null }} />
        </div>
      </Resizable>
    ) : (
      <div className="editable-cell">
        <Inner {...{ ...props, styles: null }} />
      </div>
    )}

  </div>
)

Cell.propTypes = {
  bounds: PropTypes.object.isRequired,
  size: PropTypes.number.isRequired,
  containerWidth: PropTypes.number.isRequired,
  resizable: PropTypes.bool.isRequired,
  inline: PropTypes.string,
  isPreviewMode: PropTypes.bool.isRequired,
  resizeCell: PropTypes.func.isRequired,
  hasInlineNeighbour: PropTypes.bool,
  isResizeMode: PropTypes.bool.isRequired,
  isEditMode: PropTypes.bool.isRequired
}

const mapStateToProps = createStructuredSelector({
  isPreviewMode, isEditMode, isResizeMode
})

const mapDispatchToProps = (dispatch) => bindActionCreators({
  resizeCell
}, dispatch)

export default dimensions()(connect(mapStateToProps, mapDispatchToProps)(cssModules(Cell, { ...grid, ...styles })))
