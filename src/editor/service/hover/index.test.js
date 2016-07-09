/* eslint-env mocha */
import unexpected from 'unexpected'
import HoverService, { classes as c, callbacks, matrices } from './index'

const expect = unexpected.clone()

describe('relativeMousePosition', () => {
  [].forEach((c, l) => {
    it(`should pass test case ${k}`, () => {

    })
  })
})

const cases = [{
  d: 'basic left',
  in: {
    room: { width: 100, height: 100 },
    mouse: { x: 0, y: 50 }
  },
  actions: (done) => ({
    leftOf: (item, hover, level) => {
      expect(level, 'to be', 10)
      expect(item.id, 'to be', 'foo')
      done()
    }
  })
}, {
  d: 'basic',
  in: {
    room: { width: 100, height: 100 },
    mouse: { x: 99, y: 50 }
  },
  actions: (done) => ({
    rightOf: (item, hover, level) => {
      expect(level, 'to be', 9)
      expect(item.id, 'to be', 'foo')
      done()
    }
  })
}, {
  d: 'basic ii',
  in: {
    room: { width: 100, height: 100 },
    mouse: { x: 95, y: 50 }
  },
  actions: (done) => ({
    rightOf: (item, hover, level) => {
      expect(level, 'to be', 5)
      done()
    }
  })
}, {
  d: 'basic iii',
  in: {
    room: { width: 100, height: 100 },
    mouse: { x: 92, y: 50 }
  },
  actions: (done) => ({
    rightOf: (item, hover, level) => {
      expect(level, 'to be', 2)
      done()
    }
  })
}, {
  d: 'basic iv',
  in: {
    room: { width: 100, height: 100 },
    mouse: { x: 89, y: 50 }
  },
  actions: (done) => ({
    rightOf: (item, hover, level) => {
      expect(level, 'to be', 0)
      done()
    }
  })
}, {
  d: 'corner c3 i',
  in: {
    room: { width: 100, height: 100 },
    mouse: { x: 98, y: 95 }
  },
  actions: (done) => ({
    rightOf: (item, hover, level) => {
      expect(level, 'to be', 0)
      done()
    }
  })
}]

describe('HoverService', () => {
  it('should have as many classes as callbacks', () => {
    expect(Object.keys(callbacks).length, 'to be', Object.keys(c).length)
  })

  cases.forEach((c) => {
    it(`should pass test case ${c.d}`, (done) => {
      const h = new HoverService({
        callbacks
      })

      h.hover({ id: 'foo' }, c.hover || { levels: { right: 10, left: 10, above: 10, below: 10 } }, c.actions(done), {
        room: c.in.room,
        mouse: c.in.mouse,
        ancestors: c.in.ancestors,
      })
    })
  })
})
