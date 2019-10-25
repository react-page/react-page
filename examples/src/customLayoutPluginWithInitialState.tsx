import { createLayoutPlugin } from '@react-page/create-plugin-materialui';
import React from 'react';
import slate from '@react-page/plugins-slate';

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
            content: {
              plugin: slate(def => ({
                ...def,
                createInitialSlateState: () => ({
                  children: [
                    {
                      // you can use the plugin-function itself here
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
          {
            content: {
              plugin: slate(def => ({
                ...def,
                createInitialSlateState: () => ({
                  children: [
                    {
                      plugin: def.plugins.headings.h1,
                      children: ['A default list'],
                    },
                    {
                      plugin: def.plugins.lists.ul,
                      children: [
                        {
                          plugin: def.plugins.lists.li,
                          children: [
                            {
                              plugin: def.plugins.paragraphs.paragraph,
                              children: ['one'],
                            },
                          ],
                        },
                        {
                          plugin: def.plugins.lists.li,
                          children: [
                            {
                              plugin: def.plugins.paragraphs.paragraph,
                              children: ['two'],
                            },
                          ],
                        },
                        {
                          plugin: def.plugins.lists.li,
                          children: [
                            {
                              plugin: def.plugins.paragraphs.paragraph,
                              children: ['three'],
                            },
                          ],
                        },
                      ],
                    },
                  ],
                }),
              })),
            },
          },
        ],
        [
          {
            content: {
              plugin: slate(def => ({
                ...def,
                plugins: {
                  paragraphs: def.plugins.paragraphs,
                  headings: {
                    h3: def.plugins.headings.h3,
                  },
                  emphasize: def.plugins.emphasize,
                },
                createInitialSlateState: () => ({
                  children: [
                    {
                      plugin: def.plugins.headings.h3,
                      children: ['you can also restrict slate plugins in here'],
                    },
                    {
                      plugin: def.plugins.paragraphs.paragraph,
                      children: [
                        'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. ',
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

    name: 'custom-layout-plugin-initial-state',
    text: 'Custom layout plugin with initial text',
    description: 'Some custom layout plugin with initial text',
    version: '0.0.1',
    schema: {
      required: ['backgroundColor'],
      properties: {
        backgroundColor: { type: 'string' },
      },
    },
  })();
