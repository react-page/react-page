import { createLayoutPlugin } from '@react-page/create-plugin-materialui';
import React from 'react';
import { v4 } from 'uuid';

const createInitialChildren = ({ defaultPlugin }: any) => ({
  id: v4(),
  rows: [
    {
      id: v4(),
      cells: [
        {
          content: defaultPlugin
            ? {
                plugin: defaultPlugin,
                state: defaultPlugin.createInitialState(),
              }
            : null,
          id: v4(),
        },
      ],
    },
  ],
});

export default (settings: any) =>
  createLayoutPlugin({
    ...settings,
    Renderer: ({ children, state }: any) => (
      <div style={{ backgroundColor: state.backgroundColor }}>{children}</div>
    ),
    createInitialChildren: () =>
      createInitialChildren({
        defaultPlugin: settings.defaultPlugin,
      }),
    name: 'custom-layout-plugin',
    text: 'Custom layout plugin',
    description: 'Some custom layout plugin',
    version: '0.0.1',
    schema: {
      properties: {
        backgroundColor: { type: 'string' },
      },
    },
  });
