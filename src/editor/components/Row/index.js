import React, { PropTypes } from 'react'
import Cell from 'src/editor/components/Cell'
import cssModules from 'react-css-modules'
import styles from 'src/editor/styles/grid.scoped.css'

const Row = ({ cells = [] }) => (
  <div styleName="row">
    {cells.map((c) => <Cell key={c.id} {...c} />)}
  </div>
)

Row.propTypes = {
  id: PropTypes.string.isRequired,
  cells: PropTypes.array.isRequired
}

export default cssModules(Row, styles)
