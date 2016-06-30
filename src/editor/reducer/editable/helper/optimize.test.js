/* eslint-env mocha */
import unexpected from 'unexpected'
import equal from 'deep-equal'
import { optimizeCellLevel, optimizeRowLevel } from './optimize'

const expect = unexpected.clone()

describe('optimizeRowLevel', () => {
  [
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
            rows: [
              { cells: [{ plugin: 'foo' }] }
            ]
          }
        ]
      },
      out: {
        cells: [
          { plugin: 'foo' }
        ]
      }
    },
    {
      in: {
        cells: [
          {
            rows: [
              { cells: [{ plugin: 'foo' }] }
            ]
          },
          { plugin: 'foo' }
        ]
      },
      out: {
        cells: [
          { plugin: 'foo' },
          { plugin: 'foo' }
        ]
      }
    }
  ].forEach((c, k) => {
    it(`should pass test case ${k}`, () => {
      expect(optimizeRowLevel(c.in), 'to equal', c.out)
    })
  })
})

describe('optimizeCellLevel', () => {
  [
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
            cells: [
              { rows: [{ cells: [{ plugin: 'foo' }] }] }
            ]
          }
        ]
      },
      out: {
        rows: [
          { cells: [{ plugin: 'foo' }] }
        ]
      }
    },
  ].forEach((c, k) => {
    it(`should pass test case ${k}`, () => {
      expect(equal(c.out, optimizeCellLevel(c.in)), 'to be truthy')
    })
  })
})
