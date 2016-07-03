import React, { PropTypes } from 'react'
import cssModules from 'react-css-modules'

import Cell from 'src/editor/components/Cell'
import styles from './index.css'

const Row = ({ cells = [] }) => (
  <div styleName="green">
    {cells.map(({ id, ...c }) => <Cell key={id} {...c} />)}
  </div>
)

Row.propTypes = {
  id: PropTypes.string.isRequired,
  cells: PropTypes.array.isRequired
}

export default cssModules(Row, styles)
