import React, { PropTypes } from 'react'
import Cell from 'src/editor/components/Cell'

const Row = ({ cells = [] }) => (
  <div>
    {cells.map(({ id, ...c }) => <Cell key={id} {...c} />)}
  </div>
)

Row.propTypes = {
  id: PropTypes.string.isRequired,
  cells: PropTypes.array.isRequired
}

export default Row
