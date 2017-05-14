import unexpected from 'unexpected'

import { computeDropLevels } from './level'

const expect = unexpected.clone()

describe('computeDropLevels', () => {
  ;[
    {
      in: {
        cells: [
          {
            rows: [
              {
                cells: [{}, {}]
              }
            ]
          }
        ]
      },
      e: {
        cells: [
          {
            levels: { left: 0, right: 0, above: 0, below: 0 },
            rows: [
              {
                levels: { left: 1, right: 1, above: 1, below: 1 },
                cells: [
                  {
                    levels: { left: 2, right: 0, above: 2, below: 2 }
                  },
                  {
                    levels: { left: 0, right: 2, above: 2, below: 2 }
                  }
                ]
              }
            ]
          }
        ]
      }
    },
    {
      in: {
        cells: [
          {
            rows: [
              {
                cells: [
                  {
                    rows: [
                      {
                        cells: [{}, {}]
                      }
                    ]
                  },
                  {
                    rows: [
                      {
                        cells: [{}, {}]
                      }
                    ]
                  },
                  {
                    rows: [
                      {
                        cells: [{}, {}]
                      }
                    ]
                  }
                ]
              },
              {
                cells: [
                  {},
                  {
                    rows: [
                      {
                        cells: [{}, {}]
                      }
                    ]
                  }
                ]
              }
            ]
          }
        ]
      },
      e: {
        cells: [
          {
            levels: { left: 0, right: 0, above: 0, below: 0 },

            rows: [
              {
                levels: { left: 1, right: 1, above: 1, below: 0 },
                cells: [
                  {
                    levels: { left: 2, right: 0, above: 2, below: 1 },
                    rows: [
                      {
                        levels: { left: 3, right: 1, above: 3, below: 2 },
                        cells: [
                          {
                            levels: { left: 4, right: 0, above: 4, below: 3 }
                          },
                          {
                            levels: { left: 0, right: 2, above: 4, below: 3 }
                          }
                        ]
                      }
                    ]
                  },
                  {
                    levels: { left: 0, right: 0, above: 2, below: 1 },
                    rows: [
                      {
                        levels: { left: 1, right: 1, above: 3, below: 2 },
                        cells: [
                          {
                            levels: { left: 2, right: 0, above: 4, below: 3 }
                          },
                          {
                            levels: { left: 0, right: 2, above: 4, below: 3 }
                          }
                        ]
                      }
                    ]
                  },
                  {
                    levels: { left: 0, right: 2, above: 2, below: 1 },
                    rows: [
                      {
                        levels: { left: 1, right: 3, above: 3, below: 2 },
                        cells: [
                          {
                            levels: { left: 2, right: 0, above: 4, below: 3 }
                          },
                          {
                            levels: { left: 0, right: 4, above: 4, below: 3 }
                          }
                        ]
                      }
                    ]
                  }
                ]
              },
              {
                levels: { left: 1, right: 1, above: 0, below: 1 },
                cells: [
                  {
                    levels: { left: 2, right: 0, above: 1, below: 2 }
                  },
                  {
                    levels: { left: 0, right: 2, above: 1, below: 2 },
                    rows: [
                      {
                        levels: { left: 1, right: 3, above: 2, below: 3 },
                        cells: [
                          {
                            levels: { left: 2, right: 0, above: 3, below: 4 }
                          },
                          {
                            levels: { left: 0, right: 4, above: 3, below: 4 }
                          }
                        ]
                      }
                    ]
                  }
                ]
              }
            ]
          }
        ]
      }
    }
  ].forEach((c, k) => {
    it(`should pass test case ${k}`, () => {
      const out = c.in.cells.map(c => computeDropLevels(c))
      expect(out, 'to equal', c.e.cells)
    })
  })
})
