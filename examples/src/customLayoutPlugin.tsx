import { createLayoutPlugin } from '@react-page/create-plugin-materialui';
import React from 'react';
import slate from '@react-page/plugins-slate';

// tslint:disable-next-line:no-any
export default () =>
  createLayoutPlugin({
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
            content: { plugin: slate() },
          },
          {
            content: { plugin: slate() },
          },
        ],
        [
          {
            content: {
              plugin: slate(def => ({
                ...def,
                createInitialSlateState: () => ({
                  children: [
                    {
                      plugin: def.plugins.headings.h1,
                      children: ['Hello World'],
                    },
                    {
                      plugin: def.plugins.paragraphs.paragraph,
                      children: [
                        'You can create slate plugins with initial state like this',
                      ],
                    },
                  ],
                }),
              })),
            },
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
