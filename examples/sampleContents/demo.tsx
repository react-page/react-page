import { Value } from '@react-page/editor';
export const demo: Value = {
  id: '2390df',
  version: 1,
  rows: [
    {
      id: '4c7d90',
      cells: [
        {
          id: '95d678',
          size: 12,
          plugin: { id: 'ory/editor/core/content/slate', version: 1 },
          dataI18n: {
            undefined: {
              slate: [
                {
                  children: [{ text: 'Next Level Content Editing' }],
                  type: 'HEADINGS/HEADING-TWO',
                  data: { align: 'center' },
                },
                {
                  children: [{ text: 'ReactPage' }],
                  type: 'HEADINGS/HEADING-ONE',
                  data: { align: 'center' },
                },
              ],
            },
          },
          rows: [],
          inline: null,
        },
      ],
    },
    {
      id: '31d7bd',
      cells: [
        {
          id: 'cf19f4',
          size: 12,
          rows: [
            {
              id: '200f9e',
              cells: [
                {
                  id: '000e18',
                  size: 12,
                  plugin: { id: 'ory/editor/core/content/slate', version: 1 },
                  dataI18n: {
                    undefined: {
                      slate: [
                        {
                          type: 'PARAGRAPH/PARAGRAPH',
                          children: [
                            { text: 'ReactPage', 'EMPHASIZE/STRONG': true },
                            {
                              text:
                                ' is a next level content editor for react.',
                            },
                          ],
                        },
                        {
                          type: 'PARAGRAPH/PARAGRAPH',
                          children: [
                            { text: 'It enables ' },
                            {
                              text: 'webmasters and content editors ',
                              'EMPHASIZE/EM': true,
                              'EMPHASIZE/STRONG': true,
                            },
                            {
                              text: 'to create the content they want with the ',
                            },
                            { text: '<Components />', 'CODE/CODE': true },
                            { text: ' you provide as a developer.' },
                          ],
                        },
                      ],
                    },
                  },
                  rows: [],
                  inline: null,
                },
              ],
            },
            {
              id: 'e49dda',
              cells: [
                {
                  id: '061e0a',
                  size: 12,
                  plugin: { id: 'ory/editor/core/content/slate', version: 1 },
                  dataI18n: {
                    undefined: {
                      slate: [
                        {
                          type: 'HEADINGS/HEADING-TWO',
                          children: [{ text: 'It can be anything...' }],
                          data: { align: 'center' },
                        },
                      ],
                    },
                  },
                  rows: [],
                  inline: null,
                },
              ],
            },
          ],
          inline: null,
          dataI18n: null,
        },
      ],
    },
    {
      id: '7c9d6d',
      cells: [
        {
          id: 'b9bcb0',
          size: 6,
          plugin: { id: 'twitter-timeline', version: 1 },
          dataI18n: { undefined: { screenName: 'AlYankovic' } },
          rows: [],
          inline: null,
        },
        {
          id: 'c90cf5',
          size: 6,
          rows: [
            {
              id: '49a8ac',
              cells: [
                {
                  id: '54c153',
                  size: 12,
                  plugin: { id: 'ory/editor/core/content/slate', version: 1 },
                  dataI18n: {
                    undefined: {
                      slate: [
                        {
                          type: 'PARAGRAPH/PARAGRAPH',
                          children: [
                            {
                              text:
                                "Webmasters wish to add twitter feeds? Let's create a twitter ",
                            },
                            { text: 'Plugin!', 'CODE/CODE': true },
                          ],
                        },
                      ],
                    },
                  },
                  rows: [],
                  inline: null,
                },
              ],
            },
            {
              id: '7d393a',
              cells: [
                {
                  id: '0e0c73',
                  size: 12,
                  plugin: { id: 'code-snippet', version: 1 },
                  dataI18n: {
                    undefined: {
                      language: 'tsx',
                      code: require('!!raw-loader!../plugins/customContentPluginTwitter.tsx')
                        .default,
                    },
                  },
                  rows: [],
                  inline: null,
                },
              ],
            },
          ],
          inline: null,
          dataI18n: null,
        },
      ],
    },
  ],
};
