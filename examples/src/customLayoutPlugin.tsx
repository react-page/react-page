import { createLayoutPlugin } from '@react-page/create-plugin-materialui';
import React from 'react';
import { defaultSlate, customizedSlate } from './slate';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default () =>
  createLayoutPlugin<{
    backgroundColor: string;
  }>({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    Renderer: ({ children, state }: any) => (
      <div
        style={{
          border: '1px solid black',
          backgroundColor: state.backgroundColor,
        }}
      >
        {children}
      </div>
    ),
    createInitialChildren: () => {
      return [
        [
          {
            plugin: defaultSlate,
          },
          {
            plugin: defaultSlate,
          },
        ],
        [
          {
            plugin: customizedSlate,
          },
          {
            plugin: customizedSlate,
          },
        ],
      ];
    },

    id: 'custom-layout-plugin',
    title: 'Custom layout plugin',
    description: 'Some custom layout plugin',
    version: 1,
    schema: {
      required: ['backgroundColor'],
      properties: {
        backgroundColor: { type: 'string' },
      },
    },
  })();
