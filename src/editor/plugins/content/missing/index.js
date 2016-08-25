// @flow
import React, { PropTypes } from 'react'
import { ContentPlugin } from 'src/editor/service/plugin/classes'

const Missing = ({ name, version }: { name: string, version: string }) => (
  <div style={{ backgroundColor: 'red' }}>
    Plugin <code>{name}:{version}</code> not found.
  </div>
)

Missing.propTypes = {
  name: PropTypes.string.isRequired,
  version: PropTypes.string.isRequired
}

export default class MissingPlugin extends ContentPlugin {
  Component = Missing
  name = 'ory/content/missing'
  version = '0.0.1'
}
