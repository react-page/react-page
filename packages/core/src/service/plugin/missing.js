// @flow
import React from 'react'
import type { ContentPluginProps } from './classes'

const ContentMissingComponent = (props: ContentPluginProps<{}>) => (
  <div
    style={{
      backgroundColor: 'red',
      padding: '8px',
      border: '1px solid black',
      margin: '2px',
      overflowX: 'scroll'
    }}
  >
    The requested content plugin could not be found.
    <pre>{JSON.stringify(props, null, 2)}</pre>
  </div>
)

export const contentMissing = (plugin: { name: string, version: string }) => ({
  Component: ContentMissingComponent,
  ...plugin
})

const LayoutMissingComponent = ({ children, ...props }: any) => (
  <div>
    <div
      style={{
        backgroundColor: 'red',
        padding: '8px',
        border: '1px solid black',
        margin: '2px',
        overflowX: 'scroll'
      }}
    >
      The requested layout plugin could not be found.
      <pre>{JSON.stringify(props, null, 2)}</pre>
    </div>
    {children}
  </div>
)

export const layoutMissing = (plugin: { name: string, version: string }) => ({
  Component: LayoutMissingComponent,
  ...plugin
})
