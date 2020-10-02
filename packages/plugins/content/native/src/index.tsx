import * as React from 'react';
import { NativeState } from './types/state';
import { NativeFactory } from '@react-page/core';

export interface NativeProps {
  state: NativeState;
}

const Native: React.SFC<NativeProps> = ({ state: { item, itemType } }) => (
  <div>
    <p>
      This is a default plugin that handles native drag events of type{' '}
      <code>{itemType}</code>.<br />
      It contained the following payload:
    </p>
    <pre>{JSON.stringify(item, null, 2)}</pre>
  </div>
);

/**
 *
 * @param hover the item which the native element was dropped on
 * @param monitor the DropTargetMonitor as provided by react-dnd
 * @param component the React component of the item which the native element was dropped on
 */
const plugin: NativeFactory = (hover, monitor, component) => ({
  Component: Native,
  name: 'ory/editor/core/content/default-native',
  version: '0.0.1',
  createInitialState: () => ({
    item: monitor && monitor.getItem(),
    itemType: monitor && monitor.getItemType(),
  }),

  // Set type to layout to create a layout cell instead of a content cell
  // type: 'layout'
});
export default plugin;
