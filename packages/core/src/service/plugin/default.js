// @flow
import React from 'react'
import type { ContentPluginProps } from './classes'

const Default = ({ readOnly, state: { value } }: ContentPluginProps<{ value: string }>) => readOnly
  ? <div>{value}</div>
  : <textarea style={{ width: '100%' }} value={value} />

export default {
  Component: Default,
  name: 'ory/editor/core/default',
  version: '0.0.1',
  createInitialState: () => ({ value: 'This is the default plugin from the core package. To replace it, set the "defaultPlugin" value in the editor config.' })
}
