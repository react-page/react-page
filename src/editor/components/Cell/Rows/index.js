import React, { PropTypes } from 'react'
import Row from 'src/editor/components/Row'

const Rows = ({ rows = [] }) => (
  <div>
    {rows.map((r) => <Row key={r.id} {...r} />)}
  </div>
)

Rows.propTypes = {
  rows: PropTypes.array.isRequired
}

export default Rows
