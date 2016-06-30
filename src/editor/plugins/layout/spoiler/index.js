import React from 'react'

const Spoiler = (props) => (
  <div style={{ border: '1px solid grey' }}>
    <div {...props} />
  </div>
)

Spoiler.propTypes = {}

export default {
  Component: Spoiler,
  name: 'ory/layout/spoiler',
  version: '0.0.1'
}
