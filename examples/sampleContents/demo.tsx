import twitterCode from '!!raw-loader!../plugins/customContentPluginTwitter.tsx';
import { Value } from '@react-page/editor';
export const demo: Value = {
  id: '2390df1a-7e62-433f-b315-8de2d699081f',
  version: 1,
  rows: [
    {
      id: '4c7d90d8-6177-484b-9cec-25dcaf5e5fab',
      cells: [
        {
          id: '95d67837-4e03-4048-8234-320d569e7e0c',
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
      id: '31d7bd99-3a0e-4459-af87-68c5804be905',
      cells: [
        {
          id: 'cf19f425-c27d-49ac-a300-86af93f3e66a',
          size: 12,
          rows: [
            {
              id: '200f9e78-44de-400f-a37a-c45a0eb67b61',
              cells: [
                {
                  id: '000e18af-40ca-42da-87f0-4714b5c7c4fe',
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
              id: 'e49ddacc-8e57-43d9-93f4-b67210ca71f8',
              cells: [
                {
                  id: '061e0ab1-3e90-4935-8e21-7d831690975d',
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
      id: '7c9d6d16-8ee6-41d9-a0a2-711e09f2eacf',
      cells: [
        {
          id: 'b9bcb0c1-e7fb-4368-a300-590871e5ffd6',
          size: 6,
          plugin: { id: 'twitter-timeline', version: 1 },
          dataI18n: { undefined: { screenName: 'AlYankovic' } },
          rows: [],
          inline: null,
        },
        {
          id: 'c90cf57b-8855-49d8-9580-29e72558200e',
          size: 6,
          rows: [
            {
              id: '49a8acbc-2670-4ebe-ae5e-876e4c924486',
              cells: [
                {
                  id: '54c1539a-aa91-47df-b9ab-c21055c0a6e5',
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
              id: '7d393a9e-57c9-43f6-9fb4-6feec7d7edb9',
              cells: [
                {
                  id: '0e0c7334-8b98-40be-bbdf-c6b92ad45092',
                  size: 12,
                  plugin: { id: 'code-snippet', version: 1 },
                  dataI18n: {
                    undefined: {
                      language: 'tsx',
                      code: twitterCode,
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
