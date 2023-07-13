import type { CellPlugin } from '@react-page/editor';
import React from 'react';
import { defaultSlate, customizedSlate } from './slate';

const customLayoutPluginWithInitialState: CellPlugin<{
  backgroundColor: string;
}> = {
  id: 'custom-layout-plugin-initial-state',
  title: 'Custom layout plugin with initial text',
  description: 'Some custom layout plugin with initial text',
  version: 1,
  Renderer: ({ children, data }) => (
    <div
      style={{
        border: '1px solid black',
        padding: 50,
        backgroundColor: data.backgroundColor,
      }}
    >
      {children}
    </div>
  ),
  controls: {
    type: 'autoform',
    schema: {
      required: ['backgroundColor'],
      properties: {
        backgroundColor: { type: 'string' },
      },
    },
  },

  createInitialData: () => ({
    backgroundColor: '#ffeeaa',
  }),
  createInitialChildren: () => {
    return [
      [
        {
          plugin: customizedSlate,
          data: customizedSlate.createData(({ plugins }) => ({
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
        {
          plugin: defaultSlate,
          data: defaultSlate.createData(({ plugins }) => ({
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
      ],
      [
        {
          plugin: customizedSlate,
          data: customizedSlate.createData(({ plugins }) => ({
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
      ],
    ];
  },
};

export default customLayoutPluginWithInitialState;
