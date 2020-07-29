import HtmlToSlate from '../HtmlToSlate';
import * as defaultPlugins from '../plugins';
import makeSlatePluginsFromDef from '../utils/makeSlatePluginsFromDef';

const htmlToSlate = HtmlToSlate({
  plugins: makeSlatePluginsFromDef(defaultPlugins),
});

describe('HtmlToSlate', () => {
  [
    {
      html: '<h1>Projects</h1>',
      expected: {
        slate: [
          {
            type: 'HEADINGS/HEADING-ONE',
            children: [{ text: 'Projects' }],
          },
        ],
      },
    },

    {
      html: '<p>some projects</p>',
      expected: {
        slate: [
          {
            type: 'PARAGRAPH/PARAGRAPH',
            children: [{ text: 'some projects' }],
          },
        ],
      },
    },

    {
      html: '<p>some <em>projects</em>-<strong>foo</strong></p>',
      expected: {
        slate: [
          {
            children: [
              {
                text: 'some ',
              },
              {
                'EMPHASIZE/EM': true,
                text: 'projects',
              },
              { text: '-' },
              {
                'EMPHASIZE/STRONG': true,
                text: 'foo',
              },
            ],
            type: 'PARAGRAPH/PARAGRAPH',
          },
        ],
      },
    },

    {
      html: '<p>a<code style="white-space:pre-wrap">bc</code>de</p>',
      expected: {
        slate: [
          {
            type: 'PARAGRAPH/PARAGRAPH',
            children: [
              {
                text: 'a',
              },
              {
                text: 'bc',

                'CODE/CODE': true,
              },
              {
                text: 'de',
              },
            ],
          },
        ],
      },
    },

    {
      html: '<h4>a<a href="foo">asdf</a>b</h4>',
      expected: {
        slate: [
          {
            children: [
              { text: 'a' },
              {
                data: { href: 'foo', openInNewWindow: false },
                children: [{ text: 'asdf' }],
                type: 'LINK/LINK',
              },
              { text: 'b' },
            ],
            type: 'HEADINGS/HEADING-FOUR',
          },
        ],
      },
    },
    // skip: true

    {
      html: '<h3 style="text-align:center">asdfgh</h3>',
      expected: {
        slate: [
          {
            type: 'HEADINGS/HEADING-THREE',
            children: [
              {
                text: 'asdfgh',
              },
            ],

            data: {
              align: 'center',
            },
          },
        ],
      },
    },

    {
      html: '<blockquote style="text-align:center">asdfgh</blockquote>',
      expected: {
        slate: [
          {
            type: 'BLOCKQUOTE/BLOCKQUOTE',
            children: [
              {
                text: 'asdfgh',
              },
            ],

            data: {
              align: 'center',
            },
          },
        ],
      },
    },

    {
      html: '<p style="text-align:center">ab</p>',
      expected: {
        slate: [
          {
            type: 'PARAGRAPH/PARAGRAPH',
            children: [{ text: 'ab' }],
            data: {
              align: 'center',
            },
          },
        ],
      },
    },

    {
      html: '<blockquote>ab<br/>de</blockquote>',
      expected: {
        slate: [
          {
            type: 'BLOCKQUOTE/BLOCKQUOTE',
            children: [{ text: 'ab\nde' }],
          },
        ],
      },
    },
    {
      html: '<h1>Hello World</h1><p>Lorem ipsum</p>',
      expected: {
        slate: [
          {
            type: 'HEADINGS/HEADING-ONE',
            children: [{ text: 'Hello World' }],
          },
          {
            type: 'PARAGRAPH/PARAGRAPH',
            children: [{ text: 'Lorem ipsum' }],
          },
        ],
      },
    },
  ].forEach((c, k) => {
    describe(`test case ${k}`, () => {
      it(`should make slate state from html: ${c.html}`, () => {
        expect(htmlToSlate(c.html)).toEqual(c.expected);
      });
    });
  });
});
