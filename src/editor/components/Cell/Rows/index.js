import React, { PropTypes } from 'react'
import Row from 'src/editor/components/Row'

const Rows = ({ rows = [] }) => (
  <div>
    {rows.map(({ id, ...c }) => <Row key={id} {...c} />)}
  </div>
)

Rows.propTypes = {
  rows: PropTypes.array.isRequired
}

export default Rows
