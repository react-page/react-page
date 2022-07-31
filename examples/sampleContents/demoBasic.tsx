import type { Value } from '@react-page/editor';
export const demo: Value = {
  id: '2390df',
  version: 1,
  rows: [
    {
      id: '4c7d90',
      cells: [
        {
          id: '95d678',
          size: 5,
          plugin: { id: 'ory/editor/core/content/slate', version: 1 },
          dataI18n: {
            en: {
              slate: [
                // {
                //   children: [{ text: 'Next Level Content Editing' }],
                //   type: 'HEADINGS/HEADING-TWO',
                //   data: { align: 'center' },
                // },
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
        {
          id: '95d679',
          size: 7,
          plugin: { id: 'ory/editor/core/content/image', version: 1 },
          dataI18n: {
            en: { src: 'https://www.gatsbyjs.cn/Gatsby-Logo.svg' },
          },
          rows: [],
          inline: null,
        },
      ],
    },
  ],
};
