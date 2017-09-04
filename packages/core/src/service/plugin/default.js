// @flow
import React from 'react'
import type { ContentPluginProps } from './classes'

const handleChange = (onChange: (state: any) => void) => (e: Event) => {
  if (e.target instanceof HTMLInputElement) {
    onChange({ value: e.target.value })
  }
}

const Default = ({
  readOnly,
  state: { value },
  onChange
}: ContentPluginProps<{ value: string }>) =>
  readOnly ? (
    <div>{value}</div>
  ) : (
    <textarea
      style={{ width: '100%' }}
      value={value}
      onChange={handleChange(onChange)}
    />
  )

export default {
  Component: Default,
  name: 'ory/editor/core/default',
  version: '0.0.1',
  createInitialState: () => ({
    value:
      'This is the default plugin from the core package. To replace it, set the "defaultPlugin" value in the editor config.'
  })
}
