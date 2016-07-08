/* eslint-env mocha */
import unexpected from 'unexpected'
import { computeDropLevels } from './level'

const expect = unexpected.clone()

describe('computeDropLevels', () => {
  [{
    in: {
      cells: [{
        rows: [{
          cells: [{}, {}]
        }]
      }]
    },
    e: {
      cells: [{
        levels: { left: 0, right: 0, above: 0, below: 0 },
        rows: [{
          levels: { left: 1, right: 1, above: 1, below: 1 },
          cells: [{
            levels: { left: 2, right: 0, above: 2, below: 2 }
          }, {
            levels: { left: 0, right: 2, above: 2, below: 2 }
          }]
        }]
      }]
    }
  }, {
    in: {
      cells: [{
        rows: [{
          cells: [{
            rows: [{
              cells: [{}, {}]
            }]
          }, {
            rows: [{
              cells: [{}, {}]
            }]
          }, {
            rows: [{
              cells: [{}, {}]
            }]
          }]
        }, {
          cells: [{}, {
            rows: [{
              cells: [{}, {}]
            }]
          }, {}]
        }, {
          cells: [{}, {}, {
            rows: [{
              cells: [{}, {}]
            }]
          }]
        }]
      }]
    },
    e: {
      cells: [{
        levels: { left: 0, right: 0, above: 0, below: 0 },

        rows: [{
          levels: { left: 1, right: 1, above: 1, below: 0 },

          cells: [{
            levels: { left: 2, right: 0, above: 2, below: 0 },

            rows: [{
              levels: { left: 3, right: 1, above: 3, below: 0 },
              cells: [{}, {}]
            }]

          }, {
            levels: { left: 0, right: 0, above: 2, below: 0 },
            rows: [{
              cells: [{}, {}]
            }]
          }, {
            levels: { left: 0, right: 2, above: 2, below: 0 },
            rows: [{
              cells: [{}, {}]
            }]
          }]

        }, {
          levels: { left: 1, right: 1, above: 0, below: 0 },

          cells: [{}, {
            rows: [{
              cells: [{}, {}]
            }]
          }, {}]

        }, {
          levels: { left: 1, right: 1, above: 0, below: 1 },

          cells: [{}, {}, {
            rows: [{
              cells: [{}, {}]
            }]
          }]

        }]
      }]
    }
  }].forEach((c, k) => {
    it(`should pass test case ${k}`, () => {
      const out = c.in.cells.map((c) => computeDropLevels(c))
      expect(out, 'to equal', c.e.cells)
    })
  })
})
