import type { CellPlugin } from '@react-page/editor';
import React from 'react';
import { Timeline } from 'react-twitter-widgets';

type Data = {
  screenName: string;
  height: number;
  title: string;
};
// you can pass the shape of the data as the generic type argument
const customContentPluginTwitter: CellPlugin<Data> = {
  Renderer: ({ data }) => (
    <div>
      <h4>{data.title}</h4>
      <Timeline
        dataSource={{
          sourceType: 'profile',
          // data has already the right type!
          screenName: data.screenName,
        }}
        options={{
          height: data.height || 600,
        }}
      />
    </div>
  ),
  id: 'twitter-timeline',
  title: 'Twitter timeline',
  description: 'A twitter timeline',
  version: 1,
  controls: {
    type: 'autoform',
    schema: {
      // this JSONschema is type checked against the generic type argument
      // the autocompletion of your IDE helps to create this schema
      properties: {
        title: {
          type: 'string',
          default: 'A Sample Twitter plugin',
        },
        screenName: {
          type: 'string',
          default: 'typescript',
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
