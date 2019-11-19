import { createLayoutPlugin } from '@react-page/create-plugin-materialui';
import React from 'react';
import { defaultSlate, reducedSlate } from './slate';

// tslint:disable-next-line:no-any
export default () =>
  createLayoutPlugin<{
    backgroundColor: string;
  }>({
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
            content: { plugin: defaultSlate },
          },
          {
            content: { plugin: defaultSlate },
          },
        ],
        [
          {
            content: { plugin: reducedSlate },
          },
          {
            content: { plugin: reducedSlate },
          },
        ],
      ];
    },

    name: 'custom-layout-plugin',
    text: 'Custom layout plugin',
    description: 'Some custom layout plugin',
    version: '0.0.1',
    schema: {
      required: ['backgroundColor'],
      properties: {
        backgroundColor: { type: 'string' },
      },
    },
  })();
