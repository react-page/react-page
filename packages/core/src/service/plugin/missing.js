// @flow
import React, { PropTypes } from 'react'
import type { ContentPluginProps } from './classes'

const Missing = ({ name, version }: ContentPluginProps<{}>) => (
  <div style={{ backgroundColor: 'red' }}>
    Plugin <code>{name}:{version}</code> not found.
  </div>
)

Missing.propTypes = {
  name: PropTypes.string.isRequired,
  version: PropTypes.string.isRequired
}

export default {
  Component: Missing,
  name: 'ory/editor/core/content/missing',
  version: '0.0.1',
}
