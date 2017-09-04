import { Raw } from 'slate'
import { html } from './hooks'

describe('serialize to html', () => {
  ;[
    {
      i: {
        nodes: [
          {
            kind: 'block',
            type: 'HEADINGS/HEADING-ONE',
            nodes: [{ kind: 'text', text: 'Projects' }]
          }
        ]
      },
      o: '<h1>Projects</h1>'
    },
    {
      i: {
        nodes: [
          {
            kind: 'block',
            type: 'PARAGRAPH/PARAGRAPH',
            nodes: [{ kind: 'text', text: 'some projects' }]
          }
        ]
      },
      o: '<p>some projects</p>'
    },
    {
      i: {
        nodes: [
          {
            kind: 'block',
            nodes: [
              {
                kind: 'text',
                ranges: [
                  { text: 'some ' },
                  {
                    marks: [{ data: {}, type: 'EMPHASIZE/EM' }],
                    text: 'projects'
                  },
                  { text: '-' },
                  {
                    marks: [{ data: {}, type: 'EMPHASIZE/STRONG' }],
                    text: 'foo'
                  }
                ]
              }
            ],
            type: 'PARAGRAPH/PARAGRAPH'
          }
        ]
      },
      o: '<p>some <em>projects</em>-<strong>foo</strong></p>'
    },
    {
      i: {
        nodes: [
          {
            kind: 'block',
            type: 'CODE/CODE',
            nodes: [
              {
                kind: 'text',
                text: 'asdf'
              }
            ]
          }
        ]
      },
      o: '<pre style="overflow:scroll;"><code>asdf</code></pre>',
      // TODO this should not be skipped but it's a workaround for deserialization...
      skip: true
    },
    {
      i: {
        nodes: [
          {
            kind: 'block',
            type: 'PARAGRAPH/PARAGRAPH',
            nodes: [
              {
                kind: 'text',
                ranges: [
                  {
                    text: 'a'
                  },
                  {
                    text: 'bc',
                    marks: [
                      {
                        type: 'CODE/CODE'
                      }
                    ]
                  },
                  {
                    text: 'de'
                  }
                ]
              }
            ]
          }
        ]
      },
      o: '<p>a<code>bc</code>de</p>',
      skip: true
    },
    {
      i: {
        nodes: [
          {
            kind: 'block',
            nodes: [
              { kind: 'text', text: 'a' },
              {
                data: { href: 'foo' },
                kind: 'inline',
                nodes: [{ kind: 'text', text: 'asdf' }],
                type: 'LINK/LINK'
              },
              { kind: 'text', text: 'b' }
            ],
            type: 'HEADINGS/HEADING-FOUR'
          }
        ]
      },
      o: '<h4>a<a href="foo">asdf</a>b</h4>'
      // skip: true
    },
    {
      i: {
        nodes: [
          {
            kind: 'block',
            type: 'HEADINGS/HEADING-THREE',
            nodes: [
              {
                kind: 'text',
                text: 'asdfgh'
              }
            ],
            data: {
              align: 'center'
            }
          }
        ]
      },
      o: '<h3 style="text-align:center;">asdfgh</h3>',
      skip: true
    },
    {
      i: {
        nodes: [
          {
            kind: 'block',
            type: 'BLOCKQUOTE/BLOCKQUOTE',
            nodes: [
              {
                kind: 'text',
                text: 'asdfgh'
              }
            ],
            data: {
              align: 'center'
            }
          }
        ]
      },
      o: '<blockquote style="text-align:center;">asdfgh</blockquote>',
      skip: true
    },
    {
      i: {
        nodes: [
          {
            kind: 'block',
            type: 'PARAGRAPH/PARAGRAPH',
            nodes: [{ kind: 'text', text: 'ab' }],
            data: { align: 'center' }
          }
        ]
      },
      o: '<p style="text-align:center;">ab</p>',
      skip: true
    },
    {
      i: {
        nodes: [
          {
            kind: 'block',
            type: 'BLOCKQUOTE/BLOCKQUOTE',
            nodes: [{ kind: 'text', text: 'ab\nde' }]
          }
        ]
      },
      o: '<blockquote>ab<br/>de</blockquote>'
      // skip: true
    }
  ].forEach((c, k) => {
    describe(`test case ${k}`, () => {
      it('should serialize properly', () => {
        expect(html.serialize(Raw.deserialize(c.i, { terse: true }))).toEqual(
          c.o
        )
      })
      it(`should deserialize properly: ${c.o}`, () => {
        if (c.skip) {
          return
        }
        expect(Raw.serialize(html.deserialize(c.o))).toEqual(
          Raw.serialize(Raw.deserialize(c.i, { terse: true }))
        )
      })
    })
  })
})
