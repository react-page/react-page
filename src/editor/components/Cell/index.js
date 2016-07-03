import React, { PropTypes } from 'react'
import cssModules from 'react-css-modules'
import Inner from './inner'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { isPreviewMode } from 'src/editor/selector/display'
import { createStructuredSelector } from 'reselect'
import styles from 'src/editor/styles/grid.scoped.css'
import Resizable from './Resizable'
import dimensions from 'react-dimensions'
import { resizeCell } from 'src/editor/actions/cell'

const gridClass = ({ size, isPreviewMode }) => `cell-${isPreviewMode ? 'md' : 'xs'}-${size}`

const resize = ({ resizeCell, id }) => (width) => resizeCell({ id }, width)

const Cell = (props) => (
  <div styleName={gridClass(props)} className="editable-cell">
    <Resizable enabled={props}
               rowWidth={props.containerWidth}
               cellWidth={props.size}
               bounds={props.bounds}
               steps={12}
               onChange={resize(props)}>
      <Inner {...{ ...props, styles: null }} />
    </Resizable>
  </div>
)

Cell.propTypes = {
  bounds: PropTypes.object.isRequired,
  size: PropTypes.number.isRequired,
  containerWidth: PropTypes.number.isRequired,
  resizable: PropTypes.bool.isRequired,
  isPreviewMode: PropTypes.bool.isRequired,
  resizeCell: PropTypes.func.isRequired
}

const mapStateToProps = createStructuredSelector({
  isPreviewMode
})

const mapDispatchToProps = (dispatch) => bindActionCreators({
  resizeCell
}, dispatch)

export default dimensions()(connect(mapStateToProps, mapDispatchToProps)(cssModules(Cell, styles)))
