import unexpected from 'unexpected'

import { isEmpty, emptyFilter } from './empty'

const expect = unexpected.clone()

describe('isEmpty', () => {
  ;[
    {
      in: {
        cells: []
      },
      empty: true
    },
    {
      in: {
        cells: [
          {
            rows: [
              { cells: [{ rows: [{ cells: [{ rows: [{ cells: [] }] }] }] }] }
            ]
          },
          { rows: [{ cells: [] }] },
          { rows: [{ cells: [{ rows: [{ cells: [] }] }] }] }
        ]
      },
      empty: true
    },
    {
      in: {
        rows: [
          {
            cells: [
              {
                rows: [
                  {
                    cells: [{ rows: [{ cells: [{ rows: [{ cells: [] }] }] }] }]
                  }
                ]
              },
              { rows: [{ cells: [] }] },
              { rows: [{ cells: [{ rows: [{ cells: [{}, {}, {}] }] }] }] }
            ]
          },
          {
            cells: []
          }
        ]
      },
      empty: true
    },
    {
      in: {
        rows: [
          {
            cells: [
              {
                rows: [
                  {
                    cells: [{ rows: [{ cells: [{ rows: [{ cells: [] }] }] }] }]
                  }
                ]
              },
              { rows: [{ cells: [] }] },
              {
                rows: [
                  {
                    cells: [
                      {
                        rows: [
                          { cells: [{ content: { plugin: { name: 'asdf' } } }] }
                        ]
                      }
                    ]
                  }
                ]
              }
            ]
          },
          {
            cells: []
          }
        ]
      },
      empty: false
    },
    {
      in: {
        rows: [
          {
            cells: [
              {
                rows: [
                  {
                    cells: [{ rows: [{ cells: [{ rows: [{ cells: [] }] }] }] }]
                  }
                ]
              },
              { rows: [{ cells: [] }] },
              { rows: [{ cells: [{ rows: [{ cells: [{}] }] }] }] },
              { content: { plugin: { name: 'asdf' } } }
            ]
          },
          {
            cells: []
          }
        ]
      },
      empty: false
    },
    {
      in: {
        rows: [
          {
            cells: [
              {
                rows: [
                  {
                    cells: [{ rows: [{ cells: [{ rows: [{ cells: [] }] }] }] }]
                  }
                ]
              },
              { rows: [{ cells: [] }] },
              { rows: [{ cells: [{ rows: [{ cells: [{}] }] }] }] },
              {
                layout: { plugin: { name: 'asdf' } },
                rows: [{ cells: [{ content: { plugin: { name: 'asdf' } } }] }]
              }
            ]
          },
          {
            cells: []
          }
        ]
      },
      empty: false
    }
  ].forEach((c, k) => {
    it(`should pass test case ${k}`, () => {
      expect(isEmpty(c.in), 'to equal', c.empty)
      expect(
        (c.in.rows || c.in.cells).filter(emptyFilter).length,
        'to equal',
        c.empty ? 0 : 1
      )
    })
  })
})
