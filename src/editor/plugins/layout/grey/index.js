import React from 'react'

const Grey = (props) => (
  <div style={{ backgroundColor: 'grey' }}>
    <div {...props} />
  </div>
)

Grey.propTypes = {}

export default {
  Component: Grey,
  name: 'ory/layout/grey',
  version: '0.0.1'
}
