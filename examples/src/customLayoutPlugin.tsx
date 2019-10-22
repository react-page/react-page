import { createLayoutPlugin } from '@react-page/create-plugin-materialui';
import React from 'react';

// tslint:disable-next-line:no-any
export default (settings: any) =>
  createLayoutPlugin({
    ...settings,
    // tslint:disable-next-line:no-any
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
            content: { plugin: settings.defaultPlugin },
          },
          {
            content: { plugin: settings.defaultPlugin },
          },
        ],
        [
          {
            content: { plugin: settings.defaultPlugin },
          },
          {
            content: { plugin: settings.defaultPlugin },
          },
        ],
      ];
    },

    name: 'custom-layout-plugin',
    text: 'Custom layout plugin',
    description: 'Some custom layout plugin',
    version: '0.0.1',
    schema: {
      properties: {
        backgroundColor: { type: 'string' },
      },
    },
  })();
