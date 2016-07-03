import React, { PropTypes } from 'react'
import cssModules from 'react-css-modules'
import Inner from './inner'
import styles from 'src/editor/styles/grid.scoped.css'


const Cell = ({ size = 12, ...props }) => <div styleName={`cell-sm-${size}`}><Inner {...{ ...props, styles: null }} /></div>

Cell.propTypes = {
  size: PropTypes.number
}

export default cssModules(Cell, styles)
