/* eslint-env mocha */
import unexpected from 'unexpected'
import HoverService, { classes as c, callbacks, matrices } from './index'

const expect = unexpected.clone()

const makeMouseMatrix = (rows, cells, mark = []) => {
  const rs = []
  for (let ri = 0; ri < rows; ri++) {
    const cs = []
    for (let ci = 0; ci < cells; ci++) {
      cs.push(false)
    }
    rs.push(cs)
  }

  if (mark.length === 2) {
    rs[mark[0] - 1][mark[1] - 1] = true
  }
  return rs
}

const cases = [
  {
    d: 'basic',
    in: {
      room: { width: 100, height: 100 },
      // with current element 10 level in total
      ancestors: 9,
      mouse: { x: 99, y: 95 }
    },
    matrix: matrices['10x10'],
    expect: {
      position: 'right-of',
      level: 9
    }
  }
]

describe('', () => {
  cases.forEach((c) => {
    it(`should pass test case ${c.d}`, () => {
      const h = new HoverService({
        matrix: c.matrix,
        callbacks
      })

      const hover = h.hover({}, {}, {}, {
        room: c.in.room,
        mouse: c.in.mouse,
        ancestors: c.in.ancestors
      })

      const { position, level } = hover
      expect(position, 'to equal', c.expect.position)
      expect(level, 'to equal', c.expect.level)
    })
  })
})
