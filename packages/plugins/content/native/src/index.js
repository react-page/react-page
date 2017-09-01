// @flow
import React from 'react'
import type { ContentPluginProps } from './classes'

const Default = ({ state: { item, type } }: ContentPluginProps<{ type: string, item: string }>) => (
  <div>
    {type} - {JSON.stringify(item)}
  </div>
)

export default (props: { item: Object, type: string }) => ({
  Component: Default,
  name: 'ory/editor/core/content/default-native',
  version: '0.0.1',
  createInitialState: () => ({
    ...props
  })
})
