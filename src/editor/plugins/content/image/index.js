import React, { PropTypes } from 'react'

const Missing = ({ name, version }) => (
  <div style={{ backgroundColor: 'red' }}>
    Plugin <code>{name}:{version}</code> not found.
  </div>
)

Missing.propTypes = {
  name: PropTypes.string.isRequired,
  version: PropTypes.string.isRequired
}

export default {
  Missing,
  name: 'ory/content/missing',
  version: '0.1'
}
