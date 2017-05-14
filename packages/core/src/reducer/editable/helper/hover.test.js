import unexpected from 'unexpected'

import { isHoveringThis } from './hover'

const expect = unexpected.clone()

// FIXME: this should be done differently
describe('isHoveringThis', () => {
  ;[
    {
      in: {
        cells: [
          {
            rows: [
              {
                cells: [
                  {
                    h: true,
                    id: '1',
                    plugin: 'foo'
                  }
                ]
              }
            ]
          },
          {
            rows: [{ cells: [{ plugin: 'bar' }] }]
          }
        ]
      },
      action: {
        hover: '1'
      }
    },
    {
      in: {
        cells: [
          {
            rows: [
              {
                h: true,
                cells: [
                  {
                    id: '1',
                    plugin: 'foo'
                  }
                ]
              }
            ]
          },
          {
            rows: [{ cells: [{ plugin: 'bar' }] }]
          }
        ]
      },
      action: {
        hover: '1',
        level: 1
      }
    },

    {
      in: {
        rows: [
          {
            cells: [{ rows: [{ cells: [{ plugin: 'bar' }] }] }]
          },
          {
            h: true,
            cells: [
              {
                rows: [
                  {
                    cells: [
                      {
                        id: '1',
                        plugin: 'foo'
                      }
                    ]
                  }
                ]
              }
            ]
          }
        ]
      },
      action: {
        hover: '1',
        level: 3
      }
    }
  ].forEach((c, k) => {
    const runner = level => props =>
      describe('isHoveringThis', () => {
        it(`case ${k} should pass level ${level}`, () => {
          const { cells = [], rows = [], h = false } = props
          expect(isHoveringThis(props, c.action), 'to equal', h)
          rows.map(runner(level + 1))
          cells.map(runner(level + 1))
        })
      })
    runner(0)(c.in)
  })
})
