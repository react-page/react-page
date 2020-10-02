import { createContentPlugin } from '@react-page/create-plugin-materialui';
import React from 'react';
import { Timeline } from 'react-twitter-widgets';
export default createContentPlugin<{
  screenName: string;
}>({
  Renderer: ({ state }) => (
    <Timeline
      dataSource={{
        sourceType: 'profile',
        screenName: state.screenName,
      }}
      options={{
        height: '400',
      }}
    />
  ),
  name: 'twitter-timeline',
  text: 'Twitter timeline',
  description: 'A twitter timeline',
  version: '0.0.1',
  schema: {
    properties: {
      screenName: {
        type: 'string',
        default: 'AlYankovic',
      },
    },
    required: ['screenName'],
  },
});
