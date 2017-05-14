import unexpected from 'unexpected'

import {
  sumSizes,
  computeBounds,
  resizeCells,
  computeResizeable
} from './sizing'

const expect = unexpected.clone()

describe('computeResizeable', () => {
  ;[
    {
      cells: [{}],
      e: [{ resizable: false }]
    },
    {
      cells: [{}, {}, {}],
      e: [{ resizable: true }, { resizable: true }, { resizable: false }]
    }
  ].forEach((c, k) => {
    it(`should pass test case ${k}`, () => {
      expect(computeResizeable(c.cells), 'to equal', c.e)
    })
  })
})

describe('sumSizes', () => {
  ;[
    {
      cells: [{ size: 6 }, { size: 6 }],
      e: 12
    },
    {
      cells: [{ size: 6 }, { size: 2 }],
      e: 8
    },
    {
      cells: [{ size: 6 }, { size: 6 }, { size: 3 }],
      e: 15
    }
  ].forEach((c, k) => {
    it(`should pass test case ${k}`, () => {
      expect(sumSizes(c.cells), 'to equal', c.e)
    })
  })
})

describe('resizeCells', () => {
  ;[
    {
      a: { id: 2, size: 6 },
      cells: [{ id: 1, size: 4 }, { id: 2, size: 4 }, { id: 3, size: 4 }],
      e: [{ id: 1, size: 4 }, { id: 2, size: 6 }, { id: 3, size: 2 }]
    }
  ].forEach((c, k) => {
    it(`should pass test case ${k}`, () => {
      expect(resizeCells(c.cells, c.a), 'to equal', c.e)
    })
  })
})

describe('computeBounds', () => {
  ;[
    {
      cells: [{ size: 6 }, { size: 6 }],
      e: [
        { size: 6, bounds: { left: 0, right: 11 } },
        { size: 6, bounds: { left: 11, right: 0 } }
      ]
    },
    {
      cells: [{ size: 12 }],
      e: [{ size: 12, bounds: { left: 0, right: 0 } }]
    },
    {
      cells: [{ size: 1 }, { size: 3 }, { size: 2 }, { size: 4 }],
      e: [
        { size: 1, bounds: { left: 0, right: 3 } },
        { size: 3, bounds: { left: 3, right: 4 } },
        { size: 2, bounds: { left: 4, right: 5 } },
        { size: 4, bounds: { left: 5, right: 0 } }
      ]
    }
  ].forEach((c, k) => {
    it(`should pass test case ${k}`, () => {
      expect(computeBounds(c.cells), 'to equal', c.e)
    })
  })
})
