// @flow
/* eslint-disable no-duplicate-imports */
import React, { PropTypes } from 'react'
import { ContentPlugin } from 'src/editor/service/plugin/classes'
import type { ContentPluginProps } from 'src/editor/service/plugin/classes'

const Missing = ({ name, version }: ContentPluginProps) => (
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
  name = 'ory/editor/core/content/missing'
  version = '0.0.1'
}
