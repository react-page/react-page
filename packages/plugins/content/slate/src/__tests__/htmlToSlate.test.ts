import { HtmlToSlate } from '../htmlToSlate';
import defaultPlugins from '../plugins';
import makeSlatePluginsFromDef from '../utils/makeSlatePluginsFromDef';
const htmlToSlate = HtmlToSlate({
  plugins: makeSlatePluginsFromDef(defaultPlugins),
});
describe('HtmlToSlate', () => {
  it('parses h1 tags', async () => {
    expect(await htmlToSlate('<h1>Projects</h1>')).toEqual({
      slate: [
        {
          type: 'HEADINGS/HEADING-ONE',
          children: [{ text: 'Projects' }],
        },
      ],
    });
  });
  it('parses p tags', async () => {
    expect(await htmlToSlate('<p>some projects</p>')).toEqual({
      slate: [
        {
          type: 'PARAGRAPH/PARAGRAPH',
          children: [{ text: 'some projects' }],
        },
      ],
    });
  });
  it('parses a list of tags to an array', async () => {
    expect(await htmlToSlate('<h1>Hello World</h1><p>Lorem ipsum</p>')).toEqual(
      {
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
      }
    );
  });
  it('parses nested tags with headin', async () => {
    expect(
      await htmlToSlate('<p>some <em>projects</em>-<strong>foo</strong></p>')
    ).toEqual({
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
    });
  });
  it('parses code blocks', async () => {
    expect(
      await htmlToSlate(
        '<p>a<code style="white-space:pre-wrap">bc</code>de</p>'
      )
    ).toEqual({
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
    });
  });
  it('can parse links', async () => {
    expect(await htmlToSlate('<h4>a<a href="foo">asdf</a>b</h4>')).toEqual({
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
    });
  });
  it('parses text align on headings', async () => {
    expect(
      await htmlToSlate('<h3 style="text-align:center">asdfgh</h3>')
    ).toEqual({
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
    });
  });
  it('parses text align on paragraphs', async () => {
    expect(await htmlToSlate('<p style="text-align:center">ab</p>')).toEqual({
      slate: [
        {
          type: 'PARAGRAPH/PARAGRAPH',
          children: [{ text: 'ab' }],
          data: {
            align: 'center',
          },
        },
      ],
    });
  });
  it('parses blockquote', async () => {
    expect(
      await htmlToSlate(
        '<blockquote style="text-align:center">asdfgh</blockquote>'
      )
    ).toEqual({
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
    });
  });
});
