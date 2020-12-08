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
            en: {
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
          id: '0sACer',
          size: 12,
          rows: [
            {
              id: 'loa2uC',
              cells: [
                {
                  id: 'ArrHF0',
                  size: 12,
                  plugin: { id: 'ory/editor/core/content/slate', version: 1 },
                  dataI18n: {
                    en: {
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
              id: 'gBBJOK',
              cells: [
                {
                  id: 'V6JM7k',
                  size: 7,
                  plugin: { id: 'ory/editor/core/content/slate', version: 1 },
                  dataI18n: {
                    en: {
                      slate: [
                        {
                          type: 'HEADINGS/HEADING-TWO',
                          children: [
                            { text: 'Batteries included - Key features' },
                          ],
                        },
                        {
                          type: 'LISTS/UNORDERED-LIST',
                          children: [
                            {
                              children: [
                                { text: 'powerful and customizable ' },
                                {
                                  text: 'RichText Editor',
                                  'EMPHASIZE/STRONG': true,
                                },
                              ],
                              type: 'LISTS/LIST-ITEM',
                            },
                            {
                              children: [
                                {
                                  text: '12-column grid responsive grid layout',
                                },
                              ],
                              type: 'LISTS/LIST-ITEM',
                            },
                            {
                              children: [{ text: 'Drag & Drop cells' }],
                              type: 'LISTS/LIST-ITEM',
                            },
                            {
                              children: [
                                {
                                  text: 'Undo & Redo, copy and hotkey support',
                                },
                              ],
                              type: 'LISTS/LIST-ITEM',
                            },
                            {
                              children: [{ text: 'Multi-Language support' }],
                              type: 'LISTS/LIST-ITEM',
                            },
                            {
                              children: [
                                { text: 'Add any custom Components you like' },
                              ],
                              type: 'LISTS/LIST-ITEM',
                            },
                          ],
                        },
                      ],
                    },
                  },
                  rows: [],
                  inline: null,
                },
                {
                  id: 'ZRjxpt',
                  size: 5,
                  plugin: { id: 'ory/editor/core/content/slate', version: 1 },
                  dataI18n: {
                    en: {
                      slate: [
                        {
                          type: 'PARAGRAPH/PARAGRAPH',
                          children: [{ text: '', 'EMPHASIZE/EM': true }],
                        },
                        {
                          type: 'PARAGRAPH/PARAGRAPH',
                          children: [
                            {
                              text:
                                'You can customize the rich text editor anyway you like.\nYou can even add formula editing capabilities:',
                              'EMPHASIZE/EM': true,
                            },
                          ],
                          data: { align: 'center' },
                        },
                        {
                          type: 'PARAGRAPH/PARAGRAPH',
                          children: [
                            { text: '' },
                            {
                              type: 'Katex',
                              children: [{ text: 'f(x) = x^2 ' }],
                              data: {},
                            },
                            { text: '' },
                          ],
                          data: { align: 'center' },
                        },
                        {
                          type: 'PARAGRAPH/PARAGRAPH',
                          children: [{ text: '' }],
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
              id: 'bNohHI',
              cells: [
                {
                  id: 'wHttGI',
                  size: 6,
                  plugin: { id: 'code-snippet', version: 1 },
                  dataI18n: {
                    en: {
                      language: 'tsx',
                      code:
                        "\nimport Editor from '@react-page/editor'\n\n// use ReactPage for editing Content\n<Editor\n    cellPlugins={yourCellPlugins}\n    value={theCurrentValue}\n    onChange={newValue => saveTheValue(newValue)}\n/>\n\n// or just for displaying content\n<Editor\n    cellPlugins={yourCellPlugins}\n    value={theCurrentValue}\n    readOnly={true}\n/>\n",
                    },
                  },
                  rows: [],
                  inline: null,
                },
                {
                  id: 'emqQYe',
                  size: 6,
                  plugin: { id: 'ory/editor/core/content/slate', version: 1 },
                  dataI18n: {
                    en: {
                      slate: [
                        {
                          type: 'HEADINGS/HEADING-TWO',
                          children: [{ text: "It's just a react component!" }],
                        },
                        {
                          children: [
                            { text: 'ReactPage', 'EMPHASIZE/STRONG': true },
                            {
                              text:
                                " has a simple API - it's basically just like a form field and can be included in any project. ",
                            },
                          ],
                        },
                        {
                          type: 'PARAGRAPH/PARAGRAPH',
                          children: [
                            { text: "Pass it's current " },
                            { text: 'value', 'CODE/CODE': true },
                            {
                              text:
                                ' that you might read from your datastore and update the value when ',
                            },
                            { text: 'onChange', 'CODE/CODE': true },
                            { text: ' is called. ' },
                            {
                              text: "It's that simple.",
                              'EMPHASIZE/STRONG': true,
                            },
                          ],
                        },
                        {
                          type: 'PARAGRAPH/PARAGRAPH',
                          children: [
                            { text: 'Set ' },
                            { text: 'readOnly={true}', 'CODE/CODE': true },
                            {
                              text:
                                ' whenever you want to display content without editing capabilities. ',
                            },
                            { text: 'ReactPage', 'EMPHASIZE/STRONG': true },
                            {
                              text:
                                ' will only load what is really required for displaying thanks to code splitting. This results in a ',
                            },
                            {
                              text: 'small bundle size.',
                              'EMPHASIZE/STRONG': true,
                            },
                            { text: ' ' },
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
          ],
          inline: null,
          dataI18n: null,
        },
      ],
    },
    {
      id: 'VxL3DU',
      cells: [
        {
          id: 'H9Gsrj',
          size: 12,
          plugin: { id: 'ory/editor/core/content/slate', version: 1 },
          dataI18n: {
            en: {
              slate: [
                {
                  type: 'HEADINGS/HEADING-TWO',
                  children: [{ text: 'Server Side Rendering out of the box' }],
                },
                {
                  type: 'PARAGRAPH/PARAGRAPH',
                  children: [
                    { text: 'ReactPage ', 'EMPHASIZE/STRONG': true },
                    {
                      text:
                        'is built with performance in mind. It can be used for ',
                    },
                    {
                      text: 'server side rendering (SSR)',
                      'EMPHASIZE/STRONG': true,
                    },
                    {
                      text:
                        ", which makes it not only a great tool for editing, but also for displaying. It's battle tested in nextjs, this example itself is created using nextjs and static page generation.",
                    },
                  ],
                },
                {
                  type: 'PARAGRAPH/PARAGRAPH',
                  children: [
                    { text: 'We try ' },
                    { text: 'minimize bundle size', 'EMPHASIZE/STRONG': true },
                    {
                      text:
                        ' as much as possible. Any UI solely used for editing is not loaded when in readOnly mode. ',
                    },
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
      id: 'KU6Qba',
      cells: [
        {
          id: 'kWAQtv',
          size: 6,
          rows: [
            {
              id: 'fwgBSe',
              cells: [
                {
                  id: 'wQVcBE',
                  size: 12,
                  plugin: { id: 'ory/editor/core/content/slate', version: 1 },
                  dataI18n: {
                    en: {
                      slate: [
                        {
                          type: 'HEADINGS/HEADING-TWO',
                          children: [{ text: 'Embraces Typescript' }],
                        },
                        {
                          type: 'LISTS/ORDERED-LIST',
                          children: [
                            {
                              children: [
                                {
                                  text:
                                    'ReactPage is written in modern typescript and enables developer that include ReactPage into their project with typesafety and peace of mind. Thanks to generics, you can give any CellPlugin the data type that you need.',
                                },
                              ],
                              type: 'LISTS/LIST-ITEM',
                            },
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
              id: 'qvnmOs',
              cells: [
                {
                  id: 'ALUwLB',
                  size: 12,
                  plugin: { id: 'twitter-timeline', version: 1 },
                  dataI18n: { en: { screenName: 'AlYankovic', height: 600 } },
                  rows: [],
                  inline: null,
                },
              ],
            },
          ],
          inline: null,
          dataI18n: null,
        },
        {
          id: 'zlxuAA',
          size: 6,
          plugin: { id: 'code-snippet', version: 1 },
          dataI18n: {
            en: {
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
};
