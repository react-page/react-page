// @flow
import React, { PropTypes } from 'react'
import type { ContentPluginProps } from './classes'

const Default = ({ readOnly, state: { value } }: ContentPluginProps<{}>) => readOnly
  ? <div>{value}</div>
  : <textarea style={{width: '100%'}} value={value} />

Default.propTypes = {
  name: PropTypes.string.isRequired,
  version: PropTypes.string.isRequired
}

export default {
  Component: Default,
  name: 'ory/editor/core/default',
  version: '0.0.1',
  createInitialState: () => ({ value: 'This is the default plugin from the core package. To replace it, set the "defaultPlugin" value in the editor config.' })
}
