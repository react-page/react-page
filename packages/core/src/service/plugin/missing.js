// @flow
import React from 'react'
import type { ContentPluginProps } from './classes'

const Missing = (props: ContentPluginProps<{}>) => (
  <div
    style={{
      backgroundColor: 'red',
      padding: '8px',
      border: '1px solid black',
      margin: '2px',
      overflowX: 'scroll'
    }}
  >
    The requested plugin could not be found.
    <pre>{JSON.stringify(props, null, 2)}</pre>
  </div>
)

export default (plugin: { name: string, version: string }) => ({
  Component: Missing,
  ...plugin
})
