import unexpected from 'unexpected'
import equal from 'deep-equal'

import { optimizeCell, optimizeRow } from './optimize'

const expect = unexpected.clone()

describe('optimizeRow', () => {
  ;[
    {
      in: {
        cells: []
      },
      out: {
        cells: []
      }
    },
    {
      in: {
        cells: [
          {
            rows: [{ cells: [{ plugin: 'foo' }] }]
          }
        ]
      },
      out: {
        cells: [{ plugin: 'foo' }]
      }
    },
    {
      in: {
        cells: [
          {
            rows: [{ cells: [{ plugin: 'foo' }] }]
          },
          { plugin: 'foo' }
        ]
      },
      out: {
        cells: [{ plugin: 'foo' }, { plugin: 'foo' }]
      }
    }
  ].forEach((c, k) => {
    it(`should pass test case ${k}`, () => {
      expect(optimizeRow(c.in), 'to equal', c.out)
    })
  })
})

describe('optimizeCell', () => {
  ;[
    {
      in: {
        rows: []
      },
      out: {
        rows: []
      }
    },
    {
      in: {
        rows: [
          {
            cells: [{ rows: [{ cells: [{ plugin: 'foo' }] }] }]
          }
        ]
      },
      out: {
        rows: [{ cells: [{ plugin: 'foo' }] }]
      }
    }
  ].forEach((c, k) => {
    it(`should pass test case ${k}`, () => {
      expect(equal(c.out, optimizeCell(c.in)), 'to be truthy')
    })
  })
})
