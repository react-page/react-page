import { Raw, Html } from 'slate'
import { defaultPlugins } from './index'

const html = new Html({ rules: defaultPlugins })

describe('serialize to html', () => {
  [
    {
      i: {
        nodes: [
          {
            kind: 'block',
            type: 'HEADINGS/HEADING-ONE',
            nodes: [{ kind: 'text', text: 'Projects' }
            ]
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
            type: 'PARAGRAPH/PARAGRAPH', nodes: [{ kind: 'text', text: 'some projects' }]
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
            type: 'CODE/CODE',
            nodes: [
              {
                kind: 'text',
                text: 'asdf'
              }
            ]
          },
        ]
      },
      o: '<pre>asdf</pre>'
    },
    {
      i: {
        nodes: [{
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
        },
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
            type: 'HEADINGS/HEADING-FOUR',
            nodes: [
              {
                kind: 'inline',
                type: 'LINK/LINK',
                nodes: [
                  {
                    kind: 'text',
                    text: 'asdf'
                  }
                ],
                data: {
                  href: 'foo'
                }
              }
            ]
          },
        ]
      },
      o: '<h4><a href="foo">asdf</a></h4>',
      skip: true
    },
    {
      i: {
        nodes: [
          {
            kind: 'block',
            type: 'PARAGRAPH/PARAGRAPH', nodes: [{ kind: 'text', text: 'ab' }], data: { align: 'center' }
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
      o: '<blockquote>ab<br/>de</blockquote>',
      skip: true
    },
  ].forEach((c, k) => {
    describe(`test case ${k}`, () => {
      it('should serialize properly', () => {
        expect(html.serialize(Raw.deserialize(c.i, { terse: true }))).toEqual(c.o)
      })
      it(`should deserialize properly: ${c.o}`, () => {
        if (c.skip) {
          return
        }
        expect(Raw.serialize(html.deserialize(html.serialize(Raw.deserialize(c.i, { terse: true }))), { terse: true })).toEqual(c.i)
      })
    })
  })
})
