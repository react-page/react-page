// @flow
import React from 'react'

const Native = ({ state: { item, itemType } }: { state: { itemType: string, item: string } }) => (
  <div>
    <p>
      This is a default plugin that handles native drag events of type{' '}
      <code>{itemType}</code>.<br />
      It contained the following payload:
    </p>
    <pre>
      {JSON.stringify(item, null, 2)}
    </pre>
  </div>
)

/**
 *
 * @param hover the item which the native element was dropped on
 * @param monitor the DropTargetMonitor as provided by react-dnd
 * @param component the React component of the item which the native element was dropped on
 */
export default (hover: any, monitor: any, component: any) => ({
  Component: Native,
  name: 'ory/editor/core/content/default-native',
  version: '0.0.1',
  createInitialState: () => ({
    item: monitor.getItem(),
    itemType: monitor.getItemType()
  })

  // Set type to layout to create a layout cell instead of a content cell
  // type: 'layout'
})
