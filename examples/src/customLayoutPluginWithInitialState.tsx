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
            content: {
              plugin: customizedSlate,
              state: customizedSlate.createInitialSlateState(({ plugins }) => ({
                children: [
                  {
                    plugin: plugins.headings.h3,
                    children: ['Hello world'],
                  },
                  {
                    plugin: plugins.paragraphs.paragraph,
                    children: ['Title and paragraph'],
                  },
                ],
              })),
            },
          },
          {
            content: {
              plugin: defaultSlate,
              state: defaultSlate.createInitialSlateState(({ plugins }) => ({
                children: [
                  {
                    plugin: plugins.headings.h1,
                    children: ['A default list'],
                  },
                  {
                    plugin: plugins.lists.ul,
                    children: [
                      {
                        plugin: plugins.lists.li,
                        children: [
                          {
                            plugin: plugins.paragraphs.paragraph,
                            children: ['one'],
                          },
                        ],
                      },
                      {
                        plugin: plugins.lists.li,
                        children: [
                          {
                            plugin: plugins.paragraphs.paragraph,
                            children: ['two'],
                          },
                        ],
                      },
                      {
                        plugin: plugins.lists.li,
                        children: [
                          {
                            plugin: plugins.paragraphs.paragraph,
                            children: ['three'],
                          },
                        ],
                      },
                    ],
                  },
                ],
              })),
            },
          },
        ],
        [
          {
            content: {
              plugin: customizedSlate,
              state: customizedSlate.createInitialSlateState(({ plugins }) => ({
                children: [
                  {
                    plugin: plugins.headings.h2,
                    children: ['Hello world'],
                    data: {
                      align: 'center',
                    },
                  },

                  {
                    plugin: plugins.paragraphs.paragraph,
                    children: ['Another entry'],
                    data: {
                      align: 'center',
                    },
                  },
                  {
                    plugin: plugins.headings.h4,
                    children: [
                      'This is a custom slate component with additional html elements',
                    ],
                  },
                  {
                    plugin: plugins.paragraphs.paragraph,
                    children: [
                      'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. ',
                    ],
                    data: {
                      align: 'center',
                    },
                  },
                ],
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
