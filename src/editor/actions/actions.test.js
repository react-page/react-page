/* eslint-env mocha */
import * as cellActions from './cell'
import unexpected from 'unexpected'

const expect = unexpected.clone()

describe('actions', () => {
  const fired = []
  const creators = []
  const all = [cellActions]
  const faillist = [
    'cellHoverLeftOf',
    'cellHoverRightOf',
    'cellHoverBelow',
    'cellHoverAbove',
    'cellHoverInlineRight',
    'cellHoverInlineLeft'
  ]

  all.map((actions) => Object.keys(actions).forEach((key) => {
    if (typeof actions[key] === 'function') {
      creators.push(actions[key])
    }
  }))

  all.map((actions) => Object.keys(actions).forEach((key) => {
    if (typeof actions[key] === 'function') {
      const { type, ts } = actions[key]()
      it(`${key} (${type}) should be unique`, () => {
        expect(fired.indexOf(type) === -1, 'to be', faillist.indexOf(key) === -1)
        fired.push(type)
      })
      it(`${key} (${type}) should have a timestamp`, () => {
        expect(ts, 'to be defined')
      })
    }
  }))

  it('must have fired at least once', () => {
    expect(fired.length, 'to be', creators.length)
  })
})
