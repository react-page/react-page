import React, { PropTypes } from 'react'
import Row from 'src/editor/components/Row'

const Rows = ({ rows = [], editable, id, ancestors = [] }) => (
  <div>
    {rows.map((r) => <Row editable={editable} ancestors={[...ancestors, id]} key={r.id} {...r} />)}
  </div>
)

Rows.propTypes = {
  rows: PropTypes.array.isRequired,
  ancestors: PropTypes.array.isRequired,
  editable: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired
}

export default Rows
