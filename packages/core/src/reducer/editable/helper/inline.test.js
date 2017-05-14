import unexpected from 'unexpected'

import { computeRow } from './inline'

const expect = unexpected.clone()

describe('computeRow', () => {
  ;[
    {
      cells: [{ size: 6 }, { size: 6 }],
      e: false
    },
    {
      cells: [{ size: 6 }, { size: 6, inline: 'left' }],
      e: false
    },
    {
      cells: [{ size: 6, inline: 'left' }, { size: 6 }],
      e: true
    },
    {
      cells: [{ size: 6, inline: 'left' }, { size: 6 }, {}],
      e: false
    }
  ].forEach((c, k) => {
    it(`should pass test case ${k}`, () => {
      expect(computeRow(c).hasInlineChildren, 'to equal', c.e)
    })
  })
})
