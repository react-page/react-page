import { CellPlugin } from '@react-page/editor';
import React from 'react';
import { Timeline } from 'react-twitter-widgets';

const customContentPluginTwitter: CellPlugin<{
  screenName: string;
  height: number;
}> = {
  Renderer: ({ data }) => (
    <Timeline
      dataSource={{
        sourceType: 'profile',
        screenName: data.screenName,
      }}
      options={{
        height: data.height || 600,
      }}
    />
  ),
  id: 'twitter-timeline',
  title: 'Twitter timeline',
  description: 'A twitter timeline',
  version: 1,
  controls: {
    type: 'autoform',
    schema: {
      properties: {
        screenName: {
          type: 'string',
          default: 'AlYankovic',
        },
        height: {
          type: 'number',
          default: 600,
        },
      },
      required: ['screenName'],
    },
  },
};

export default customContentPluginTwitter;
