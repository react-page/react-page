import unexpected from 'unexpected'

import { cellOrder } from './order'

const expect = unexpected.clone()

describe('computeResizeable', () => {
  ;[
    {
      cells: [
        {
          id: '1',
          rows: [
            {
              id: '2',
              cells: [
                { id: '3', content: { plugin: { name: 'foo' } } },
                { id: '4' },
                { id: '5' }
              ]
            },
            {
              id: '6'
            },
            {
              id: '7'
            }
          ]
        },
        { id: '8' }
      ],
      e: [
        { id: '1', isLeaf: false },
        { id: '2', isLeaf: false },
        { id: '3', isLeaf: true },
        { id: '4', isLeaf: false },
        { id: '5', isLeaf: false },
        { id: '6', isLeaf: false },
        { id: '7', isLeaf: false },
        { id: '8', isLeaf: false }
      ]
    }
  ].forEach((c, k) => {
    it(`should pass test case ${k}`, () => {
      expect(cellOrder(c.cells), 'to equal', c.e)
    })
  })
})
